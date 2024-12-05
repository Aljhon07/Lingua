import { PrimaryButton } from "@buttons/PrimaryButton";
import { PasswordField, TextField } from "@components/atoms/InputField";
import { StyleSheet, View } from "react-native";
import { spacing } from "@constants/globalStyles";
import { LinkText, Paragraph } from "@components/atoms/Typography";
import { useInputChange } from "@hooks/useInputChange";
import { useAuthContext } from "@context/AuthProvider";
import { InlineTextWithLink } from "@components/molecules/InlineTextWithLink";

export default function SignInForm({ navigation }) {
  const [credentials, handleInputChange] = useInputChange({
    email: "",
    password: "",
  });
  const { status, signIn } = useAuthContext();

  const handleSignIn = async () => signIn(credentials);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextField
          style={styles.inputField}
          placeholder="Email"
          value={credentials.email}
          onChangeText={(text) => handleInputChange("email", text)}
          autoComplete="on"
        />
        <PasswordField
          style={styles.inputField}
          placeholder="Password"
          value={credentials.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        {status.isError && (
          <Paragraph style={{ color: "red" }}>{status.message}</Paragraph>
        )}
        <View style={styles.wrapper}>
          <PrimaryButton buttonStyle={{ flex: 0 }} onPress={handleSignIn}>
            Sign In
          </PrimaryButton>
          <InlineTextWithLink
            text="Don't have an account?"
            linkText="Sign Up"
            onLinkPress={() => navigation.replace("SignUp")}
          />

          <LinkText center>Forgot Password?</LinkText>
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
});
