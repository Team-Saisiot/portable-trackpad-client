import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NetworkGuideScreen = ({ navigation }) => {
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
    <NetworkGuideContainer>
      <NetworkGuidePreviousScreenButton
        onPress={() => navigation.navigate("DesktopAppDownload")}
      >
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </NetworkGuidePreviousScreenButton>
      <NetworkGuideLogoutButton onPress={logoutAlert}>
        <NetworkGuideLogoutButtonText>Logout</NetworkGuideLogoutButtonText>
      </NetworkGuideLogoutButton>
      <Ionicons name="wifi" size={150} color="#7e94ae" />
      <NetworkGuideTextBox>
        <NetworkGuideText>본 어플리케이션은</NetworkGuideText>
        <NetworkGuideText>데스크탑과 디바이스가</NetworkGuideText>
        <NetworkGuideText>서로 같은 네트워크에</NetworkGuideText>
        <NetworkGuideText>연결되어있어야 합니다.</NetworkGuideText>
      </NetworkGuideTextBox>
      <NetworkGuideNextButton onPress={toNextScreen}>
        <NetworkGuideNextButtonText>Next</NetworkGuideNextButtonText>
      </NetworkGuideNextButton>
    </NetworkGuideContainer>
  );
};

const NetworkGuideContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const NetworkGuidePreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const NetworkGuideLogoutButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 20px;
`;
const NetworkGuideLogoutButtonText = styled.Text`
  font-size: 20px;
  margin-right: 10px;
  color: #7e94ae;
`;

const NetworkGuideTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const NetworkGuideText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #333333;
`;

const NetworkGuideNextButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  padding: 10px 60px;
  background-color: #7e94ae;
  border-radius: 10px;
`;

const NetworkGuideNextButtonText = styled.Text`
  font-size: 20px;
  color: #f3eee6;
`;

export default NetworkGuideScreen;
