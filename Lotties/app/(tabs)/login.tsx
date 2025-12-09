import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { CTAButton } from "../../src/components/CTAButton";
import { LottiesLogo } from "../../src/components/LottiesLogo";
import { MainHeading } from "../../src/components/MainHeading";
import { ParagraphRegular } from "../../src/components/ParagraphRegular";
import { palette } from "../../src/constants/colors";
import { typography } from "../../src/constants/typography";
import { useAuth } from "../../src/state/AuthContext";
import { hs, vs } from "../../src/utils/scale";

const screen = Dimensions.get("window");
const inputWidth = React.useRef(hs(353, screen.width)).current;
const inputHeight = React.useRef(vs(51, screen.height)).current;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const auth = useAuth();

  // Keep logo size and position stable
  const logoWidth = React.useRef(hs(201, screen.width)).current;
  const logoHeight = React.useRef(vs(101, screen.height)).current;
  const logoTop = React.useRef(
    10 + (initialWindowMetrics?.insets.top ?? insets.top ?? 0)
  ).current;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const canSubmit = email.trim().length > 0 && password.trim().length > 0;
  const ctaBottom = 30;

  const handleLogin = () => {
    const ok = auth.login(email, password);
    if (ok) {
      setMessage("Succesvol ingelogd!");
    } else {
      setMessage("Ongeldige inloggegevens. Probeer opnieuw.");
    }
  };

  const formTop = logoTop + logoHeight + 20;

  return (
    <SafeAreaView style={styles.safeArea}>
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
              fontWeight="600"
              color={palette.cta.primary}
              style={styles.signupLink}
            >
              Account aanmaken
            </ParagraphRegular>
          </View>
          <View style={styles.formContent}>
            <View style={[styles.inputWrapper, { width: inputWidth, height: inputHeight }]}>
              <FontAwesome
                name="envelope-o"
                size={18}
                color={palette.text.abstract}
                style={styles.inputIcon}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Vul je e-mail in"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={palette.text.abstract}
                style={[styles.input, styles.inputWithIcon]}
              />
            </View>
            <View style={[styles.passwordRow, { width: inputWidth, height: inputHeight, marginTop: 20 }]}>
              <FontAwesome
                name="lock"
                size={20}
                color={palette.text.abstract}
                style={styles.inputIcon}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Voer je wachtwoord in"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                placeholderTextColor={palette.text.abstract}
                style={[styles.input, styles.passwordInput, styles.inputWithIcon]}
              />
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={10}
                style={styles.showButton}
              >
                <FontAwesome
                  name={showPassword ? "eye-slash" : "eye"}
                  size={20}
                  color={palette.text.abstract}
                />
              </Pressable>
            </View>
            <ParagraphRegular style={styles.forgotPassword}>
              Wachtwoord vergeten?
            </ParagraphRegular>
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
        <View style={[styles.loginButton, { bottom: ctaBottom }]}>
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
    marginTop: 30,
  },
  inputWrapper: {
    alignSelf: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 0,
    borderWidth: 1,
    borderColor: palette.text.abstract,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: typography.fontFamily.main,
    fontWeight: "400",
    fontSize: 16,
    color: palette.text.main,
    backgroundColor: "transparent",
  },
  inputWithIcon: {
    paddingLeft: 40,
    width: "100%",
    height: "100%",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    alignSelf: "center",
  },
  passwordInput: {
    flex: 1,
    width: "100%",
    paddingRight: 60,
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: "flex-end",
    fontSize: 12,
    fontWeight: "500",
    color: palette.cta.primary,
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
    marginTop: 15,
    alignItems: "center",
  },
  signupQuestion: {
    textAlign: "center",
  },
  signupLink: {
    marginTop: 0,
    textAlign: "center",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    color: palette.text.main,
    fontFamily: typography.fontFamily.paragraph,
    fontSize: 14,
  },
});
