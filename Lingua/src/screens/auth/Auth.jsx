import { ImageBackground, View } from "react-native"
import { Paragraph } from "@components/atoms/Typography"
import { PrimaryButton } from "@components/molecules/buttons/PrimaryButton"
import { SecondaryButton } from "@components/molecules/buttons/SecondaryButton"
import { LinguaLogo } from "@components/atoms/LinguaLogo"
import { lightTheme } from "@constants/colors"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Auth({ navigation }) {
  const bg_1 = require("@assets/images/background_1.jpg")
  const bg_2 = require("@assets/images/background_2.jpg")

  return (
    <ImageBackground style={{ flex: 1, width: "100%" }} source={bg_1}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinguaLogo light />
            <Paragraph
              style={{
                color: lightTheme.textInverted,
                textAlign: "center",
                width: 240,
              }}
            >
              Plan your journeys and communicate effortlessly, wherever you go.
            </Paragraph>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <SecondaryButton
              onPress={() => navigation.navigate("SignUp")}
              buttonStyle={{
                borderColor: lightTheme.textInverted,
              }}
              textStyle={{ color: lightTheme.textInverted }}
            >
              Sign Up
            </SecondaryButton>
            <PrimaryButton onPress={() => navigation.navigate("SignIn")}>
              Sign In
            </PrimaryButton>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
