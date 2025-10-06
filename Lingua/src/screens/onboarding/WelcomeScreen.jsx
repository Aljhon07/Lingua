import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinguaLogo } from "@components/atoms/LinguaLogo";
import PaddedView from "@components/atoms/PaddedView";
import ProgressIndicator from "./components/ProgressIndicator";
import OnboardingButtons from "./components/OnboardingButtons";
import { spacing } from "@constants/globalStyles";

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const handleNext = () => {
    navigation.navigate("Features");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator totalSteps={3} currentStep={0} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <LinguaLogo style={styles.logo} />
        </View>

        <PaddedView horizantal={spacing.xl}>
          <View style={styles.textContainer}>
            <Text variant="headlineLarge" style={styles.title}>
              Welcome to Lingua
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Explore new languages with vocabulary quizzes and travel tools
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              Practice essential vocabulary for travel, book trips, plan
              itineraries, and speech translator for basic communication with
              locals.
            </Text>
          </View>
        </PaddedView>
      </ScrollView>

      <OnboardingButtons
        onNext={handleNext}
        nextText="Continue"
        isFirstScreen={true}
        showBack={false}
      />
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
    },
    logoContainer: {
      alignItems: "center",
      marginVertical: spacing.xxl,
    },
    logo: {
      height: 120,
      width: 200,
    },
    textContainer: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    title: {
      color: colors.onBackground,
      textAlign: "center",
      marginBottom: spacing.lg,
    },
    subtitle: {
      color: colors.primary,
      textAlign: "center",
      marginBottom: spacing.lg,
      fontWeight: "600",
    },
    description: {
      color: colors.onSurfaceVariant,
      textAlign: "center",
      lineHeight: 22,
    },
  });

export default WelcomeScreen;
