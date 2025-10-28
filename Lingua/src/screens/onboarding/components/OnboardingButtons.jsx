import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomButton } from "@components/molecules/CustomButton";
import { spacing } from "@constants/globalStyles";

const OnboardingButtons = ({
  onNext,
  onBack,
  onGetStarted,
  nextText = "Next",
  showBack = true,
  isFirstScreen = false,
  isLastScreen = false,
  loading = false,
}) => {
  return (
    <View style={styles.container}>
      {showBack && !isFirstScreen && (
        <CustomButton onPress={onBack} style={styles.backButton}>
          Back
        </CustomButton>
      )}

      <CustomButton
        onPress={isLastScreen ? onGetStarted : onNext}
        primary={true}
        style={[
          styles.nextButton,
          (isFirstScreen || !showBack) && styles.fullWidthButton,
        ]}
        loading={loading}
      >
        {isLastScreen ? "Get Started" : nextText}
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  backButton: {
    flex: 1,
    marginRight: spacing.md,
  },
  nextButton: {
    flex: 1,
    marginLeft: spacing.md,
  },
  fullWidthButton: {
    marginLeft: 0,
  },
});

export default OnboardingButtons;
