import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { CTAButton } from "../../src/components/CTAButton";
import { FormField } from "../../src/components/FormField";
import { LottiesLogo } from "../../src/components/LottiesLogo";
import { MainHeading } from "../../src/components/MainHeading";
import { ParagraphRegular } from "../../src/components/ParagraphRegular";
import { palette } from "../../src/constants/colors";
import { layout } from "../../src/constants/layout";
import { spacing } from "../../src/constants/spacing";
import { typography } from "../../src/constants/typography";
import { useAuth } from "../../src/state/AuthContext";
import { mockUsers } from "../../src/data/mockUsers";
import { hs, ms } from "../../src/utils/scale";
import { getLogoSize } from "../../src/utils/logo";

const screen = Dimensions.get("window");
const inputWidth = React.useRef(Math.min(hs(353, screen.width), 370)).current;
const inputHeight = React.useRef(ms(51, 0.2, screen.width)).current;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const resolvedInsets = React.useMemo(
    () => initialWindowMetrics?.insets ?? insets,
    [insets]
  );
  const auth = useAuth();

  // Keep logo size and position stable
  const { logoWidth, logoHeight } = React.useMemo(
    () => getLogoSize(screen.width),
    []
  );
  // Position at the top edge of the SafeAreaView (0px from the safe area's top).
  const logoTop = React.useRef(0).current;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && emailRegex.test(email.trim());

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError("");
    setPasswordError("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError("");
  };

  const handleLogin = () => {
    const trimmed = email.trim();
    if (!emailRegex.test(trimmed)) {
      setEmailError("Voer een geldig e-mailadres in.");
      return;
    }
    const exists = mockUsers.some(
      (u) => u.email.toLowerCase() === trimmed.toLowerCase()
    );
    if (!exists) {
      setEmailError("Dit e-mailadres is niet bekend");
      return;
    }
    const ok = auth.login(email, password);
    if (ok) {
      setPasswordError("");
      setMessage("Succesvol ingelogd!");
    } else {
      setPasswordError("Verkeerd wachtwoord");
      setMessage(null);
    }
  };

  const formTop = logoTop + logoHeight + 20;

  return (
    <SafeAreaView
      edges={[]}
      style={[
        styles.safeArea,
        {
          paddingTop: resolvedInsets.top,
          paddingBottom: resolvedInsets.bottom,
        },
      ]}
    >
      <View style={styles.container}>
        <LottiesLogo
          width={logoWidth}
          height={logoHeight}
          style={[styles.logo, { top: logoTop }]}
        />
        <View style={[styles.form, { marginTop: formTop }]}>
          <MainHeading style={styles.heading}>Log in</MainHeading>
          <View style={styles.signupPrompt}>
            <ParagraphRegular style={styles.signupQuestion}>
              Nog geen account?
            </ParagraphRegular>
            <ParagraphRegular
              fontWeight="700"
              color={palette.cta.primary}
              style={styles.signupLink}
            >
              Account aanmaken
            </ParagraphRegular>
          </View>
          <View style={styles.formContent}>
            <FormField
              width={inputWidth}
              height={inputHeight}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Vul je e-mail in"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              icon={
                <FontAwesome
                  name="envelope-o"
                  size={ms(18, 0.2)}
                  color={palette.text.abstract}
                />
              }
              errorText={emailError}
              style={styles.input}
            />

            <FormField
              width={inputWidth}
              height={inputHeight}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Voer je wachtwoord in"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              icon={
                <FontAwesome name="lock" size={ms(20, 0.2)} color={palette.text.abstract} />
              }
              errorText={passwordError}
              containerStyle={{ marginTop: spacing.s }}
              style={styles.input}
              footerRight={
                <ParagraphRegular style={styles.forgotPassword}>
                  Wachtwoord vergeten?
                </ParagraphRegular>
              }
              rightElement={
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={10}
                  style={styles.showButton}
                >
                  <FontAwesome
                    name={showPassword ? "eye-slash" : "eye"}
                    size={ms(20, 0.2)}
                    color={palette.text.abstract}
                  />
                </Pressable>
              }
            />
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
        <View style={[styles.loginButton, { bottom: layout.ctaBottom }]}>
          <CTAButton
            label="Inloggen"
            onPress={handleLogin}
            disabled={!canSubmit}
            backgroundColor={canSubmit ? palette.cta.primary : palette.text.abstract}
          />
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
  form: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  heading: {
    textAlign: "center",
  },
  formContent: {
    marginTop: ms(30, 0.2),
  },
  input: {
    fontFamily: typography.fontFamily.main,
    fontWeight: "400",
    fontSize: ms(16, 0.2),
    color: palette.text.main,
  },
  forgotPassword: {
    fontSize: ms(12, 0.2),
    lineHeight: ms(16, 0.2),
    fontWeight: "500",
    color: palette.cta.primary,
    textAlign: "right",
  },
  showButton: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  loginButton: {
    position: "absolute",
    alignSelf: "center",
  },
  signupPrompt: {
    marginTop: ms(15, 0.2),
    alignItems: "center",
  },
  signupQuestion: {
    textAlign: "center",
  },
  signupLink: {
    marginTop: 0,
    textAlign: "center",
  },
  emailErrorContainer: {
    alignSelf: "center",
    marginTop: ms(5, 0.2),
    alignItems: "flex-start",
  },
  emailErrorText: {
    minHeight: ms(18, 0.2),
    fontFamily: typography.fontFamily.main,
    fontWeight: "500",
    fontSize: ms(15, 0.2),
    lineHeight: ms(18, 0.2),
    color: palette.primary.error,
    textAlign: "left",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    color: palette.text.main,
    fontFamily: typography.fontFamily.secondary,
    fontSize: ms(14, 0.2),
  },
});
