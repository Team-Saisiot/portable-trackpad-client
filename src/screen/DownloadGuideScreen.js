import axios from "axios";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useState } from "react";
import { SERVER_PORT } from "@env";
import COLORS from "../constants/COLORS";

const DownloadGuideScreen = ({ navigation }) => {
  const [email, setUserEmail] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const validateEmail = async (text) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    try {
      if (reg.test(text) === false) {
        Alert.alert("email validate fail", "유효한 이메일이 아닙니다.", [
          {
            text: "확인",
          },
        ]);

        setUserEmail(text);

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
      navigation.navigate("NetworkGuide");
    } else {
      Alert.alert("Need Login", "로그인이 필요합니다.", [
        {
          text: "확인",
        },
      ]);
    }
  };

  return (
    <DownloadGuideContainer>
      <DownloadGuidePreviousScreenButton
        onPress={() => navigation.navigate("Main")}
      >
        <Ionicons name="arrow-back" size={32} color={COLORS.MAIN_COLOR} />
      </DownloadGuidePreviousScreenButton>
      <Ionicons name="download-outline" size={150} color={COLORS.MAIN_COLOR} />
      <DownloadGuideTitleBox>
        <DownloadGuideTitleText>
          본 어플리케이션은 데스크탑에
        </DownloadGuideTitleText>
        <DownloadGuideTitleText>
          프로그램설치가 필요합니다.
        </DownloadGuideTitleText>
      </DownloadGuideTitleBox>
      <DownloadGuideDescriptionBox>
        <DownloadGuideDescriptionText>
          아래에 Email을 입력하시면
        </DownloadGuideDescriptionText>
        <DownloadGuideDescriptionText>
          데스크탑 프로그램 설치파일이 전송됩니다.
        </DownloadGuideDescriptionText>
      </DownloadGuideDescriptionBox>
      <DownloadGuideUserEmailBox>
        <Ionicons name="mail-outline" size={30} color={COLORS.MAIN_COLOR} />
        <DownloadGuideUserEmailTextInput
          onChangeText={setUserEmail}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={email}
        />
        <DownloadGuideUserEmailPlaceHolder
          style={isFocus ? { top: -10, left: 35 } : { left: 40 }}
        >
          Email
        </DownloadGuideUserEmailPlaceHolder>
        <Ionicons
          name="arrow-forward"
          size={24}
          color={COLORS.MAIN_COLOR}
          onPress={() => validateEmail(email)}
        />
      </DownloadGuideUserEmailBox>
      <DownloadGuideNextScreenButton onPress={toNextScreen}>
        <DownloadGuideNextScreenButtonText>
          Next
        </DownloadGuideNextScreenButtonText>
      </DownloadGuideNextScreenButton>
    </DownloadGuideContainer>
  );
};

const DownloadGuideContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
`;

const DownloadGuideTitleText = styled.Text`
  font-size: 20px;
`;

const DownloadGuideDescriptionText = styled.Text`
  font-size: 12px;
`;

const DownloadGuidePreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const DownloadGuideTitleBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const DownloadGuideDescriptionBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const DownloadGuideUserEmailBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DownloadGuideUserEmailTextInput = styled.TextInput`
  width: 200px;
  height: 50px;
  padding: 10px;
  border-bottom: 2px;
  font-size: 20px;
  box-sizing: border-box;
`;

const DownloadGuideUserEmailPlaceHolder = styled.Text`
  position: absolute;
  font-size: 15px;
  color: #999999;
`;

const DownloadGuideNextScreenButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  padding: 10px 60px;
  background-color: ${COLORS.MAIN_COLOR};
  border-radius: 10px;
`;

const DownloadGuideNextScreenButtonText = styled.Text`
  font-size: 20px;
  color: ${COLORS.BACKGROUND_COLOR};
`;

export default DownloadGuideScreen;
