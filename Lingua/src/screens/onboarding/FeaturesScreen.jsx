import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, useTheme, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PaddedView from "@components/atoms/PaddedView";
import ProgressIndicator from "./components/ProgressIndicator";
import OnboardingButtons from "./components/OnboardingButtons";
import FeatureCard from "./components/FeatureCard";
import { spacing } from "@constants/globalStyles";

const FeaturesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const handleNext = () => {
    navigation.navigate("GetStarted");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const features = [
    {
      icon: (
        <Icon source="book-open-variant" size={40} color={colors.primary} />
      ),
      title: "Interactive Vocabulary Quizzes",
      description: "Engage with short lessons consisting of vocabulary quizzes",
    },
    {
      icon: <Icon source="airplane" size={40} color={colors.primary} />,
      title: "Travel Booking",
      description: "Book flights and explore destinations",
    },
    {
      icon: <Icon source="map" size={40} color={colors.primary} />,
      title: "Itinerary Planning",
      description: "Plan your travel itinerary with ease",
    },
    {
      icon: <Icon source="microphone" size={40} color={colors.primary} />,
      title: "Speech & Translation",
      description:
        "Use speech recognition and translation tools for communication",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator totalSteps={3} currentStep={1} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PaddedView horizantal={spacing.lg}>
          <View style={styles.headerContainer}>
            <Text variant="headlineLarge" style={styles.title}>
              Powerful Features
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Everything you need for travel
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>
        </PaddedView>
      </ScrollView>

      <OnboardingButtons
        onNext={handleNext}
        onBack={handleBack}
        nextText="Almost Done"
        isFirstScreen={false}
        showBack={true}
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
      paddingBottom: spacing.xl,
    },
    headerContainer: {
      alignItems: "center",
      marginVertical: spacing.xl,
    },
    title: {
      color: colors.onBackground,
      textAlign: "center",
      marginBottom: spacing.md,
    },
    subtitle: {
      color: colors.onSurfaceVariant,
      textAlign: "center",
      marginBottom: spacing.lg,
    },
    featuresContainer: {
      marginTop: spacing.lg,
    },
  });

export default FeaturesScreen;
