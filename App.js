import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./src/screen/MainScreen";
import LoginScreen from "./src/screen/LoginScreen";
import DownloadGuideScreen from "./src/screen/DownloadGuideScreen";
import NetworkGuideScreen from "./src/screen/NetworkGuideScreen";
import PcListScreen from "./src/screen/PcListScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DownloadGuide" component={DownloadGuideScreen} />
        <Stack.Screen name="Network" component={NetworkGuideScreen} />
        <Stack.Screen name="PcList" component={PcListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
