import { createContext, useState, useContext, useEffect } from "react";
import { googleSignIn, signIn, signUp } from "@services/directus/auth";
import * as SecureStorage from "expo-secure-store";
import { axiosInstance } from "@utils/axiosInstance";
import { useProfileContext } from "./ProfileProvider";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { configureGoogleSignIn } from "@utils/googleSignInConfigure";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getProfile } = useProfileContext();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await SecureStorage.getItemAsync("accessToken");
        if (token) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          const profile = await getProfile();
          if (profile) setIsAuthenticated(true);
        } else {
          console.log("Auth: Token deleted");
          delete axiosInstance.defaults.headers.common["Authorization"];
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const contextSignIn = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await signIn(email, password);
      console.log("Auth Res: ", res);
      if (res?.error) {
        console.error("Conditional", res.error);
        return res.message;
      }
      await getProfile();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth Error", error);
    } finally {
      console.log("Loading finished");
      setLoading(false);
    }
  };

  const contextGoogleSignIn = async ({ force = false, data }) => {
    configureGoogleSignIn();
    setLoading(true);
    try {
      if (force) await GoogleSignin.signOut();
      if (!data) {
        const { data: userData } = await GoogleSignin.signIn();
        data = userData;
      }
      const { user, idToken } = data;
      const res = await googleSignIn({ email: user.email, idToken });

      console.log("Auth Res: ", res);
      if (res?.error) {
        console.error("Conditional", res.error);
        setLoading(false);
        return {
          error: true,
          message: res.message,
          status: res.status,
        };
      }
      await getProfile();
      setIsAuthenticated(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled Google Sign-In");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google Sign-In is in progress");
      } else {
        console.log("Google Sign-In error", error);
      }
    } finally {
      console.log("Loading finished");
      setLoading(false);
    }
  };

  const contextSignUp = async ({
    email,
    password,
    firstName,
    lastName,
    user,
  }) => {
    setLoading(true);
    try {
      console.log(
        "Auth SignUp: ",
        JSON.stringify({ email, password, firstName, lastName, user }, null, 2)
      );
      lastName = lastName || " ";
      firstName = firstName || " ";
      const res = await signUp(email, password, firstName, lastName);

      // contextSignIn({ email, password });
      contextGoogleSignIn({ data: user });
    } catch (error) {
      console.error("Auth", error);
      setLoading(false);
    }
  };

  const contextSignOut = async () => {
    try {
      configureGoogleSignIn();
      await GoogleSignin.signOut();
      await SecureStorage.deleteItemAsync("accessToken");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: contextSignIn,
        signOut: contextSignOut,
        signUp: contextSignUp,
        loading,
        isAuthenticated,
        contextGoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
