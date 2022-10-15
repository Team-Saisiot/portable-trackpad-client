import styled from "styled-components/native";

export default function MainPage() {
  return (
    <MainContainer>
      <MainTitleText>Porterble</MainTitleText>
      <MainTitleText>Track Pad</MainTitleText>
      <MainLoginButton>
        <MainLoginButtonText>Login</MainLoginButtonText>
      </MainLoginButton>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3eee6;
`;

const MainTitleText = styled.Text`
  font-size: 13vmin;
`;

const MainLoginButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  padding: 3vmin 4vmin;
  width: 50vw;
  font-size: 5vmin;
  color: #f3eee6;
  background-color: #7e94ae;
  border-radius: 2vmin;
`;

const MainLoginButtonText = styled.Text`
  font-size: 5vmin;
  color: #f3eee6;
`;
