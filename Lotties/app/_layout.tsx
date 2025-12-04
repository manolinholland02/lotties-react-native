import { Stack } from "expo-router";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { AuthProvider } from "../src/state/AuthContext";

const fallbackMetrics = {
  frame: {
    x: 0,
    y: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  insets: {
    top: Constants.statusBarHeight ?? 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics ?? fallbackMetrics}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
