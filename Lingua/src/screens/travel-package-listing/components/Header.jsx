import PaddedView from "@components/atoms/PaddedView";
import { IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { spacing } from "@constants/globalStyles";
import { Keyboard, StyleSheet, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import {
  en,
  registerTranslation,
  DatePickerInput,
} from "react-native-paper-dates";
import { useProfileContext } from "@context/ProfileProvider";
import { StatusBar } from "expo-status-bar";
import { Dropdown } from "react-native-paper-dropdown";
import { CustomButton } from "@components/molecules/CustomButton";
import { SelectableTag } from "@components/atoms/SelectableTag";
import { useTravelPackagesContext } from "@context/TravelPackagesProvider";

export default function Header({ getPackages, countries }) {
  registerTranslation("en", en);
  const { profile } = useProfileContext();
  const { tags } = useTravelPackagesContext();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filter, setFilter] = useState({
    date: new Date(Date.now()),
    destination: "",
    minBudget: null,
    maxBudget: null,
    selectedTags: [],
  });

  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Function to build query string from all filters
  const buildQueryString = () => {
    const queryParts = [];

    // Price filters
    const minBudget = filter.minBudget || 0;
    const maxBudget = filter.maxBudget || 999999;
    queryParts.push(`filter[price][_gte]=${minBudget}`);
    queryParts.push(`filter[price][_lte]=${maxBudget}`);

    // Country filter
    if (filter.destination) {
      queryParts.push(`filter[country][name][_eq]=${filter.destination}`);
    }

    // Tags filter - format: tags=1,2,3
    if (filter.selectedTags.length > 0) {
      const tagIds = filter.selectedTags.join(",");
      queryParts.push(`filter[tags][id][_in]=${tagIds}`);
    }

    return queryParts.join("&");
  };

  // Function to handle tag selection
  const toggleTag = (tagId) => {
    setFilter((prevFilter) => {
      const selectedTags = [...prevFilter.selectedTags];
      const tagIndex = selectedTags.indexOf(tagId);

      if (tagIndex > -1) {
        selectedTags.splice(tagIndex, 1);
      } else {
        selectedTags.push(tagId);
      }

      return {
        ...prevFilter,
        selectedTags,
      };
    });
  };

  useEffect(() => {
    const queries = buildQueryString();
    console.log("Filter queries: ", queries);
    getPackages(queries);
  }, [
    filter.destination,
    filter.selectedTags,
    filter.minBudget,
    filter.maxBudget,
  ]);

  const handleSearch = () => {
    if (
      filter.minBudget &&
      filter.maxBudget &&
      filter.minBudget > filter.maxBudget
    ) {
      alert("Minimum budget cannot be greater than maximum budget");
      return;
    }

    Keyboard.dismiss();
    const queries = buildQueryString();
    console.log("Search Filter: ", queries);
    getPackages(queries);
    setIsCollapsed(true);
  };
  return (
    <PaddedView style={styles.headerContainer} vertical={spacing.xl}>
      <StatusBar backgroundColor={colors.elevation.level1} style="light" />

      <View style={styles.wrapper}>
        <View style={styles.countryFilterRow}>
          <View style={styles.countryDropdown}>
            <Dropdown
              label="Travel to"
              mode="outlined"
              placeholder="Select Destination"
              options={countries}
              value={filter.destination}
              onSelect={(value) => {
                setFilter({
                  ...filter,
                  destination: value,
                });
              }}
            />
          </View>

          <IconButton
            icon="filter-variant"
            iconColor={colors.text}
            size={24}
            onPress={() => setIsCollapsed(!isCollapsed)}
            style={styles.filterButton}
            mode="outlined"
          />
        </View>

        {!isCollapsed && (
          <>
            <DatePickerInput
              locale="en"
              mode="outlined"
              label="Departure Date"
              value={filter.date}
              onChange={(value) => setFilter({ ...filter, date: value })}
              inputMode="start"
              validRange={{ startDate: new Date(Date.now()) }}
              presentationStyle="formSheet"
            />

            <View style={styles.budgetRange}>
              <TextInput
                label="Min budget"
                inputMode="numeric"
                mode="outlined"
                value={filter.minBudget?.toString() || ""}
                onChangeText={(input) =>
                  setFilter({
                    ...filter,
                    minBudget: input ? parseInt(input) : null,
                  })
                }
                style={{ flex: 1 }}
                left={<TextInput.Affix text="₱ " />}
              />
              <TextInput
                label="Max Budget"
                inputMode="numeric"
                mode="outlined"
                value={filter.maxBudget?.toString() || ""}
                onChangeText={(input) =>
                  setFilter({
                    ...filter,
                    maxBudget: input ? parseInt(input) : null,
                  })
                }
                style={{ flex: 1 }}
                left={<TextInput.Affix text="₱ " />}
              />
            </View>

            {tags.length > 0 && (
              <View style={styles.tagsSection}>
                <Text variant="titleSmall" style={styles.sectionTitle}>
                  Filter by Tags
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagsContainer}
                >
                  {tags.map((tag) => (
                    <SelectableTag
                      key={tag.id}
                      label={tag.name}
                      isSelected={filter.selectedTags.includes(tag.id)}
                      onPress={() => toggleTag(tag.id)}
                      style={styles.tagItem}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
      {!isCollapsed && (
        <CustomButton primary onPress={handleSearch}>
          Search
        </CustomButton>
      )}
    </PaddedView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    headerContainer: {
      borderBottomLeftRadius: spacing.lg,
      borderBottomRightRadius: spacing.lg,
      gap: spacing.md,
      backgroundColor: colors.elevation.level1,
    },
    budgetRange: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
    },
    wrapper: {
      gap: spacing.xl,
    },
    countryFilterRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: spacing.sm,
      width: "100%",
    },
    countryDropdown: {
      flex: 1,
    },
    filterButton: {
      marginBottom: spacing.xs,
      borderRadius: spacing.md,
    },
    tagsSection: {
      gap: spacing.sm,
    },
    sectionTitle: {
      color: colors.onBackground,
      fontWeight: "500",
    },
    tagsContainer: {
      gap: spacing.sm,
      paddingRight: spacing.lg,
    },
    tagItem: {
      marginRight: spacing.sm,
    },
  });
