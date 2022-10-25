import React, { useRef, useState } from "react";
import { Alert, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PACKAGE_SERVER_PORT } from "@env";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import colors from "../constants/colors";

const TouchPadScreen = ({ navigation: { navigate }, route }) => {
  const [isSettingButtonPressed, setIsSettingButtonPressed] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const xPosition = useRef(0);
  const yPosition = useRef(0);
  const startXPosition = useRef(0);
  const startYPosition = useRef(0);
  const prevXPosition = useRef(0);
  const prevYPosition = useRef(0);

  const socket = io(`http://${route.params.ipAddress}:${PACKAGE_SERVER_PORT}`);

  let rotateCount = 0;
  let prevAngle = -1;
  let cornerCount = 0;

  const logoutAlert = async () => {
    await AsyncStorage.clear();

    Alert.alert("Logout", "로그아웃이 완료되었습니다.", [
      {
        text: "확인",
        onPress: () => navigate("Main"),
      },
    ]);
  };

  const panGesture = Gesture.Pan();
  const drawingGesture = Gesture.Pan();
  const fourPointPanGesture = Gesture.Pan();
  const twoPointPanGesture = Gesture.Pan();
  const tapGesture = Gesture.Tap();
  const rotationGesture = Gesture.Rotation();

  fourPointPanGesture.minPointers(4);
  fourPointPanGesture.maxPointers(4);
  twoPointPanGesture.minPointers(2);
  twoPointPanGesture.maxPointers(2);

  tapGesture.onTouchesUp((event) => {
    if (event.numberOfTouches === 0) {
      socket.emit("user-send", ["click"]);
    } else if (event.numberOfTouches === 1) {
      socket.emit("user-send", ["rightClick"]);
    }
  });

  panGesture.onStart((event) => {
    if (event.numberOfPointers === 3) {
      socket.emit("user-send", ["dragDown"]);
    }
  });

  panGesture.onUpdate((event) => {
    if (event.numberOfPointers === 1 || event.numberOfPointers === 3) {
      socket.emit("user-send", [
        "move",
        parseInt(event.absoluteX) - xPosition.current,
        parseInt(event.absoluteY) - yPosition.current,
      ]);
    }

    xPosition.current = parseInt(event.absoluteX);
    yPosition.current = parseInt(event.absoluteY);
  });

  panGesture.onTouchesUp((event) => {
    if (event.numberOfTouches === 2) {
      socket.emit("user-send", ["dragUp"]);
    }
  });

  drawingGesture.onStart((event) => {
    startXPosition.current = event.absoluteX;
    startYPosition.current = event.absoluteY;
    prevXPosition.current = startXPosition.current;
    prevYPosition.current = startYPosition.current;
  });

  drawingGesture.onUpdate((event) => {
    const changeX = prevXPosition.current - event.absoluteX;
    const changeY = prevYPosition.current - event.absoluteY;

    if (Math.abs(changeX) > 50 || Math.abs(changeY) > 50) {
      prevXPosition.current = event.absoluteX;
      prevYPosition.current = event.absoluteY;
      const radian = Math.atan2(changeY, changeX);
      const degree = (radian * 180) / Math.PI;

      if (prevAngle !== -1) {
        let angleChange = Math.abs(prevAngle - degree);
        angleChange = angleChange > 180 ? 360 - angleChange : angleChange;

        if (angleChange > 50) {
          cornerCount++;
        }
      }

      prevAngle = degree;
    }
  });

  drawingGesture.onEnd((event) => {
    let distanceX = startXPosition.current - event.absoluteX;
    let distanceY = startYPosition.current - event.absoluteY;
    startXPosition.current;
    startYPosition.current;

    if (Math.abs(distanceX) > 80 || Math.abs(distanceY) > 80) {
      cornerCount = 0;
      prevAngle = -1;

      return;
    }

    if (cornerCount === 3) {
      socket.emit("drawing", ["square"]);
    } else if (cornerCount === 2) {
      socket.emit("drawing", ["triangle"]);
    } else {
      socket.emit("drawing", ["circle"]);
    }

    cornerCount = 0;
    prevAngle = -1;
  });

  fourPointPanGesture.onEnd((event) => {
    if (event.translationX > 0) {
      socket.emit("user-send", ["goForwardInTap"]);
    } else {
      socket.emit("user-send", ["goBackInTap"]);
    }
  });

  twoPointPanGesture.onUpdate((event) => {
    if (event.numberOfPointers === 2) {
      socket.emit("user-send", [
        "scroll",
        0,
        (parseInt(event.absoluteY) - yPosition.current) * 4,
      ]);
    }

    xPosition.current = parseInt(event.absoluteX);
    yPosition.current = parseInt(event.absoluteY);
  });

  rotationGesture.onUpdate((event) => {
    rotateCount++;

    if (event.numberOfPointers === 3 && rotateCount > 3) {
      socket.emit("user-send", ["volume", event.rotation]);

      rotateCount = 0;
    }
  });

  const composedGesture = isDrawingMode
    ? Gesture.Race(drawingGesture)
    : Gesture.Race(
        fourPointPanGesture,
        twoPointPanGesture,
        panGesture,
        tapGesture,
        rotationGesture,
      );

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        socket.disconnect();
      };
    }, []),
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchPadContainer>
        <TouchPadPreviousScreenButton onPress={() => navigate("PcList")}>
          <Ionicons name="arrow-back" size={32} color={colors.MAIN_COLOR} />
        </TouchPadPreviousScreenButton>
        <TouchPadSettingButton
          onPress={() => setIsSettingButtonPressed(!isSettingButtonPressed)}
        >
          <Ionicons name="settings" size={24} color={colors.MAIN_COLOR} />
          <Animated.View>
            <TouchPadSettingMenuBox
              style={
                isSettingButtonPressed
                  ? { display: "flex" }
                  : { display: "none", transform: [{ translateY: -80 }] }
              }
            >
              <TouchPadSettingMenuTextBox>
                <TouchPadSettingMenuText>제스처 편집</TouchPadSettingMenuText>
              </TouchPadSettingMenuTextBox>
              <TouchPadSettingMenuTextBox>
                <TouchPadSettingMenuText>
                  자주 사용하는 제스처
                </TouchPadSettingMenuText>
              </TouchPadSettingMenuTextBox>
              <TouchPadSettingMenuTextBox onPress={logoutAlert}>
                <TouchPadSettingMenuText>로그아웃</TouchPadSettingMenuText>
              </TouchPadSettingMenuTextBox>
            </TouchPadSettingMenuBox>
          </Animated.View>
        </TouchPadSettingButton>
        <TouchPadSwitchBox>
          <TouchPadSwitchText>Drawing Mode</TouchPadSwitchText>
          <TouchPadSwitch
            trackColor={{ false: "#767577", true: `${colors.MAIN_COLOR}` }}
            thumbColor={isDrawingMode ? "#767577" : `${colors.MAIN_COLOR}`}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setIsDrawingMode((previousState) => !previousState)
            }
            value={isDrawingMode}
          />
        </TouchPadSwitchBox>
        <GestureDetector gesture={composedGesture}>
          <TrackPadTouchArea></TrackPadTouchArea>
        </GestureDetector>
      </TouchPadContainer>
    </GestureHandlerRootView>
  );
};

const TouchPadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.BACKGROUND_COLOR};
`;

const TouchPadPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const TouchPadSettingButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  top: 55px;
  right: 20px;
`;

const TouchPadSettingMenuBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
  background-color: white;
  border: 1px solid #888888;
  border-radius: 10px;
`;

const TouchPadSettingMenuTextBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 180px;
  background-color: transparent;
`;

const TouchPadSettingMenuText = styled.Text`
  padding: 10px 15px;
  font-size: 18px;
`;

const TouchPadSwitchBox = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 45px;
`;

const TouchPadSwitchText = styled.Text`
  font-size: 15px;
`;

const TouchPadSwitch = styled.Switch`
  transform: translateY(-10px);
`;

const TrackPadTouchArea = styled.TouchableOpacity`
  margin-top: 15%;
  height: 80%;
  width: 90%;
  background-color: transparent;
  border: 3px solid ${colors.MAIN_COLOR};
  border-radius: 20px;
  opacity: 0.2;
  z-index: -1;
`;

export default TouchPadScreen;
