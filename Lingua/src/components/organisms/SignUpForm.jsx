import { StyleSheet, View } from "react-native";
import { spacing } from "@constants/globalStyles";
import { useInputChange } from "@hooks/useInputChange";
import { useAuthContext } from "@context/AuthProvider";
import { PasswordField, TextField } from "@components/atoms/InputField";
import { PrimaryButton } from "@components/molecules/buttons/PrimaryButton";
import { InlineTextWithLink } from "@components/molecules/InlineTextWithLink";

export default function SignInForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const { signUp } = useAuthContext();
  const handleSignUp = async () => signUp(credentials);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextField
          style={styles.inputField}
          placeholder="First Name"
          value={credentials.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
        <TextField
          style={styles.inputField}
          placeholder="Last Name"
          value={credentials.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
        <TextField
          style={styles.inputField}
          placeholder="Email"
          value={credentials.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <PasswordField
          style={styles.inputField}
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <PasswordField
          style={styles.inputField}
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
        />
        <View style={styles.wrapper}>
          <PrimaryButton buttonStyle={{ flex: 0 }} onPress={handleSignUp}>
            Sign Up
          </PrimaryButton>

          <InlineTextWithLink
            text="Already have an Account?"
            linkText="Sign In"
            onLinkPress={() => navigation.replace("SignIn")}
          />
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
  row: {
    flexDirection: "row",
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
});
