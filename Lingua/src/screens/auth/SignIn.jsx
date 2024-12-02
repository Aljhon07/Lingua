import AuthenticationForm from "@components/layouts/AuthenticationLayout";
import SignInForm from "@components/organisms/SignInForm";

export default function SignIn({ navigation }) {
  return (
    <AuthenticationForm>
      <SignInForm navigation={navigation} />
    </AuthenticationForm>
  );
}
