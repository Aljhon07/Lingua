import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { useInputChange } from "@hooks/useInputChange"
import { useAuthContext } from "@context/AuthProvider"
import { TextInput, Text } from "react-native-paper"
import { LinkText } from "@components/atoms/LinkText"
import { CustomButton } from "@components/atoms/CustomButton"

export default function SignUpForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  })

  const { signUp } = useAuthContext()
  const handleSignUp = async () => signUp(credentials)

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          style={styles.inputField}
          label="First Name"
          value={credentials.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
        <TextInput
          mode="outlined"
          style={styles.inputField}
          label="Last Name"
          value={credentials.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
        <TextInput
          mode="outlined"
          style={styles.inputField}
          label="Email"
          value={credentials.email}
          onChangeText={(text) => handleInputChange("email", text)}
          autoComplete="on"
        />
        <TextInput
          mode="outlined"
          secureTextEntry
          label="Password"
          value={credentials.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <TextInput
          mode="outlined"
          secureTextEntry
          label="Confirm Password"
          value={credentials.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
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
    </View>
  )
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
})
