import styled from "styled-components/native";
import colors from "../constants/colors";

const MainScreen = ({ navigation }) => {
  return (
    <MainContainer>
      <MainTitleText>Portable</MainTitleText>
      <MainTitleText>TouchPad</MainTitleText>
      <MainLoginButton onPress={() => navigation.navigate("Login")}>
        <MainLoginButtonText>Login</MainLoginButtonText>
      </MainLoginButton>
    </MainContainer>
  );
};

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.BACKGROUND_COLOR};
`;

const MainTitleText = styled.Text`
  font-size: 50px;
`;

const MainLoginButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  padding: 15px 80px;
  background-color: ${colors.MAIN_COLOR};
  border-radius: 10px;
`;

const MainLoginButtonText = styled.Text`
  font-size: 20px;
  color: ${colors.BACKGROUND_COLOR};
`;

export default MainScreen;
