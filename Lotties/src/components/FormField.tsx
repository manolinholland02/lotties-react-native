import React from "react";
import { View, StyleSheet, TextInput, TextInputProps, Text, ViewStyle } from "react-native";
import { palette } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";
import { ms } from "../utils/scale";

type FormFieldProps = TextInputProps & {
  width: number;
  height: number;
  icon?: React.ReactNode;
  errorText?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  rightElement?: React.ReactNode;
  footerRight?: React.ReactNode;
};

export function FormField({
  width,
  height,
  icon,
  errorText,
  containerStyle,
  style,
  rightElement,
  footerRight,
  ...inputProps
}: FormFieldProps) {
  const hasError = !!errorText;

  return (
    <View style={[styles.wrapper, { width }, containerStyle]}>
      <View style={[styles.inputWrapper, { height }, hasError && styles.inputWrapperError]}>
        {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
        {rightElement ? <View style={styles.rightElementWrapper}>{rightElement}</View> : null}
        <TextInput
          {...inputProps}
          style={[
            styles.input,
            icon ? styles.inputWithIcon : null,
            rightElement ? styles.inputWithRightElement : null,
            style,
          ]}
          placeholderTextColor={palette.text.abstract}
        />
      </View>
      <View style={styles.footerRow}>
        <Text style={[styles.errorText, footerRight ? styles.errorTextFlex : null]} numberOfLines={2}>
          {errorText}
        </Text>
        {footerRight ? <View style={styles.footerRight}>{footerRight}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
  },
  inputWrapper: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.text.abstract,
    borderRadius: 10,
    paddingHorizontal: spacing.m,
    backgroundColor: "transparent",
  },
  inputWrapperError: {
    borderColor: palette.primary.error,
  },
  iconWrapper: {
    position: "absolute",
    left: spacing.s,
    zIndex: 1,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: spacing.s,
    fontFamily: typography.fontFamily.main,
    fontWeight: "400",
    fontSize: ms(16, 0.2),
    color: palette.text.main,
  },
  inputWithIcon: {
    paddingLeft: spacing.xl + spacing.s,
  },
  inputWithRightElement: {
    paddingRight: spacing.xl + spacing.s,
  },
  rightElementWrapper: {
    position: "absolute",
    right: spacing.s,
    zIndex: 1,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    minHeight: ms(18, 0.2),
    fontFamily: typography.fontFamily.main,
    fontWeight: "500",
    fontSize: ms(15, 0.2),
    lineHeight: ms(18, 0.2),
    color: palette.primary.error,
    textAlign: "left",
  },
  errorTextFlex: {
    flex: 1,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: spacing.xs,
  },
  footerRight: {
    marginLeft: spacing.s,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
