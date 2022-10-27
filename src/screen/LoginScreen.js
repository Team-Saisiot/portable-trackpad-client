import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { SERVER_PORT, EXPO_CLIENT_ID, EXPO_WEB_CLIENT_ID } from "@env";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../constants/COLORS";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    expoClientId: EXPO_CLIENT_ID,
    webClientId: EXPO_WEB_CLIENT_ID,
  });

  const googleLogin = async (token) => {
    try {
      const user = await axios.post(
        `${SERVER_PORT}/login`,
        {},
        {
          headers: {
            idToken: token,
          },
        },
      );

      await AsyncStorage.setItem("idToken", JSON.stringify(user.data));
    } catch (error) {
      console.log(error);
    }
  };

  const toNextScreen = async () => {
    const idToken = await AsyncStorage.getItem("idToken");

    if (idToken) {
      navigation.navigate("DownloadGuide");
    } else {
      Alert.alert("Need Login", "로그인이 필요합니다.", [
        {
          text: "확인",
        },
      ]);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      googleLogin(response.params.id_token);
    }
  }, [response]);

  return (
    <LoginContainer>
      <LoginPreviousScreenButton onPress={() => navigation.navigate("Main")}>
        <Ionicons name="arrow-back" size={32} color={COLORS.MAIN_COLOR} />
      </LoginPreviousScreenButton>
      <LoginNextScreenButton onPress={toNextScreen}>
        <Ionicons name="arrow-forward" size={32} color={COLORS.MAIN_COLOR} />
      </LoginNextScreenButton>
      <LoginTitleText>Login</LoginTitleText>
      <LoginLoginButton
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Ionicons
          name="logo-google"
          size={32}
          color={COLORS.BACKGROUND_COLOR}
        />
        <LoginLoginButtonText>Google Login</LoginLoginButtonText>
      </LoginLoginButton>
    </LoginContainer>
  );
};

const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
`;

const LoginTitleText = styled.Text`
  margin-bottom: 50px;
  font-size: 60px;
`;

const LoginLoginButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  padding: 15px 50px;
  background-color: ${COLORS.MAIN_COLOR};
  border-radius: 10px;
`;

const LoginLoginButtonText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: ${COLORS.BACKGROUND_COLOR};
`;

const LoginPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const LoginNextScreenButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 20px;
`;

export default LoginScreen;
