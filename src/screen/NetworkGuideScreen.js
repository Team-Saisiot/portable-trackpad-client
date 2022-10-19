import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NetworkGuideScreen({ navigation }) {
  const logoutAlert = async () => {
    await AsyncStorage.clear();

    Alert.alert("Logout", "로그아웃이 완료되었습니다.", [
      {
        text: "확인",
        onPress: () => navigation.navigate("Main"),
      },
    ]);
  };

  const toNextScreen = async () => {
    const idToken = await AsyncStorage.getItem("idToken");

    if (idToken) {
      navigation.navigate("PcList");
    } else {
      Alert.alert("Need Login", "로그인이 필요합니다.", [
        {
          text: "확인",
        },
      ]);
    }
  };

  return (
    <NetworkContainer>
      <NetworkPreviousScreenButton
        onPress={() => navigation.navigate("DesktopAppDownload")}
      >
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </NetworkPreviousScreenButton>
      <NetworkLogoutButton onPress={logoutAlert}>
        <NetworkLogoutButtonText>Logout</NetworkLogoutButtonText>
      </NetworkLogoutButton>
      <Ionicons name="wifi" size={150} color="#7e94ae" />
      <NetworkTextBox>
        <NetworkText>본 어플리케이션은</NetworkText>
        <NetworkText>데스크탑과 디바이스가</NetworkText>
        <NetworkText>서로 같은 네트워크에</NetworkText>
        <NetworkText>연결되어있어야 합니다.</NetworkText>
      </NetworkTextBox>
      <NetworkNextButton onPress={toNextScreen}>
        <NetworkNextButtonText>Next</NetworkNextButtonText>
      </NetworkNextButton>
    </NetworkContainer>
  );
}

const NetworkContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const NetworkPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const NetworkLogoutButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 20px;
`;
const NetworkLogoutButtonText = styled.Text`
  font-size: 20px;
  margin-right: 10px;
  color: #7e94ae;
`;

const NetworkTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const NetworkText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #333333;
`;

const NetworkNextButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  padding: 10px 60px;
  background-color: #7e94ae;
  border-radius: 10px;
`;

const NetworkNextButtonText = styled.Text`
  font-size: 20px;
  color: #f3eee6;
`;
