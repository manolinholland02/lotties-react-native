import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { palette } from "../constants/colors";
import { typography } from "../constants/typography";

type ParagraphProps = TextProps & {
  children: React.ReactNode;
  color?: string;
  fontWeight?: "400" | "500" | "600" | "700" | "800" | "bold" | "normal";
};

export function ParagraphRegular({
  children,
  style,
  color = palette.primary.black,
  fontWeight = "400",
  ...rest
}: ParagraphProps) {
  return (
    <Text style={[styles.text, { color, fontWeight }, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: typography.fontFamily.paragraph,
    fontSize: 18,
    textAlign: "center",
  },
});
