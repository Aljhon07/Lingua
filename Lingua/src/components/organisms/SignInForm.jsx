import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { LinkText } from "@components/atoms/LinkText"
import { useInputChange } from "@hooks/useInputChange"
import { useAuthContext } from "@context/AuthProvider"
import { Text, TextInput, useTheme } from "react-native-paper"
import { useToggle } from "@hooks/useToggle"
import { CustomButton } from "@components/molecules/CustomButton"
import { domain } from "@constants/api"
import { useState } from "react"
import { set } from "lodash"

export default function SignInForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
  })
  const [message, setMessage] = useState(null)
  const [visible, toggleVisiblity] = useToggle()
  const { loading, signIn } = useAuthContext()
  const { colors } = useTheme()

  const handleSignIn = async () => {
    setMessage(null)
    const res = await signIn(credentials)
    setMessage(res)
  }

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

        {message && (
          <Text
            style={{
              color: colors.error,
            }}
          >
            {message}
          </Text>
        )}
        <View style={styles.wrapper}>
          <CustomButton
            primary
            onPress={handleSignIn}
            loading={loading}
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            Sign In
          </CustomButton>
          <Text style={styles.centerText}>
            Don't have an account?{" "}
            <LinkText onPress={() => navigation.navigate("SignUp")}>
              Sign Up
            </LinkText>
          </Text>
          <LinkText style={styles.centerText}>Forgot Password?</LinkText>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <LinkText
          style={styles.termsText}
          onPress={() =>
            navigation.navigate("TermsAndConditions", { from: "SignIn" })
          }
        >
          Terms and Conditions
        </LinkText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    minHeight: 400,
  },
  wrapper: {
    justifyContent: "center",
    gap: spacing.sm,
  },
  form: {
    padding: spacing.lg,
    width: "90%",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  centerText: {
    textAlign: "center",
  },
  termsContainer: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
  },
})
