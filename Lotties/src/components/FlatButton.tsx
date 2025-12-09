import React from "react";
import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { palette } from "../constants/colors";
import { typography } from "../constants/typography";
import { ms } from "../utils/scale";

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
  disabled?: boolean;
  onPress?: PressableProps["onPress"];
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
  disabled = false,
  onPress,
}: FlatButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          width,
          height,
          backgroundColor,
          borderRadius,
          opacity: disabled ? 0.6 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <Text style={[styles.label, { color: textColor }, textStyle]}>{label}</Text>
    </Pressable>
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
    fontFamily: typography.fontFamily.secondary,
    fontWeight: "700",
    fontSize: ms(18, 0.2),
    textAlign: "center",
  },
});
