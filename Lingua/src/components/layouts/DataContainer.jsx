import React from "react"
import { View, StyleSheet } from "react-native"
import { ActivityIndicator, Text, useTheme } from "react-native-paper"

const DataContainer = ({
  loading,
  error,
  data,
  children,
  errorMessage,
  noDataMessage,
}) => {
  const { colors } = useTheme()

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={colors.primary}
        />
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    console.log("Error:", error)
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.error }}>
          {errorMessage || "Error loading data"}
        </Text>
      </View>
    )
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>{noDataMessage || "No data available"}</Text>
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default DataContainer
