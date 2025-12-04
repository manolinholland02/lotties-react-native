import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { palette } from "../constants/colors";
import { typography } from "../constants/typography";

type MainHeadingProps = TextProps & {
  children: React.ReactNode;
};

export function MainHeading({ children, style, ...rest }: MainHeadingProps) {
  return (
    <Text style={[styles.heading, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: palette.text.main,
    fontFamily: typography.fontFamily.main,
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
  },
});
