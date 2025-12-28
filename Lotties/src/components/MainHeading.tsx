import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { palette } from "../constants/colors";
import { typography } from "../constants/typography";
import { ms } from "../utils/scale";

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
    fontSize: ms(24, 0.2),
    lineHeight: ms(30, 0.2),
    textAlign: "center",
  },
});
