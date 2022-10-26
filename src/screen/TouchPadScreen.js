import React, { useRef, useState } from "react";
import { Alert, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SERVER_PORT, PACKAGE_SERVER_PORT } from "@env";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import COLORS from "../constants/COLORS";
import axios from "axios";

const TouchPadScreen = ({ navigation: { navigate }, route }) => {
  const [isSettingButtonPressed, setIsSettingButtonPressed] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const xPosition = useRef(0);
  const yPosition = useRef(0);
  const startXPosition = useRef(0);
  const startYPosition = useRef(0);
  const prevXPosition = useRef(0);
  const prevYPosition = useRef(0);
  const traceGesture = useRef([]);
  const idToken = useRef(null);
  const userCustom = useRef(null);
  const gestureFunctions = useRef([]);

  const socket = io(`http://${route.params.ipAddress}:${PACKAGE_SERVER_PORT}`);

  let rotateCount = 0;
  let prevAngle = -1;
  let cornerCount = 0;
  let traceArray = [];

  const toEditGestureScreen = async () => {
    if (idToken.current) {
      navigate("EditGesture", { ipAddress: route.params.ipAddress });
    } else {
      Alert.alert("Need Login", "로그인이 필요합니다.", [
        {
          text: "확인",
        },
      ]);
    }
  };

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
  const fourPointPanGesture = Gesture.Pan();
  const twoPointPanGesture = Gesture.Pan();
  const tapGesture = Gesture.Tap();
  const rotationGesture = Gesture.Rotation();

  const drawingGesture = Gesture.Pan();
  const pinchGesture = Gesture.Pinch();

  const customGesture = Gesture.Pan();

  fourPointPanGesture.minPointers(4);
  fourPointPanGesture.maxPointers(4);
  twoPointPanGesture.minPointers(2);
  twoPointPanGesture.maxPointers(2);

  drawingGesture.maxPointers(2);
  drawingGesture.minPointers(1);

  tapGesture.onTouchesUp((event) => {
    if (event.numberOfTouches === 0) {
      socket.emit("user-send", ["click"]);
    } else if (event.numberOfTouches === 1) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[2].function,
      ]);
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

  fourPointPanGesture.onEnd((event) => {
    if (event.translationX > 0) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[4].function,
      ]);
    } else {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[3].function,
      ]);
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

  twoPointPanGesture.onEnd((event) => {
    if (event.translationX < 0 && Math.abs(event.translationY) < 10) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[1].function,
      ]);
    } else if (event.translationX > 0 && Math.abs(event.translationY) < 10) {
      socket.emit("user-send", [
        gestureFunctions.current.data.gesture[0].function,
      ]);
    }
  });

  rotationGesture.onUpdate((event) => {
    rotateCount++;

    if (event.numberOfPointers === 3 && rotateCount > 4) {
      if (event.rotation < 0) {
        socket.emit("user-send", ["volumeUp", event.rotation]);
      } else {
        socket.emit("user-send", ["volumeDown", event.rotation]);
      }

      rotateCount = 0;
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
      const radian = Math.atan2(changeY, changeX);
      const degree = (radian * 180) / Math.PI;

      prevXPosition.current = event.absoluteX;
      prevYPosition.current = event.absoluteY;

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

  customGesture.onBegin(async () => {
    traceGesture.current = userCustom.current.data.customGesture.path;
  });

  customGesture.onUpdate((event) => {
    traceArray = [...traceGesture.current];

    for (let i = 0; i < traceArray.length; i++) {
      if (
        event.absoluteX + 45 > traceArray[i][0] &&
        event.absoluteX - 45 < traceArray[i][0] &&
        event.absoluteY + 51 > traceArray[i][1] &&
        event.absoluteY - 51 < traceArray[i][1]
      ) {
        traceArray.splice(1, i);
      }
    }
  });

  customGesture.onEnd(async () => {
    if (traceArray.length < 4) {
      socket.emit("user-send", [
        userCustom.current.data.customGesture.function,
      ]);
    }

    traceArray.length = 0;
  });

  pinchGesture.onUpdate((event) => {
    if (event.scale > 1) {
      socket.emit("drawing", ["scaleUp"]);
    } else {
      socket.emit("drawing", ["scaleDown"]);
    }
  });

  const composedDrawingGesture = Gesture.Race(pinchGesture, drawingGesture);

  const composedGeneralGesture = Gesture.Simultaneous(
    Gesture.Race(panGesture, tapGesture, rotationGesture),
    fourPointPanGesture,
    twoPointPanGesture,
    customGesture,
  );

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        idToken.current = await AsyncStorage.getItem("idToken");
        userCustom.current = await axios.get(
          `${SERVER_PORT}/users/${
            JSON.parse(idToken.current).user.email
          }/customGesture`,
        );

        gestureFunctions.current = await axios.get(
          `${SERVER_PORT}/users/${
            JSON.parse(idToken.current).user.email
          }/gestures`,
        );
      })();
      return () => {
        socket.off();
      };
    }, []),
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchPadContainer>
        <TouchPadPreviousScreenButton onPress={() => navigate("PcList")}>
          <Ionicons name="arrow-back" size={32} color={COLORS.MAIN_COLOR} />
        </TouchPadPreviousScreenButton>
        <TouchPadSettingButton
          onPress={() => setIsSettingButtonPressed(!isSettingButtonPressed)}
        >
          <Ionicons name="settings" size={24} color={COLORS.MAIN_COLOR} />
          <Animated.View>
            <TouchPadSettingMenuBox
              style={
                isSettingButtonPressed
                  ? { display: "flex" }
                  : { display: "none", transform: [{ translateY: -80 }] }
              }
            >
              <TouchPadSettingMenuTextBox onPress={toEditGestureScreen}>
                <TouchPadSettingMenuText>제스처 편집</TouchPadSettingMenuText>
              </TouchPadSettingMenuTextBox>
              <TouchPadSettingMenuTextBox
                onPress={() =>
                  navigate("PopularGesture", {
                    ipAddress: route.params.ipAddress,
                  })
                }
              >
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
          <TouchPadSwitchText>
            {isDrawingMode ? "Drawing Mode" : "General Mode"}
          </TouchPadSwitchText>
          <TouchPadSwitch
            trackColor={{ false: "#767577", true: `${COLORS.MAIN_COLOR}` }}
            thumbColor={isDrawingMode ? "#767577" : `${COLORS.MAIN_COLOR}`}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setIsDrawingMode((previousState) => !previousState)
            }
            value={isDrawingMode}
          />
        </TouchPadSwitchBox>
        <GestureDetector
          gesture={composedDrawingGesture}
          style={{ display: isDrawingMode ? "flex" : "none" }}
        >
          <TrackPadTouchArea
            style={{ display: isDrawingMode ? "flex" : "none" }}
          ></TrackPadTouchArea>
        </GestureDetector>
        <GestureDetector
          gesture={composedGeneralGesture}
          style={{ display: !isDrawingMode ? "flex" : "none" }}
        >
          <TrackPadTouchArea
            style={{ display: !isDrawingMode ? "flex" : "none" }}
          ></TrackPadTouchArea>
        </GestureDetector>
      </TouchPadContainer>
    </GestureHandlerRootView>
  );
};

const TouchPadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_COLOR};
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
  border: 3px solid ${COLORS.MAIN_COLOR};
  border-radius: 20px;
  opacity: 0.2;
  z-index: -1;
`;

export default TouchPadScreen;
