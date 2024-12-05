import { StyleSheet, View } from "react-native"
import { spacing } from "@constants/globalStyles"
import { LinkText } from "@components/atoms/LinkText"
import { useInputChange } from "@hooks/useInputChange"
import { useAuthContext } from "@context/AuthProvider"
import { Button, Text, TextInput } from "react-native-paper"

export default function SignInForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
  })
  const { status, signIn } = useAuthContext()

  const handleSignIn = async () => signIn(credentials)

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
          secureTextEntry
          label="Password"
          value={credentials.password}
          right={<TextInput.Affix text="/100" />}
          onChangeText={(text) => handleInputChange("password", text)}
        />

        <View style={styles.wrapper}>
          <Button mode="contained" onPress={handleSignIn}>
            Sign In
          </Button>
          <Text style={styles.centerText}>
            Don't have an account?{" "}
            <LinkText onPress={() => navigation.navigate("SignUp")}>
              Sign Up
            </LinkText>
          </Text>
          <LinkText style={styles.centerText}>Forgot Password?</LinkText>
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
