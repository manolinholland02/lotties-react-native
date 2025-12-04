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
import { CTAButton } from "../../src/components/CTAButton";
import { LottiesLogo } from "../../src/components/LottiesLogo";
import { ParagraphRegular } from "../../src/components/ParagraphRegular";
import { palette } from "../../src/constants/colors";
import { typography } from "../../src/constants/typography";
import { mockUsers } from "../../src/data/mockUsers";
import { useAuth } from "../../src/state/AuthContext";

const screen = Dimensions.get("window");

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const auth = useAuth();

  // Keep logo size and position stable
  const logoWidth = React.useRef(screen.width * (201 / 393)).current;
  const logoHeight = React.useRef(screen.height * (101 / 852)).current;
  const logoTop = React.useRef(
    10 + (initialWindowMetrics?.insets.top ?? insets.top ?? 0)
  ).current;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleLogin = () => {
    const ok = auth.login(email, password);
    if (ok) {
      setMessage("Succesvol ingelogd!");
    } else {
      setMessage("Ongeldige inloggegevens. Probeer opnieuw.");
    }
  };

  const formTop = logoTop + logoHeight + 40;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LottiesLogo
          width={logoWidth}
          height={logoHeight}
          style={[styles.logo, { top: logoTop }]}
        />
        <View style={[styles.form, { marginTop: formTop }]}>
          <ParagraphRegular style={styles.label}>E-mail</ParagraphRegular>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="jij@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <ParagraphRegular style={[styles.label, { marginTop: 16 }]}>
            Wachtwoord
          </ParagraphRegular>
          <View style={styles.passwordRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={[styles.input, styles.passwordInput]}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={10}
              style={styles.showButton}
            >
              <Text style={styles.showButtonText}>
                {showPassword ? "Verberg" : "Toon"}
              </Text>
            </Pressable>
          </View>
          <View style={styles.loginButton}>
            <CTAButton label="Log in" onPress={handleLogin} />
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.usersList}>
            <ParagraphRegular style={styles.usersTitle}>
              Beschikbare accounts:
            </ParagraphRegular>
            {mockUsers.map((u) => (
              <Text key={u.email} style={styles.userItem}>
                {u.email} / {u.password}
              </Text>
            ))}
          </View>
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
    paddingHorizontal: 24,
  },
  label: {
    textAlign: "left",
  },
  input: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: palette.text.secondary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: typography.fontFamily.paragraph,
    fontSize: 16,
    color: palette.text.main,
    backgroundColor: palette.primary.white,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  showButton: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  showButtonText: {
    color: palette.cta.primary,
    fontFamily: typography.fontFamily.paragraph,
    fontWeight: "700",
    fontSize: 14,
  },
  loginButton: {
    marginTop: 24,
    alignItems: "center",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    color: palette.text.main,
    fontFamily: typography.fontFamily.paragraph,
    fontSize: 14,
  },
  usersList: {
    marginTop: 24,
    gap: 6,
  },
  usersTitle: {
    textAlign: "left",
    fontWeight: "700",
  },
  userItem: {
    color: palette.text.main,
    fontFamily: typography.fontFamily.paragraph,
    fontSize: 14,
  },
});
