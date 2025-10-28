import { spacing } from "@constants/globalStyles";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import PackageListing from "./components/PackageListing";
import { useTravelPackagesContext } from "@context/TravelPackagesProvider";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const { countries, getPackages, packagesState } = useTravelPackagesContext();

  useEffect(() => {
    // Initial fetch without filters
    getPackages();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        searchQuery={searchQuery}
        getPackages={getPackages}
        styles={styles}
        setSearchQuery={setSearchQuery}
        countries={countries}
      />

      <PackageListing
        packagesState={packagesState}
        getPackages={getPackages}
        headline={"Latest Packages"}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: spacing.lg,
  },
});
