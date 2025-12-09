import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CTAButton } from "../../src/components/CTAButton";
import { FormField } from "../../src/components/FormField";
import { LottiesLogo } from "../../src/components/LottiesLogo";
import { MainHeading } from "../../src/components/MainHeading";
import { ParagraphRegular } from "../../src/components/ParagraphRegular";
import { palette } from "../../src/constants/colors";
import { layout } from "../../src/constants/layout";
import { spacing } from "../../src/constants/spacing";
import { typography } from "../../src/constants/typography";
import { hs, ms } from "../../src/utils/scale";
import { getLogoSize } from "../../src/utils/logo";
import { register as registerUser } from "../../src/api/auth";
import { ApiError } from "../../src/api/client";

const screen = Dimensions.get("window");
const inputWidth = React.useRef(Math.min(hs(353, screen.width), 370)).current;
const inputHeight = React.useRef(ms(51, 0.2, screen.width)).current;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordMinLength = 8;

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const resolvedInsets = React.useMemo(
    () => initialWindowMetrics?.insets ?? insets,
    [insets]
  );

  const { logoWidth, logoHeight } = React.useMemo(
    () => getLogoSize(screen.width),
    []
  );
  const logoTop = React.useRef(0).current;
  const formTop = logoTop + logoHeight + 20;

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmError, setConfirmError] = React.useState("");

  const trimmedFirst = firstName.trim();
  const trimmedLast = lastName.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const canSubmit =
    trimmedFirst.length > 0 &&
    trimmedLast.length > 0 &&
    trimmedEmail.length > 0 &&
    emailRegex.test(trimmedEmail) &&
    trimmedPassword.length >= passwordMinLength &&
    confirmPassword === password;

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    setFirstNameError("");
    setMessage(null);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setLastNameError("");
    setMessage(null);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError("");
    setMessage(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError("");
    setConfirmError("");
    setMessage(null);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmError("");
    setMessage(null);
  };

  const handleRegister = () => {
    setMessage(null);

    if (!trimmedFirst) {
      setFirstNameError("Vul je voornaam in.");
      return;
    }

    if (!trimmedLast) {
      setLastNameError("Vul je achternaam in.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Voer een geldig e-mailadres in.");
      return;
    }

    if (trimmedPassword.length < passwordMinLength) {
      setPasswordError(`Minimaal ${passwordMinLength} tekens.`);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmError("Wachtwoorden komen niet overeen.");
      return;
    }

    setIsSubmitting(true);
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    registerUser({
      firstName: trimmedFirst,
      lastName: trimmedLast,
      email: trimmedEmail,
      password: trimmedPassword,
    })
      .then(() => {
        setMessage("Account aangemaakt! Log nu in om verder te gaan.");
      })
      .catch((error) => {
        let errorMessage = "Registreren mislukt. Probeer het opnieuw.";
        if (error instanceof ApiError && error.message) {
          errorMessage = error.message;
        }
        setMessage(errorMessage);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleBackToLogin = () => {
    router.replace("/(tabs)/login");
  };

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
          <MainHeading style={styles.heading}>Account aanmaken</MainHeading>
          <View style={styles.loginPrompt}>
            <ParagraphRegular style={styles.loginQuestion}>
              Heb je al een account?
            </ParagraphRegular>
            <ParagraphRegular
              fontWeight="700"
              color={palette.cta.primary}
              style={styles.loginLink}
              onPress={handleBackToLogin}
            >
              Log in
            </ParagraphRegular>
          </View>
          <View style={styles.formContent}>
            <FormField
              width={inputWidth}
              height={inputHeight}
              value={firstName}
              onChangeText={handleFirstNameChange}
              placeholder="Voornaam"
              autoCapitalize="words"
              autoCorrect={false}
              icon={
                <FontAwesome
                  name="user-o"
                  size={ms(18, 0.2)}
                  color={palette.text.abstract}
                />
              }
              errorText={firstNameError}
              style={styles.input}
            />

            <FormField
              width={inputWidth}
              height={inputHeight}
              value={lastName}
              onChangeText={handleLastNameChange}
              placeholder="Achternaam"
              autoCapitalize="words"
              autoCorrect={false}
              icon={
                <FontAwesome
                  name="user-o"
                  size={ms(18, 0.2)}
                  color={palette.text.abstract}
                />
              }
              errorText={lastNameError}
              containerStyle={{ marginTop: spacing.s }}
              style={styles.input}
            />

            <FormField
              width={inputWidth}
              height={inputHeight}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="E-mailadres"
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
              containerStyle={{ marginTop: spacing.s }}
              style={styles.input}
            />

            <FormField
              width={inputWidth}
              height={inputHeight}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Wachtwoord"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              icon={
                <FontAwesome name="lock" size={ms(20, 0.2)} color={palette.text.abstract} />
              }
              errorText={passwordError}
              containerStyle={{ marginTop: spacing.s }}
              style={styles.input}
              footerRight={
                <Text style={styles.helperText}>
                  Minimaal {passwordMinLength} tekens
                </Text>
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

            <FormField
              width={inputWidth}
              height={inputHeight}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Bevestig wachtwoord"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              icon={
                <FontAwesome name="lock" size={ms(20, 0.2)} color={palette.text.abstract} />
              }
              errorText={confirmError}
              containerStyle={{ marginTop: spacing.s }}
              style={styles.input}
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
        <View style={[styles.registerButton, { bottom: layout.ctaBottom }]}>
          <CTAButton
            label="Account aanmaken"
            onPress={handleRegister}
            disabled={!canSubmit || isSubmitting}
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
  showButton: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  helperText: {
    fontSize: ms(12, 0.2),
    lineHeight: ms(16, 0.2),
    color: palette.text.abstract,
    fontFamily: typography.fontFamily.main,
  },
  registerButton: {
    position: "absolute",
    alignSelf: "center",
  },
  loginPrompt: {
    marginTop: ms(15, 0.2),
    alignItems: "center",
  },
  loginQuestion: {
    textAlign: "center",
  },
  loginLink: {
    marginTop: 0,
    textAlign: "center",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    color: palette.text.main,
    fontFamily: typography.fontFamily.secondary,
    fontSize: ms(14, 0.2),
  },
});
