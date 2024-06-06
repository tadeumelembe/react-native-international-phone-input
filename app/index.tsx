import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <TextInput style={styles.inputContainer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },

  inputContainer: {
    width: '100%',
    height: 50,
    padding: 10,
    borderRadius: 20,
    borderWidth:1,
    overflow: "hidden",
    gap: 10,
  },
  rowContainer: {
    width: "100%",
    height: 110,
    backgroundColor: "#888888",
    padding: 10,
    borderRadius: 20,
  },
});
