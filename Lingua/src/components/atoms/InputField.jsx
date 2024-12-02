import { StyleSheet, View } from "react-native"
import { Pressable, TextInput } from "react-native-gesture-handler"
import { Paragraph } from "./Typography"
import { border, spacing } from "@constants/globalStyles"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useToggle } from "@hooks/useToggle"

export function TextField({ label, style, ...props }) {
  return (
    <View>
      {label && <Paragraph>{label}</Paragraph>}
      <TextInput {...props} style={[style, styles.textInput]} />
    </View>
  )
}

export function PasswordField({ label, style, ...props }) {
  const [isPasswordVisible, setIsPasswordVisible] = useToggle(false)

  return (
    <View>
      {label && <Paragraph>{label}</Paragraph>}
      <View style={styles.passwordWrapper}>
        <TextInput
          {...props}
          style={[style, styles.textInput, styles.passwordInput]}
          secureTextEntry={!isPasswordVisible}
        />
        <Pressable
          style={styles.iconWrapper}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={20}
            color="gray"
          />
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  textInput: {
    borderRadius: border.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingRight: spacing.lg,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: border.md,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
  },
  iconWrapper: {
    right: spacing.md,
    padding: spacing.sm,
  },
})
