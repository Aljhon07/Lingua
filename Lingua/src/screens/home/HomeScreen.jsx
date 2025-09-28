import React from "react"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "@constants/globalStyles"

// Import all the home components
import Greeting from "./components/Greeting.jsx"
import ShortcutIcons from "./components/ShortcutIcons.jsx"
import LatestTicket from "./components/LatestTicket.jsx"
import RecommendedPackages from "./components/RecommendedPackages.jsx"
import TipsSection from "./components/TipsSection.jsx"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Greeting />
        <LatestTicket />
        <TipsSection />
        <ShortcutIcons />
        <RecommendedPackages />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
})
