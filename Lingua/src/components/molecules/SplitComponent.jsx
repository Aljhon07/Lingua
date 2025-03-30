import { StyleSheet, View } from "react-native"

export default function SplitComponent({ right, left }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>{left}</View>
      <View style={styles.right}>{right}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
})
