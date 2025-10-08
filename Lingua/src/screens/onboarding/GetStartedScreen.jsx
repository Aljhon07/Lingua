import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, useTheme, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinguaLogo } from "@components/atoms/LinguaLogo";
import PaddedView from "@components/atoms/PaddedView";
import ProgressIndicator from "./components/ProgressIndicator";
import OnboardingButtons from "./components/OnboardingButtons";
import TopSkipButton from "./components/TopSkipButton";
import { spacing } from "@constants/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateOnboardingStatus } from "@services/directus/rest";

const GetStartedScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    navigation.navigate("MainTab", { screen: "Home" });
    await updateOnboardingStatus(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator totalSteps={3} currentStep={2} />
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
              You're All Set!
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Ready to start exploring languages and travel?
            </Text>

            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <Icon source="check-circle" size={24} color={colors.primary} />
                <Text variant="bodyMedium" style={styles.benefitText}>
                  Interactive vocabulary quizzes
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <Icon source="check-circle" size={24} color={colors.primary} />
                <Text variant="bodyMedium" style={styles.benefitText}>
                  Travel booking and itinerary planning
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <Icon source="check-circle" size={24} color={colors.primary} />
                <Text variant="bodyMedium" style={styles.benefitText}>
                  Speech recognition and translation tools
                </Text>
              </View>
            </View>

            <Text variant="bodyMedium" style={styles.description}>
              Start practicing vocabulary, planning your trips, and
              communicating with confidence.
            </Text>
          </View>
        </PaddedView>
      </ScrollView>

      <OnboardingButtons
        onGetStarted={handleGetStarted}
        onBack={handleBack}
        isLastScreen={true}
        showBack={true}
        isFirstScreen={false}
        loading={loading}
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
      marginVertical: spacing.xl,
    },
    logo: {
      height: 100,
      width: 180,
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
      marginBottom: spacing.xl,
      fontWeight: "600",
    },
    benefitsContainer: {
      width: "100%",
      marginBottom: spacing.xl,
    },
    benefitItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.md,
    },
    benefitText: {
      color: colors.onSurface,
      marginLeft: spacing.md,
      flex: 1,
    },
    description: {
      color: colors.onSurfaceVariant,
      textAlign: "center",
      lineHeight: 22,
    },
  });

export default GetStartedScreen;
