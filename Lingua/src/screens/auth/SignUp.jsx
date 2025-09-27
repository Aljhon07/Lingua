import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import SignUpForm from "@components/organisms/SignUpForm"
import { LinguaLogo } from "@components/atoms/LinguaLogo"
import AuthenticationForm from "@components/layouts/AuthenticationLayout"

export default function SignUp({ navigation }) {
  return (
    <AuthenticationForm>
      <SignUpForm navigation={navigation} />
    </AuthenticationForm>
  )
}

const styles = StyleSheet.create({
  container: {},
})
