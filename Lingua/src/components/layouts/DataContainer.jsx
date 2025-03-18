import React from "react"
import { View, StyleSheet } from "react-native"
import { ActivityIndicator, Text, useTheme } from "react-native-paper"
export default function DataContainer({
  loading,
  error,
  data,
  children,
  errorMessage,
  noDataMessage,
}) {
  const { colors } = useTheme()
  console.log("Data Container: ", data)

  if (loading) {
    console.log("Loading...")
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={colors.primary}
        />
      </View>
    )
  }

  if (error) {
    console.error("Error:", error)
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.error }}>
          {errorMessage || "Error loading data"}
        </Text>
      </View>
    )
  }

  if (!data || data.length === 0) {
    console.log("No Data")
    return (
      <View style={styles.container}>
        <Text>{noDataMessage || "No data available"}</Text>
      </View>
    )
  }

  console.log("Data Container: Data Fetched")
  return <>{children}</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
