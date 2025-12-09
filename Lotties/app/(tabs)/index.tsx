import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Animated,
  Easing,
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
import { typography } from "../../src/constants/typography";
import { hs, ms, vs } from "../../src/utils/scale";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const progress = React.useRef(new Animated.Value(0)).current;

  const availableHeight = height - insets.top - insets.bottom;
  const centerLine = availableHeight / 2;

  const logoWidth = hs(201, width);
  const logoHeight = logoWidth * (101 / 201);
  const buttonWidth = hs(313, width);
  const buttonHeight = vs(50, height);
  const initialLogoTop = centerLine - logoHeight;
  const targetLogoTop = 0;
  const logoTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, targetLogoTop - initialLogoTop],
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
    outputRange: [20, 0],
  });
  const [headingHeight, setHeadingHeight] = React.useState(0);
  const [loginRowHeight, setLoginRowHeight] = React.useState(0);
  const textGap = ms(15, 0.2);
  const contentTop = centerLine - headingHeight - textGap;
  const authGap = 20;
  const ctaPrimaryOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const ctaSecondaryOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleStart = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handleLoginNavigate = () => {
    router.push("/(tabs)/login");
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
        <Animated.View
          style={[
            styles.nextContent,
            {
              top: contentTop,
              opacity: nextOpacity,
              transform: [{ translateY: nextTranslateY }],
            },
          ]}
        >
          <MainHeading
            onLayout={(event) => setHeadingHeight(event.nativeEvent.layout.height)}
          >
            Account aanmaken
          </MainHeading>
          <ParagraphRegular style={styles.nextSubtitle}>
            Registreer je om je menstruatie en stemming eenvoudig te volgen.
          </ParagraphRegular>
        </Animated.View>
        <View style={[styles.ctaArea, { bottom: 10, width: buttonWidth }]}>
          <Animated.View
            style={[
              styles.primaryButton,
              {
                opacity: ctaPrimaryOpacity,
                width: buttonWidth,
                top: loginRowHeight + 20 + (buttonHeight + authGap) * 2,
              },
            ]}
            pointerEvents="box-none"
          >
            <CTAButton label="Begin nu" onPress={handleStart} />
          </Animated.View>
          <Animated.View
            style={[
              styles.authButtons,
              { opacity: ctaSecondaryOpacity, width: buttonWidth, gap: authGap },
            ]}
          >
            <View
              style={styles.loginRow}
              onLayout={(event) => setLoginRowHeight(event.nativeEvent.layout.height)}
            >
              <ParagraphRegular>Heb je al een account?</ParagraphRegular>
              <ParagraphRegular
                color={palette.cta.primary}
                fontWeight="600"
                style={styles.loginLink}
                onPress={handleLoginNavigate}
              >
                Log in
              </ParagraphRegular>
            </View>
            <FlatButton
              label="Doorgaan met Apple"
              width={buttonWidth}
              height={buttonHeight}
              backgroundColor={palette.primary.black}
              textColor={palette.primary.white}
              borderRadius={0}
              icon={<FontAwesome name="apple" size={24} color={palette.primary.white} />}
            />
            <FlatButton
              label="Doorgaan met Google"
              width={buttonWidth}
              height={buttonHeight}
              backgroundColor={palette.primary.white}
              textColor="#3C4043"
              borderRadius={0}
              icon={<FontAwesome name="google" size={24} color="#3C4043" />}
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
    fontFamily: typography.fontFamily.secondary,
    fontWeight: "400",
    fontSize: ms(18, 0.2),
  },
  nextContent: {
    position: "absolute",
    alignSelf: "center",
    width: "80%",
  },
  nextSubtitle: {
    marginTop: ms(15, 0.2),
  },
  ctaArea: {
    position: "absolute",
    alignSelf: "center",
  },
  primaryButton: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
  },
  authButtons: {
    flexDirection: "column",
    alignItems: "center",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginLink: {
    marginLeft: 5,
  },
});
