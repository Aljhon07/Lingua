import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import SignUpForm from "@components/organisms/SignUpForm"

export default function SignUp({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <SignUpForm navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
