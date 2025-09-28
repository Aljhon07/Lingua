import LegalDocument from "@components/organisms/LegalDocument"
import {
  termsAndConditionsData,
  privacyPolicyData,
} from "@constants/legalContent"

export default function LegalScreen({ navigation, route }) {
  const { documentType, from } = route?.params || {}

  const documentData =
    documentType === "privacy" ? privacyPolicyData : termsAndConditionsData

  let backButtonText = "Back"
  if (from === "Settings") {
    backButtonText = "Back to Settings"
  } else if (from === "SignIn") {
    backButtonText = "Back to Sign In"
  } else if (from === "SignUp") {
    backButtonText = "Back to Sign Up"
  }

  return (
    <LegalDocument
      title={documentData.title}
      sections={documentData.sections}
      lastUpdated={documentData.lastUpdated}
      backButtonText={backButtonText}
      navigation={navigation}
    />
  )
}
