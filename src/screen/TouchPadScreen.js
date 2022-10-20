import { io } from "socket.io-client";
import { PACKAGE_SERVER_PORT } from "@env";
import { useRef } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

const TouchPadScreen = ({ navigation: { navigate }, route }) => {
  const socket = io(`http://${route.params.ipAddress}:${PACKAGE_SERVER_PORT}`);

  const xPosition = useRef(0);
  const yPosition = useRef(0);

  const tapGesture = Gesture.Tap();
  const panGesture = Gesture.Pan();

  tapGesture.onTouchesUp((event) => {
    if (event.numberOfTouches === 0) {
      socket.emit("user-send", ["click"]);

      return () => {
        socket.disconnect();
      };
    } else if (event.numberOfTouches === 1) {
      socket.emit("user-send", ["rightClick"]);

      return () => {
        socket.disconnect();
      };
    }
  });

  panGesture.onUpdate((event) => {
    if (event.numberOfPointers === 1) {
      socket.emit("user-send", [
        "move",
        parseInt(event.absoluteX) - xPosition.current,
        parseInt(event.absoluteY) - yPosition.current,
      ]);
    }

    xPosition.current = parseInt(event.absoluteX);
    yPosition.current = parseInt(event.absoluteY);

    return () => {
      socket.disconnect();
    };
  });

  const composedGesture = Gesture.Race(tapGesture, panGesture);

  return (
    <TouchPadContainer>
      <TouchPadPreviousScreenButton onPress={() => navigate("PcList")}>
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </TouchPadPreviousScreenButton>
      <TouchPadSettingButton>
        <Ionicons name="settings" size={24} color="#7e94ae" />
      </TouchPadSettingButton>
      <GestureDetector gesture={composedGesture}>
        <TouchPadTouchArea />
      </GestureDetector>
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

const TouchPadTouchArea = styled.TouchableOpacity`
  margin-top: 15%;
  height: 80%;
  width: 90%;
  background-color: transparent;
  border: 3px solid #7e94ae;
  border-radius: 20px;
  opacity: 0.2;
`;

export default TouchPadScreen;
