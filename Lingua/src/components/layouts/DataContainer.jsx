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
  errorComponent,
}) {
  const { colors } = useTheme()

  if (loading) {
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
    return (
      <View style={styles.container}>
        {errorComponent}
        {!errorComponent && (
          <>
            <Text style={{ color: colors.error }}>
              {errorMessage || "Error loading data"}
            </Text>

            <Text>{data}</Text>
          </>
        )}
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

  console.log("Data Container: ")
  return <>{children}</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
