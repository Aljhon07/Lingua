import { cloudinary } from "@constants/api"
import { spacing } from "@constants/globalStyles"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Card, Text, useTheme } from "react-native-paper"

export function ItineraryCard({ item }) {
  const imageURL = `${cloudinary.images}/${item.image}`
  const { colors, roundness } = useTheme()
  const styles = createStyles(colors, roundness)

  return (
    <Card style={styles.card}>
      <Card.Cover style={styles.cardCover} source={{ uri: imageURL }} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">
          Day {item.dayNumber}: {item.overview}
        </Text>
        <FlatList
          data={item.activities}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Text variant="bodyLarge" style={styles.activities}>
              - {item.name}
            </Text>
          )}
        />
      </Card.Content>
    </Card>
  )
}

const createStyles = (colors, roundness) =>
  StyleSheet.create({
    card: {
      borderRadius: roundness,
      // backgroundColor: colors.primaryContainer,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    cardCover: { borderRadius: roundness, marginBottom: spacing.md },
    cardContent: {},
    activities: {
      // color: colors.onPrimaryContainer,
    },
  })
