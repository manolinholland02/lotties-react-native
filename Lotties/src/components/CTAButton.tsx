import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import { palette } from "../constants/colors";
import { typography } from "../constants/typography";
import { hs, ms } from "../utils/scale";

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
  const { width } = useWindowDimensions();

  // Scale relative to the 393x852 reference frame from the design spec.
  // Use horizontal scaling with a soft cap to avoid stretching on larger screens.
  const buttonWidth = Math.min(hs(313, width), 340);
  // Keep height near the Figma 50px while allowing gentle adjustment across widths.
  const buttonHeight = ms(50, 0.2, width);

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
    fontFamily: typography.fontFamily.secondary,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});
