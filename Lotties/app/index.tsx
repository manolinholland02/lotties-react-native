import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { CTAButton } from "../src/components/CTAButton";
import { LottiesLogo } from "../src/components/LottiesLogo";
import { palette } from "../src/constants/colors";
import { typography } from "../src/constants/typography";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const availableHeight = height - insets.top - insets.bottom;
  const centerLine = availableHeight / 2;

  // Responsive sizing from the 393x852 reference
  const logoWidth = width * (201 / 393);
  const logoHeight = height * (101 / 852);
  const ctaBottom = height * (10 / 852);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LottiesLogo
          width={logoWidth}
          height={logoHeight}
          style={[styles.logo, { bottom: centerLine }]}
        />
        <Text style={[styles.subtitle, { top: centerLine }]}>Jouw cyclusapp</Text>
        <View style={[styles.ctaWrapper, { bottom: ctaBottom }]}>
          <CTAButton label="Begin nu" onPress={() => {}} />
        </View>
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
    position: "relative",
    backgroundColor: palette.background.main,
  },
  logo: {
    position: "absolute",
    alignSelf: "center",
  },
  subtitle: {
    position: "absolute",
    alignSelf: "center",
    color: palette.text.main,
    fontFamily: typography.fontFamily.paragraph,
    fontWeight: "400",
    fontSize: 18,
  },
  ctaWrapper: {
    position: "absolute",
    alignSelf: "center",
  },
});
