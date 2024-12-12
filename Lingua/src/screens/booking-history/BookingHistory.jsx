import DataContainer from "@components/layouts/DataContainer"
import { cloudinary } from "@constants/api"
import { spacing } from "@constants/globalStyles"
import { useQueryState } from "@hooks/useQueryState"
import { fetchTransactions } from "@services/directus/rest"
import { formatDate } from "@utils/formatDate"
import { useEffect } from "react"
import { Image, StyleSheet, View } from "react-native"
import { FlatList, RefreshControl } from "react-native-gesture-handler"
import { Text, TouchableRipple, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export default function BookingHistory({ navigation }) {
  const { getQueryState, executeQuery } = useQueryState()
  const bookingHistory = getQueryState("booking-history")
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  useEffect(() => {
    getBookingHistory()
  }, [])

  const getBookingHistory = () => {
    executeQuery(
      "booking-history",
      fetchTransactions,
      "fields=first_name,last_name,status,date_created,travel_package.name,travel_package.id,travel_package.cover,travel_package.price,travel_package.country.name&sort=date_created"
    )
  }
  const renderItem = ({ item }) => {
    const formatteddDate = formatDate(item.date_created)

    const imageURL = `${cloudinary.baseURL}/${cloudinary.images}/${item.travel_package.cover}`
    return (
      <TouchableRipple
        style={styles.bookingItem}
        onPress={() =>
          navigation.navigate("PackageDetailsNavigation", {
            imageURL,
            item: item.travel_package,
          })
        }
      >
        <>
          <Image source={{ uri: imageURL }} style={styles.image} />
          <View style={styles.details}>
            <Text variant="titleSmall" style={styles.packageName}>
              {item.travel_package.name}
            </Text>
            <Text variant="bodyLarge" style={styles.price}>
              ₱{item.travel_package.price}
            </Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text>Date Booked: {formatteddDate}</Text>
            <Text>
              {item.first_name} {item.last_name}
            </Text>
          </View>
        </>
      </TouchableRipple>
    )
  }

  return (
    <DataContainer
      loading={bookingHistory.loading}
      error={bookingHistory.error}
      data={bookingHistory.data}
      noDataMessage={"Book your Package Now. ->>> button to explore screen"}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headline} variant="headlineLarge">
          Every Booking Tells a Story – Here's Yours!
        </Text>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={bookingHistory.loading}
              onRefresh={getBookingHistory}
            />
          }
          data={bookingHistory.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </DataContainer>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
    },
    headline: {
      marginBottom: spacing.xl,
    },
    bookingItem: {
      flexDirection: "row",
      marginBottom: spacing.md,
      padding: spacing.md,
      borderColor: colors.outline,
      borderWidth: 1,
      borderRadius: roundness,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: roundness,
    },
    details: {
      flex: 1,
      marginLeft: spacing.md,
    },
  })
