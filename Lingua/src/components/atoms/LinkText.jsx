const { Text, useTheme } = require("react-native-paper")

export function LinkText({ children, style, onPress, props }) {
  const { colors } = useTheme()
  return (
    <Text
      style={[
        {
          color: colors.primary,
          textDecorationLine: "underline",
        },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      {children}
    </Text>
  )
}
