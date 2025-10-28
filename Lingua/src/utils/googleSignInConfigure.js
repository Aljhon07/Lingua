import { GoogleSignin } from "@react-native-google-signin/google-signin";
export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId:
      "244085597277-ark35u401giihpl8vd629697no9374ao.apps.googleusercontent.com",
  });
}
