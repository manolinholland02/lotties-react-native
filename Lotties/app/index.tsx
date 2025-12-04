import { StyleSheet, Text, View } from "react-native";
import { CTAButton } from "./components/CTAButton";
import { palette } from "./constants/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello world</Text>
      <CTAButton label="Continue" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
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
