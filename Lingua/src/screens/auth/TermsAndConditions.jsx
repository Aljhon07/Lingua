import LegalDocument from "@components/organisms/LegalDocument"
import { termsAndConditionsData } from "@constants/legalContent"

export default function TermsAndConditions({ navigation, route }) {
  // Check if we came from SignIn, SignUp, or Profile screen
  const fromScreen = route?.params?.from || "SignUp"

  let backButtonText = "Back to Sign Up"
  if (fromScreen === "SignIn") {
    backButtonText = "Back to Sign In"
  } else if (fromScreen === "Profile") {
    backButtonText = "Back to Profile"
  }

  return (
    <LegalDocument
      title={termsAndConditionsData.title}
      sections={termsAndConditionsData.sections}
      lastUpdated={termsAndConditionsData.lastUpdated}
      backButtonText={backButtonText}
      navigation={navigation}
    />
  )
}
