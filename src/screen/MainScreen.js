import styled from "styled-components/native";

export default function MainScreen({ navigation }) {
  return (
    <MainContainer>
      <MainTitleText>Portable</MainTitleText>
      <MainTitleText>TrackPad</MainTitleText>
      <MainLoginButton onPress={() => navigation.navigate("Login")}>
        <MainLoginButtonText>Login</MainLoginButtonText>
      </MainLoginButton>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const MainTitleText = styled.Text`
  font-size: 50px;
`;

const MainLoginButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  padding: 15px 80px;
  background-color: #7e94ae;
  border-radius: 10px;
`;

const MainLoginButtonText = styled.Text`
  font-size: 20px;
  color: #f3eee6;
`;
