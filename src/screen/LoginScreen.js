import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LoginScreen({ navigation }) {
  return (
    <LoginContainer>
      <LoginPreviousScreenButton onPress={() => navigation.navigate("Main")}>
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </LoginPreviousScreenButton>
      <LoginTitleText>Login</LoginTitleText>
      <LoginLoginButton>
        <Ionicons name="logo-google" size={32} color="#f3eee6" />
        <LoginLoginButtonText>Google Login</LoginLoginButtonText>
      </LoginLoginButton>
    </LoginContainer>
  );
}

const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
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
  background-color: #7e94ae;
  border-radius: 10px;
`;

const LoginLoginButtonText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: #f3eee6;
`;

const LoginPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
`;
