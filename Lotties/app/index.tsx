import { StyleSheet, Text, View } from "react-native";
import { palette } from "./constants/colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.background.main,
  },
  text: {
    color: palette.text.main,
    fontSize: 20,
    fontWeight: "600",
  },
});
