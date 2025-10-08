import { View } from "react-native";
import { LinguaLogo } from "@components/atoms/LinguaLogo";
import { Button, Text } from "react-native-paper";
import { useAuthContext } from "@context/AuthProvider";

export default function Auth({ navigation }) {
  const { contextGoogleSignIn, loading, signOut } = useAuthContext();

  const handleGoogleSignIn = async () => {
    const res = await contextGoogleSignIn({ force: true });
    if (!res?.error) return;

    if (res.status === 404) {
      navigation.navigate("SignUp");
    }
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinguaLogo />
        <Text
          style={{
            textAlign: "center",
            width: 240,
          }}
        >
          Plan your journeys and communicate effortlessly, wherever you go.
        </Text>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Button
          onPress={() => navigation.navigate("SignUp")}
          mode="outlined"
          style={{ flex: 1 }}
        >
          Sign Up
        </Button>

        <Button
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("SignIn")}
          mode="contained"
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          loading={false}
        >
          Sign In
        </Button>
      </View> */}

      {/* Google Sign-In Button */}
      <Button
        onPress={handleGoogleSignIn}
        mode="outlined"
        loading={loading}
        disabled={loading}
        icon={"google"}
        iconColor="black"
        style={{
          marginTop: 20, // Add some spacing above the button
        }}
      >
        Continue with Google
      </Button>
    </View>
  );
}
