import AuthenticationForm from "@components/layouts/AuthenticationLayout";
import SignUpForm from "@components/organisms/SignUpForm";

export default function SignIn({ navigation }) {
  return (
    <AuthenticationForm>
      <SignUpForm navigation={navigation} />
    </AuthenticationForm>
  );
}
