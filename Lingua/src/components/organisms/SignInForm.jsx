import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@constants/globalStyles";
import { LinkText } from "@components/atoms/LinkText";
import { useInputChange } from "@hooks/useInputChange";
import { useAuthContext } from "@context/AuthProvider";
import { Text, TextInput, useTheme } from "react-native-paper";
import { useToggle } from "@hooks/useToggle";
import { CustomButton } from "@components/molecules/CustomButton";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function SignInForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
  });
  const [visible, toggleVisiblity] = useToggle();
  const { loading, signIn } = useAuthContext();
  const { colors } = useTheme();

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: "YOUR_GOOGLE_WEB_CLIENT_ID", // Get this from Google Developer Console
    });
  }, []);

  const handleSignIn = async () => signIn(credentials);

  const handleGoogleSignIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      // You can now authenticate the user with your backend or context
      console.log("Google Sign-In successful!", userInfo);
      // Assuming your `signIn` method can handle Google auth token
      await signIn({ email: userInfo.user.email, password: userInfo.idToken });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled Google Sign-In");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google Sign-In is in progress");
      } else {
        console.log("Google Sign-In error", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          style={styles.inputField}
          textContentType="emailAddress"
          label="Email"
          value={credentials.email}
          onChangeText={(text) => handleInputChange("email", text)}
          autoComplete="on"
        />
        <TextInput
          mode="outlined"
          textContentType="password"
          secureTextEntry={!visible}
          label="Password"
          value={credentials.password}
          right={
            <TextInput.Icon
              icon={visible ? "eye" : "eye-off"}
              onPress={toggleVisiblity}
              color={colors.primary}
            />
          }
          onChangeText={(text) => handleInputChange("password", text)}
        />

        <View style={styles.wrapper}>
          <CustomButton primary onPress={handleSignIn} loading={loading}>
            Sign In
          </CustomButton>
          <Text style={styles.centerText}>
            Don't have an account?{" "}
            <LinkText onPress={() => navigation.navigate("SignUp")}>
              Sign Up
            </LinkText>
          </Text>
          <LinkText style={styles.centerText}>Forgot Password?</LinkText>

          {/* Google Sign-In Button */}
          <CustomButton primary onPress={handleGoogleSignIn} loading={loading}>
            Sign In with Google
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.xl,
  },

  wrapper: {
    justifyContent: "center",
    gap: spacing.sm,
  },
  form: {
    padding: spacing.lg,
    width: "90%",
    gap: spacing.lg,
  },
  centerText: {
    textAlign: "center",
  },
});
