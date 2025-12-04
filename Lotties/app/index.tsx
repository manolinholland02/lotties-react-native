import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { CTAButton } from "../src/components/CTAButton";
import { LottiesLogo } from "../src/components/LottiesLogo";
import { palette } from "../src/constants/colors";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LottiesLogo width={240} height={120} />
        <Text style={styles.text}>Hello world</Text>
        <CTAButton label="Continue" onPress={() => {}} />
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
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: palette.background.main,
  },
  text: {
    color: palette.text.main,
    fontSize: 20,
    fontWeight: "600",
  },
});
