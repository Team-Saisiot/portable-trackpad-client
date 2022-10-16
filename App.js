import { useEffect } from "react";
import { SERVER_PORT } from "@env";
import { io } from "socket.io-client";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./src/screen/MainScreen";
import LoginScreen from "./src/screen/LoginScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  // ## Socket TEST
  // useEffect(() => {
  //   const socket = io(`${SERVER_PORT}`);

  //   if (Platform.OS === "web") {
  //     window.addEventListener("keydown", (e) => {
  //       if (e.keyCode === 37) {
  //         socket.emit("user-send", "left");
  //       } else if (e.keyCode === 38) {
  //         socket.emit("user-send", "up");
  //       } else if (e.keyCode === 39) {
  //         socket.emit("user-send", "right");
  //       } else if (e.keyCode === 40) {
  //         socket.emit("user-send", "down");
  //       }
  //     });

  //     socket.on("broadcast");

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // });

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
