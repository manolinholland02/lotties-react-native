import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { palette } from "../constants/colors";
import { typography } from "../constants/typography";

type FlatButtonProps = {
  label: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  icon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
};

export function FlatButton({
  label,
  width,
  height,
  backgroundColor = palette.background.navigation,
  textColor = palette.primary.black,
  borderRadius = 0,
  icon,
  style,
  textStyle,
}: FlatButtonProps) {
  return (
    <View
      style={[
        styles.container,
        { width, height, backgroundColor, borderRadius },
        style,
      ]}
    >
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <Text style={[styles.label, { color: textColor }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  iconWrapper: {
    position: "absolute",
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: typography.fontFamily.paragraph,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});
