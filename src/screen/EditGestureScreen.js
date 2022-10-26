import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, Animated, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_PORT } from "@env";
import React, { useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import COLORS from "../constants/COLORS";

const EditGestureScreen = ({ navigation: { navigate }, route }) => {
  const [isSettingButtonPressed, setIsSettingButtonPressed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [startPosition, setStartPosition] = useState(-50);
  const [animatedPosition, setAnimatedPosition] = useState("x");
  const [animatedPointer, setAnimatedPointer] = useState(2);
  const [up, setUp] = useState(false);
  const [gestureData, setGestureData] = useState([]);

  const idToken = useRef(null);

  const AnimatedBox = Animated.createAnimatedComponent(Box);
  const X = new Animated.Value(startPosition);

  const moveAnimation = (gesture) => {
    setStartPosition(gesture.direction === "right" ? -50 : 50);
    setAnimatedPosition(gesture.position);
    setAnimatedPointer(gesture.pointer);

    Animated.timing(X, {
      toValue: gesture.direction === "right" ? 50 : -50,
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      setUp((prev) => !prev);
    });
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

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        idToken.current = await AsyncStorage.getItem("idToken");

        const customGesture = await axios.get(
          `${SERVER_PORT}/users/${
            JSON.parse(idToken.current).user.email
          }/customGesture`,
        );

        const userGestures = await axios.get(
          `${SERVER_PORT}/users/${
            JSON.parse(idToken.current).user.email
          }/gestures`,
        );

        setSelectedLanguage(customGesture.data.customGesture.function);
        setGestureData(userGestures.data.gesture);
      })();
    }, []),
  );

  return (
    <EditGestureContainer>
      <EditGesturePreviousScreenButton
        onPress={() =>
          navigate("TouchPad", { ipAddress: route.params.ipAddress })
        }
      >
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </EditGesturePreviousScreenButton>
      <EditGestureSettingButton
        onPress={() => setIsSettingButtonPressed(!isSettingButtonPressed)}
      >
        <Ionicons name="settings" size={24} color="#7e94ae" />
        <EditGestureSettingMenuBox
          style={
            isSettingButtonPressed
              ? { display: "flex" }
              : { display: "none", transform: [{ translateY: -80 }] }
          }
        >
          <EditGestureSettingMenuTextBox>
            <EditGestureSettingMenuText>
              제스처 초기화
            </EditGestureSettingMenuText>
          </EditGestureSettingMenuTextBox>
          <EditGestureSettingMenuTextBox
            onPress={() =>
              navigate("CreateGesture", { ipAddress: route.params.ipAddress })
            }
          >
            <EditGestureSettingMenuText>제스처 제작</EditGestureSettingMenuText>
          </EditGestureSettingMenuTextBox>
          <EditGestureSettingMenuTextBox
            onPress={() =>
              navigate("PopularGesture", { ipAddress: route.params.ipAddress })
            }
          >
            <EditGestureSettingMenuText>
              자주 사용하는 제스처
            </EditGestureSettingMenuText>
          </EditGestureSettingMenuTextBox>
          <EditGestureSettingMenuTextBox onPress={logoutAlert}>
            <EditGestureSettingMenuText>로그아웃</EditGestureSettingMenuText>
          </EditGestureSettingMenuTextBox>
        </EditGestureSettingMenuBox>
      </EditGestureSettingButton>
      <EditGestureAnimationBox
        style={
          animatedPosition === "x"
            ? { flexDirection: "column" }
            : { flexDirection: "row" }
        }
      >
        {Array.from({ length: animatedPointer }, () => 0).map(
          (value, index) => {
            return (
              <AnimatedBox
                key={index}
                style={
                  animatedPosition === "x"
                    ? { transform: [{ translateX: X }] }
                    : { transform: [{ translateY: X }] }
                }
              ></AnimatedBox>
            );
          },
        )}
      </EditGestureAnimationBox>
      <EditGestureTextBox>
        <EditGestureTitleBox>
          <EditGestureTitleText>제스처</EditGestureTitleText>
          <EditGestureTitleText>기능</EditGestureTitleText>
        </EditGestureTitleBox>
        <View style={{ height: 200 }}>
          <ScrollView>
            {gestureData?.map((value, index) => {
              return (
                <>
                  <EditGestureListBox key={index}>
                    <EditGestureActionBox
                      onPress={() => {
                        moveAnimation(value);
                      }}
                    >
                      <EditGestureListText>{value.action}</EditGestureListText>
                    </EditGestureActionBox>
                    <EditGestureFunctionBox>
                      <Picker
                        mode="dropdown"
                        style={{ width: 150 }}
                        selectedValue={value.function}
                        dropdownIconColor="#7e94ae"
                        onValueChange={(itemValue, itemIndex) => {
                          setGestureData(() => {
                            let copy = [...gestureData];

                            copy[index].function = itemValue;

                            axios.post(
                              `${SERVER_PORT}/users/${
                                JSON.parse(idToken.current).user.email
                              }/gestures`,
                              { updatedGesture: copy },
                            );

                            return copy;
                          });
                        }}
                      >
                        <Picker.Item label="없음" value="" />
                        <Picker.Item
                          label="브라우저 뒤로가기"
                          value="goBackInBrowser"
                        />
                        <Picker.Item
                          label="브라우저 앞으로가기"
                          value="goForwardInBrowser"
                        />
                        <Picker.Item
                          label="브라우저 탭 앞으로가기"
                          value="goForwardInTap"
                        />
                        <Picker.Item
                          label="브라우저 탭 뒤로가기"
                          value="goBackInTap"
                        />
                        <Picker.Item label="볼륨 업" value="volumeUp" />
                        <Picker.Item label="볼륨 다운" value="volumeDown" />
                        <Picker.Item label="음소거" value="mute" />
                        <Picker.Item label="재생" value="paly" />
                        <Picker.Item label="일시정지" value="pause" />
                      </Picker>
                    </EditGestureFunctionBox>
                    <Ionicons name="refresh" size={15} color="#999999" />
                  </EditGestureListBox>
                  <EditGestureHorizonLine />
                </>
              );
            })}
            <EditGestureListBox>
              <EditGestureActionBox>
                <EditGestureListText>Custom Gesture</EditGestureListText>
              </EditGestureActionBox>
              <EditGestureFunctionBox>
                <Picker
                  mode="dropdown"
                  style={{ width: 150 }}
                  dropdownIconColor="#7e94ae"
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) => {
                    axios.post(
                      `${SERVER_PORT}/users/${
                        JSON.parse(idToken.current).user.email
                      }/customGesture`,
                      { function: itemValue },
                    );

                    setSelectedLanguage(itemValue);
                  }}
                >
                  <Picker.Item label="없음" value="" />
                  <Picker.Item
                    label="브라우저 뒤로가기"
                    value="goBackInBrowser"
                  />
                  <Picker.Item
                    label="브라우저 앞으로가기"
                    value="goForwardInBrowser"
                  />
                  <Picker.Item
                    label="브라우저 탭 앞으로가기"
                    value="goForwardInTap"
                  />
                  <Picker.Item
                    label="브라우저 탭 뒤로가기"
                    value="goBackInTap"
                  />
                  <Picker.Item label="볼륨 업" value="volumeUp" />
                  <Picker.Item label="볼륨 다운" value="volumeDown" />
                  <Picker.Item label="음소거" value="mute" />
                  <Picker.Item label="재생" value="paly" />
                  <Picker.Item label="일시정지" value="pause" />
                </Picker>
              </EditGestureFunctionBox>
              <Ionicons name="refresh" size={15} color="#999999" />
            </EditGestureListBox>
          </ScrollView>
        </View>
      </EditGestureTextBox>
    </EditGestureContainer>
  );
};

const EditGestureContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const EditGesturePreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const EditGestureAnimationBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
  height: 280px;
  width: 280px;
  border: 2px solid #666666;
  border-radius: 10px;
  z-index: -1;
`;

const Box = styled.View`
  margin: 15px 15px;
  width: 30px;
  height: 30px;
  background-color: #7e94ae;
  border-radius: 20px;
`;

const EditGestureTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const EditGestureTitleBox = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 60px;
`;

const EditGestureListBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 5px;
`;

const EditGestureTitleText = styled.Text`
  margin: 30px 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #333333;
`;

const EditGestureActionBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 160px;
`;

const EditGestureFunctionBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 110px;
`;

const EditGestureListText = styled.Text`
  font-size: 15px;
  text-align: center;
  color: #333333;
`;

const EditGestureHorizonLine = styled.View`
  margin: 10px 0px;
  width: 300px;
  border: 1.2px solid #999999;
  opacity: 0.2;
`;

const EditGestureSettingButton = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  top: 55px;
  right: 20px;
`;

const EditGestureSettingMenuBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
  background-color: white;
  border: 1px solid #888888;
  border-radius: 10px;
`;

const EditGestureSettingMenuTextBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 180px;
  background-color: transparent;
`;

const EditGestureSettingMenuText = styled.Text`
  padding: 10px 15px;
  font-size: 18px;
`;

export default EditGestureScreen;
