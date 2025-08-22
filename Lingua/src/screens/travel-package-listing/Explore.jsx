import { spacing } from "@constants/globalStyles";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import PackageListing from "./components/PackageListing";
import { useQueryState } from "@hooks/useQueryState";
import { fetchCountries, fetchPackages } from "@services/directus/rest";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const { executeQuery, getQueryState } = useQueryState();
  const packagesState = getQueryState("packages");

  const getPackages = (filter = null) => {
    executeQuery("packages", fetchPackages, `${filter}`);
  };

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetchCountries();
      setCountries(res);
    };
    getCountries();
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
