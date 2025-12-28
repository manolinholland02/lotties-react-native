import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CTAButton } from "../../src/components/CTAButton";
import { LottiesLogo } from "../../src/components/LottiesLogo";
import { MainHeading } from "../../src/components/MainHeading";
import { ParagraphRegular } from "../../src/components/ParagraphRegular";
import { FlatButton } from "../../src/components/FlatButton";
import { palette } from "../../src/constants/colors";
import { layout } from "../../src/constants/layout";
import { typography } from "../../src/constants/typography";
import { hs, ms, vs } from "../../src/utils/scale";
import { getLogoSize } from "../../src/utils/logo";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const progress = React.useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true);

  const availableHeight = height - insets.top - insets.bottom;
  const horizontalPadding = hs(24, width);
  const verticalPadding = vs(24, height);
  const bottomPadding = insets.bottom + layout.ctaBottom + vs(16, height);
  const sectionSpacing = vs(24, height);
  const buttonSpacing = vs(16, height);
  const { logoWidth, logoHeight } = getLogoSize(width);
  const buttonWidth = Math.min(hs(313, width), width - horizontalPadding * 2);
  const buttonHeight = vs(50, height);
  const heroLift = Math.min(vs(60, height), availableHeight * 0.1);
  const introStartOffset = Math.min(vs(80, height), availableHeight * 0.15);

  const logoTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [introStartOffset, -heroLift],
  });
  const subtitleOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const nextOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const nextTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [vs(12, height), 0],
  });
  const ctaSecondaryOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const ctaSecondaryTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [vs(6, height), 0],
  });
  const introOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const handleStart = () => {
    if (isAnimating || isExpanded) return;

    setIsAnimating(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsExpanded(true);
      setShowIntro(false);
      setIsAnimating(false);
    });
  };

  const handleLoginNavigate = () => {
    router.push("/(tabs)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.screen}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: insets.top + verticalPadding,
                paddingBottom: bottomPadding,
                paddingHorizontal: horizontalPadding,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.mainContent, { paddingBottom: sectionSpacing }]}>
              <Animated.View
                style={[
                  styles.hero,
                  { transform: [{ translateY: logoTranslateY }] },
                ]}
              >
                <LottiesLogo width={logoWidth} height={logoHeight} />
                <Animated.Text
                  style={[styles.subtitle, { opacity: subtitleOpacity }]}
                >
                  Jouw cyclusapp
                </Animated.Text>
              </Animated.View>
              <Animated.View
                style={[
                  styles.nextContent,
                  {
                    marginTop: sectionSpacing,
                    opacity: nextOpacity,
                    transform: [{ translateY: nextTranslateY }],
                  },
                ]}
                pointerEvents={isExpanded ? "auto" : "none"}
              >
                <MainHeading>Account aanmaken</MainHeading>
                <ParagraphRegular style={styles.nextSubtitle}>
                  Registreer je en krijg inzicht in je menstruatie en cyclus.
                </ParagraphRegular>
              </Animated.View>
            </View>
            <View style={[styles.ctaArea, { marginTop: sectionSpacing }]}>
              <Animated.View
                pointerEvents={isExpanded ? "auto" : "none"}
                style={[
                  styles.authButtons,
                  {
                    width: buttonWidth,
                    opacity: ctaSecondaryOpacity,
                    transform: [{ translateY: ctaSecondaryTranslateY }],
                  },
                ]}
              >
                <View style={[styles.loginRow, { marginBottom: buttonSpacing }]}>
                  <ParagraphRegular>Heb je al een account?</ParagraphRegular>
                  <ParagraphRegular
                    color={palette.cta.primary}
                    fontWeight="700"
                    style={[styles.loginLink, { marginLeft: 6 }]}
                    onPress={handleLoginNavigate}
                  >
                    Log in
                  </ParagraphRegular>
                </View>
                <FlatButton
                  label="Doorgaan met Google"
                  width={buttonWidth}
                  height={buttonHeight}
                  backgroundColor={palette.primary.white}
                  textColor="#3C4043"
                  borderRadius={0}
                  icon={<FontAwesome name="google" size={24} color="#3C4043" />}
                  style={{ marginBottom: buttonSpacing }}
                />
                <FlatButton
                  label="Doorgaan met e-mail"
                  width={buttonWidth}
                  height={buttonHeight}
                  backgroundColor={palette.background.navigation}
                  textColor={palette.primary.black}
                  borderRadius={0}
                  icon={<FontAwesome name="envelope-o" size={22} color={palette.primary.black} />}
                />
              </Animated.View>
            </View>
          </ScrollView>
          {showIntro ? (
            <Animated.View
              pointerEvents="auto"
              style={[
                styles.introOverlay,
                {
                  paddingTop: insets.top + verticalPadding,
                  paddingBottom: bottomPadding,
                  paddingHorizontal: horizontalPadding,
                  opacity: introOpacity,
                },
              ]}
            >
              <View style={styles.introCTAContainer}>
                <CTAButton label="Begin nu" onPress={handleStart} />
              </View>
            </Animated.View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background.main,
  },
  keyboardAvoider: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
  },
  subtitle: {
    marginTop: ms(8, 0.2),
    color: palette.text.main,
    fontFamily: typography.fontFamily.secondary,
    fontWeight: "400",
    fontSize: ms(18, 0.2),
    textAlign: "center",
  },
  nextContent: {
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  nextSubtitle: {
    marginTop: ms(15, 0.2),
    textAlign: "center",
  },
  ctaArea: {
    width: "100%",
    alignItems: "center",
  },
  authButtons: {
    alignItems: "center",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  loginLink: {
    marginLeft: 5,
  },
  introOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  introCTAContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
});

