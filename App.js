import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SERVER_PORT } from "@env";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io(`${SERVER_PORT}`);
    socket.emit("user-send", message);
    console.log("useEffect ~ message", message);
    socket.on("broadcast", (data) => {
      console.log("socket.on ~ data", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [message]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{message}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(e) => setMessage(e)}
      ></TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    margin: 15,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
  },
});
