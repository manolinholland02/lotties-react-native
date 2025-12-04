import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { CTAButton } from "../src/components/CTAButton";
import { LottiesLogo } from "../src/components/LottiesLogo";
import { palette } from "../src/constants/colors";
import { typography } from "../src/constants/typography";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const progress = React.useRef(new Animated.Value(0)).current;

  const availableHeight = height - insets.top - insets.bottom;
  const centerLine = availableHeight / 2;

  // Responsive sizing from the 393x852 reference
  const logoWidth = width * (201 / 393);
  const logoHeight = height * (101 / 852);
  const initialLogoTop = centerLine - logoHeight;
  const targetLogoTop = 10 + insets.top;
  const logoTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, targetLogoTop - initialLogoTop],
  });
  const subtitleOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const handleStart = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoWrapper,
            { top: initialLogoTop, transform: [{ translateY: logoTranslateY }] },
          ]}
        >
          <LottiesLogo width={logoWidth} height={logoHeight} />
        </Animated.View>
        <Animated.Text
          style={[styles.subtitle, { top: centerLine, opacity: subtitleOpacity }]}
        >
          Jouw cyclusapp
        </Animated.Text>
        <View style={[styles.ctaWrapper, { bottom: 30 }]}>
          <CTAButton label="Begin nu" onPress={handleStart} />
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
  logoWrapper: {
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
