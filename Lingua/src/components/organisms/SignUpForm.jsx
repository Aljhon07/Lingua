import {
  Keyboard,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { spacing } from "@constants/globalStyles"
import { useInputChange } from "@hooks/useInputChange"
import { useAuthContext } from "@context/AuthProvider"
import { TextInput, Text, useTheme } from "react-native-paper"
import { LinkText } from "@components/atoms/LinkText"
import { CustomButton } from "@components/molecules/CustomButton"
import { TermsCheckbox } from "@components/molecules/TermsCheckbox"
import { useToggle } from "@hooks/useToggle"
import { useState } from "react"

export default function SignUpForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  })
  const [visible, toggleVisiblity] = useToggle()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { signUp } = useAuthContext()
  const { colors } = useTheme()

  const handleSignUp = async () => {
    if (!termsAccepted) {
      Alert.alert(
        "Terms and Conditions",
        "Please accept the Terms and Conditions to continue with sign up.",
        [{ text: "OK" }]
      )
      return
    }

    if (credentials.password !== credentials.confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Passwords do not match. Please check and try again.",
        [{ text: "OK" }]
      )
      return
    }

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.firstName ||
      !credentials.lastName
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields.",
        [{ text: "OK" }]
      )
      return
    }

    signUp(credentials)
  }

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
            value={credentials.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
            returnKeyType="next"
          />
          <TextInput
            mode="outlined"
            style={styles.inputField}
            label="Last Name"
            value={credentials.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
            returnKeyType="next"
          />
          <TextInput
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
          />

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
            <CustomButton primary onPress={handleSignUp}>
              Sign Up
            </CustomButton>
            <Text style={styles.centerText}>
              Already have an account?{" "}
              <LinkText onPress={() => navigation.replace("SignIn")}>
                Sign In
              </LinkText>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
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
})
