import { LinkText, Paragraph } from "@components/atoms/Typography";
import React from "react";
import { View, StyleSheet } from "react-native";

export function InlineTextWithLink({
  text,
  linkText,
  onLinkPress,
  textStyle,
  linkStyle,
}) {
  return (
    <View style={styles.container}>
      <Paragraph style={textStyle}>{text + " "}</Paragraph>
      <LinkText style={linkStyle} onPress={onLinkPress}>
        {linkText}
      </LinkText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
