import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const TouchPadScreen = ({ navigation }) => {
  return (
    <TouchPadContainer>
      <TouchPadPreviousScreenButton
        onPress={() => navigation.navigate("PcList")}
      >
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </TouchPadPreviousScreenButton>
      <TouchPadSettingButton>
        <Ionicons name="settings" size={24} color="#7e94ae" />
      </TouchPadSettingButton>
      <TrackPadTouchArea />
    </TouchPadContainer>
  );
};

const TouchPadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const TouchPadPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const TouchPadSettingButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 20px;
`;

const TrackPadTouchArea = styled.TouchableOpacity`
  margin-top: 15%;
  height: 80%;
  width: 90%;
  background-color: transparent;
  border: 3px solid #7e94ae;
  border-radius: 20px;
  opacity: 0.2;
`;

export default TouchPadScreen;
