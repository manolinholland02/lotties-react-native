import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import { palette } from "../constants/colors";
import { typography } from "../constants/typography";

type CTAButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
};

export function CTAButton({
  label,
  onPress,
  disabled = false,
  backgroundColor = palette.cta.primary,
}: CTAButtonProps) {
  const { width, height } = useWindowDimensions();

  // Scale relative to the 393x852 reference frame from the design spec.
  const buttonWidth = width * (313 / 393);
  const buttonHeight = height * (50 / 852);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          width: buttonWidth,
          height: buttonHeight,
          backgroundColor,
          opacity: disabled ? 0.6 : pressed ? 0.9 : 1,
        },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: palette.primary.white,
    fontFamily: typography.fontFamily.paragraph,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});
