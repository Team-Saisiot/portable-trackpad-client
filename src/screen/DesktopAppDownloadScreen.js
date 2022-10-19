import axios from "axios";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useState } from "react";
import { SERVER_PORT } from "@env";

export default function DesktopAppDownloadScreen({ navigation }) {
  const [text, onChangeText] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const logoutAlert = async () => {
    await AsyncStorage.clear();

    Alert.alert("Logout", "로그아웃이 완료되었습니다.", [
      {
        text: "확인",
        onPress: () => navigation.navigate("Main"),
      },
    ]);
  };

  const validateEmail = async (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    try {
      if (reg.test(text) === false) {
        Alert.alert("email validate fail", "유효한 이메일이 아닙니다.", [
          {
            text: "확인",
          },
        ]);
        onChangeText(text);

        return false;
      } else {
        await axios.post(`${SERVER_PORT}/users/email`, {
          email: text,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toNextScreen = async () => {
    const idToken = await AsyncStorage.getItem("idToken");

    if (idToken) {
      navigation.navigate("Network");
    } else {
      Alert.alert("Need Login", "로그인이 필요합니다.", [
        {
          text: "확인",
        },
      ]);
    }
  };

  return (
    <DesktopAppContainer>
      <DesktopAppPreviousScreenButton
        onPress={() => navigation.navigate("Main")}
      >
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </DesktopAppPreviousScreenButton>
      <DesktopAppLogoutScreenButton onPress={logoutAlert}>
        <DesktopAppLogoutButtonText>Logout</DesktopAppLogoutButtonText>
      </DesktopAppLogoutScreenButton>
      <Ionicons name="download-outline" size={150} color="#7e94ae" />
      <DesktopAppTitleBox>
        <DesktopAppTitleText>본 어플리케이션은 데스크탑에</DesktopAppTitleText>
        <DesktopAppTitleText>프로그램설치가 필요합니다.</DesktopAppTitleText>
      </DesktopAppTitleBox>
      <DesktopAppDescriptionBox>
        <DesktopAppDescriptionText>
          아래에 Email을 입력하시면
        </DesktopAppDescriptionText>
        <DesktopAppDescriptionText>
          데스크탑 프로그램 설치파일이 전송됩니다.
        </DesktopAppDescriptionText>
      </DesktopAppDescriptionBox>
      <UserEmailBox>
        <Ionicons name="mail-outline" size={30} color="#7e94ae" />
        <UserEmailTextInput
          onChangeText={onChangeText}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={text}
        />
        <UserEmailPlaceHolder
          style={isFocus ? { top: -10, left: 35 } : { left: 40 }}
        >
          Email
        </UserEmailPlaceHolder>
        <Ionicons
          name="arrow-forward"
          size={24}
          color="#7e94ae"
          onPress={() => validateEmail(text)}
        />
      </UserEmailBox>
      <DesktopAppNextScreenButton onPress={toNextScreen}>
        <DesktopAppNextScreenButtonText>Next</DesktopAppNextScreenButtonText>
      </DesktopAppNextScreenButton>
    </DesktopAppContainer>
  );
}

const DesktopAppContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const DesktopAppTitleText = styled.Text`
  font-size: 20px;
`;

const DesktopAppDescriptionText = styled.Text`
  font-size: 12px;
`;

const DesktopAppPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
`;

const DesktopAppTitleBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const DesktopAppDescriptionBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const DesktopAppLogoutScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
`;

const DesktopAppLogoutButtonText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: #7e94ae;
`;

const UserEmailBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserEmailTextInput = styled.TextInput`
  width: 200px;
  height: 50px;
  padding: 10px;
  border-bottom: 2px;
  font-size: 20px;
  box-sizing: border-box;
`;

const UserEmailPlaceHolder = styled.Text`
  position: absolute;
  font-size: 15px;
  color: #999999;
`;

const DesktopAppNextScreenButton = styled.TouchableOpacity`
  width: 170px;
  height: 50px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  background-color: #7e94ae;
  border-radius: 10px;
`;

const DesktopAppNextScreenButtonText = styled.Text`
  font-size: 25px;
  color: #f3eee6;
`;
