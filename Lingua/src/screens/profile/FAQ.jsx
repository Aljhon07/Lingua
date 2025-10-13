import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme, List, Searchbar, Appbar } from "react-native-paper";
import { Section } from "@components/atoms/Section";
import { spacing } from "@constants/globalStyles";
import { useState } from "react";

const faqData = [
  {
    category: "Account Settings",
    questions: [
      {
        question: "How do I change my email address?",
        answer:
          "For security reasons, changing your email address requires contacting our support team. Please use the Contact Support option in your Profile settings to request an email change.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Tap 'Forgot Password' on the login screen and follow the instructions sent to your email. You can also contact support if you need additional assistance.",
      },
    ],
  },
  {
    category: "Bookings",
    questions: [
      {
        question: "How do I view my booking history?",
        answer:
          "Go to 'Home' screen and tap 'Purchases' to access your booking history.",
      },
      {
        question: "How do I cancel a booking?",
        answer:
          "To cancel a booking, you need to contact our support team. Please use the Contact Support option in your Profile settings for assistance with cancellations.",
      },
    ],
  },
];

export default function FAQ({ navigation }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Frequently Asked Questions"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Searchbar
          placeholder="Search FAQ..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        {filteredFAQ.map((category, categoryIndex) => (
          <Section
            key={categoryIndex}
            headline={category.category}
            headlineVariant="titleMedium"
            contentContainerStyle={styles.sectionContent}
            style={styles.section}
          >
            {category.questions.map((item, questionIndex) => {
              const key = `${categoryIndex}-${questionIndex}`;
              const isExpanded = expandedItems[key];

              return (
                <View key={questionIndex}>
                  <List.Accordion
                    title={item.question}
                    titleStyle={styles.questionTitle}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="help-circle-outline"
                        color={colors.primary}
                      />
                    )}
                    expanded={isExpanded}
                    onPress={() => toggleExpanded(categoryIndex, questionIndex)}
                    style={styles.accordion}
                  >
                    <View style={styles.answerContainer}>
                      <Text variant="bodyMedium" style={styles.answerText}>
                        {item.answer}
                      </Text>
                    </View>
                  </List.Accordion>
                </View>
              );
            })}
          </Section>
        ))}

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={styles.footerText}>
            Can't find what you're looking for?
          </Text>
          <Text
            variant="bodyMedium"
            style={styles.contactLink}
            onPress={() => navigation.goBack()}
          >
            Contact Support
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: spacing.lg,
    },
    title: {
      textAlign: "center",
      marginBottom: spacing.lg,
      color: colors.onBackground,
    },
    searchBar: {
      marginBottom: spacing.xl,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionContent: {
      padding: 0,
      backgroundColor: "transparent",
    },
    accordion: {
      backgroundColor: colors.surface,
      marginBottom: spacing.xs,
    },
    questionTitle: {
      fontSize: 16,
      fontWeight: "500",
    },
    answerContainer: {
      padding: spacing.md,
      paddingLeft: spacing.xl,
      backgroundColor: colors.surfaceVariant,
      marginBottom: spacing.xs,
    },
    answerText: {
      lineHeight: 22,
      color: colors.onSurfaceVariant,
    },
    footer: {
      alignItems: "center",
      marginTop: spacing.xl,
      padding: spacing.lg,
    },
    footerText: {
      color: colors.onSurfaceVariant,
      marginBottom: spacing.sm,
    },
    contactLink: {
      color: colors.primary,
      fontWeight: "500",
    },
  });
