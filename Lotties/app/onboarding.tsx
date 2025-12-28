import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { MainHeading } from "../src/components/MainHeading";
import { ParagraphRegular } from "../src/components/ParagraphRegular";
import { palette } from "../src/constants/colors";
import { spacing } from "../src/constants/spacing";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeading style={styles.heading}>Onboarding</MainHeading>
        <ParagraphRegular style={styles.copy}>
          Placeholder screen after successful login. Replace with onboarding flow.
        </ParagraphRegular>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background.main,
  },
  container: {
    flex: 1,
    padding: spacing.l,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.background.main,
  },
  heading: {
    textAlign: "center",
  },
  copy: {
    marginTop: spacing.m,
    textAlign: "center",
    color: palette.text.abstract,
  },
});
