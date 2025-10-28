import {
  Keyboard,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { spacing } from "@constants/globalStyles";
import { useInputChange } from "@hooks/useInputChange";
import { useAuthContext } from "@context/AuthProvider";
import { TextInput, Text, useTheme, Button } from "react-native-paper";
import { LinkText } from "@components/atoms/LinkText";
import { CustomButton } from "@components/molecules/CustomButton";
import { TermsCheckbox } from "@components/molecules/TermsCheckbox";
import { useToggle } from "@hooks/useToggle";
import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { configureGoogleSignIn } from "@utils/googleSignInConfigure";
import { set } from "lodash";

export default function SignUpForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const [visible, toggleVisiblity] = useToggle();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { signUp, contextGoogleSignIn, loading } = useAuthContext();
  const { colors } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = async () => {
    GoogleSignin.configure({
      webClientId:
        "244085597277-ark35u401giihpl8vd629697no9374ao.apps.googleusercontent.com",
    });
    try {
      const user = await GoogleSignin.getCurrentUser();
      setCurrentUser(user);
      console.log(JSON.stringify(user, null, 2));
    } catch (error) {
      console.error("Error getting current user", error);
    }
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      await getCurrentUser();
    };
    fetchCurrentUser();
  }, []);

  const handleSignIn = async () => {
    await contextGoogleSignIn({ force: true });
  };
  const handleSignUp = async () => {
    if (!termsAccepted) {
      Alert.alert(
        "Terms and Conditions",
        "Please accept the Terms and Conditions to continue with sign up.",
        [{ text: "OK" }]
      );
      return;
    }

    // if (credentials.password !== credentials.confirmPassword) {
    //   Alert.alert(
    //     "Password Mismatch",
    //     "Passwords do not match. Please check and try again.",
    //     [{ text: "OK" }]
    //   );
    //   return;
    // }

    // if (
    //   !credentials.email ||
    //   !credentials.password ||
    //   !credentials.firstName ||
    //   !credentials.lastName
    // ) {
    //   Alert.alert(
    //     "Missing Information",
    //     "Please fill in all required fields.",
    //     [{ text: "OK" }]
    //   );
    //   return;
    // }

    signUp({
      email: currentUser?.user ? currentUser?.user?.email : credentials.email,
      password: currentUser?.user ? currentUser?.idToken : credentials.password,
      firstName: currentUser?.user
        ? currentUser?.user?.givenName
        : credentials.firstName,
      lastName: currentUser?.user ? currentUser?.user?.familyName : "",
      user: currentUser,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.form}>
          <TextInput
            mode="outlined"
            style={styles.inputField}
            label="First Name"
            value={
              currentUser?.user
                ? currentUser?.user?.givenName
                : credentials.firstName
            }
            onChangeText={(text) => handleInputChange("firstName", text)}
            returnKeyType="next"
          />
          <TextInput
            mode="outlined"
            style={styles.inputField}
            label="Last Name"
            value={
              currentUser?.user
                ? currentUser?.user?.familyName
                : credentials.lastName
            }
            onChangeText={(text) => handleInputChange("lastName", text)}
            returnKeyType="next"
          />
          {/* <TextInput
            mode="outlined"
            style={styles.inputField}
            label="Email"
            value={credentials.email}
            onChangeText={(text) => handleInputChange("email", text)}
            autoComplete="on"
            keyboardType="email-address"
            returnKeyType="next"
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
            returnKeyType="next"
          />
          <TextInput
            mode="outlined"
            textContentType="password"
            secureTextEntry={!visible}
            label="Confirm Password"
            value={credentials.confirmPassword}
            right={
              <TextInput.Icon
                icon={visible ? "eye" : "eye-off"}
                onPress={toggleVisiblity}
                color={colors.primary}
              />
            }
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          /> */}

          <TermsCheckbox
            checked={termsAccepted}
            onToggle={() => setTermsAccepted(!termsAccepted)}
            onPressTerms={() =>
              navigation.navigate("TermsAndConditions", { from: "SignUp" })
            }
            onPressPrivacy={() =>
              navigation.navigate("PrivacyPolicy", { from: "SignUp" })
            }
            style={{ marginVertical: spacing.sm }}
          />

          <View style={styles.wrapper}>
            <Button
              mode="contained"
              loading={loading}
              disabled={loading}
              onPress={handleSignUp}
            >
              Sign Up
            </Button>
            {/* <Text style={styles.centerText}>
              Already have an account?{" "}
              <LinkText onPress={handleSignIn}>Sign In</LinkText>
            </Text> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollView: {},
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxl,
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
