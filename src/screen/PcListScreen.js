import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SERVER_PORT } from "@env";
import { io } from "socket.io-client";

const PcListScreen = ({ navigation }) => {
  const [recentPC, setRecentPc] = useState(null);
  const [connectableIpList, setConnectableIpList] = useState([]);

  const allConnectableIPs = useRef([]);

  const logoutAlert = async () => {
    await AsyncStorage.clear();

    Alert.alert("Logout", "로그아웃이 완료되었습니다.", [
      {
        text: "확인",
        onPress: () => navigation.navigate("Main"),
      },
    ]);
  };

  const connectPc = async (pc) => {
    try {
      const params = { max: 1, by: "connected_at", order: "asc" };
      const idToken = await AsyncStorage.getItem("idToken");

      await axios.post(
        `${SERVER_PORT}/users/${JSON.parse(idToken).user.email}/pc`,
        { recentPc: { name: pc.ip, ipAddress: pc.ip } },
        { params },
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const params = { max: 1, by: "connected_at", order: "asc" };
        const idToken = await AsyncStorage.getItem("idToken");
        const recentPcData = await axios.get(
          `${SERVER_PORT}/users/${JSON.parse(idToken).user.email}/pc`,
          { params },
        );

        setRecentPc(() => recentPcData.data.recentPc);

        const connectableIpData = await axios.get(`${SERVER_PORT}/pcList/`);
        const localIp = connectableIpData.data.localIpAddress;

        await (() => {
          for (let i = 0; i < localIp.length; i++) {
            io(`http://${localIp[i].ip}:8080`).emit("verify-connectable");

            io(`http://${localIp[i].ip}:8080`).on("broadcast", (data) => {
              allConnectableIPs.current.push({ name: data, ip: data });
            });

            io(`http://${localIp[i].ip}:8080`).disconnect();
          }
        })();

        return () => {
          for (let i = 0; i < localIp.length; i++) {
            io(`http://${localIp[i].ip}:8080`).disconnect();
          }
        };
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <PcListContainer>
      <PcListPreviousScreenButton
        onPress={() => navigation.navigate("Network")}
      >
        <Ionicons name="arrow-back" size={32} color="#7e94ae" />
      </PcListPreviousScreenButton>
      <PcListLogoutScreenButton onPress={logoutAlert}>
        <PcListLogoutButtonText>Logout</PcListLogoutButtonText>
      </PcListLogoutScreenButton>
      <PcListRefreshButton
        onPress={() => {
          setConnectableIpList(() => allConnectableIPs.current);
        }}
      >
        <PcListRefreshButtonText>Refresh</PcListRefreshButtonText>
      </PcListRefreshButton>
      <PcListTitleBox>
        <PcListTitleText>Select PC</PcListTitleText>
      </PcListTitleBox>
      <PcListBox>
        <ScrollView>
          {connectableIpList?.map((value, index) => {
            return (
              <PcListPc
                key={index}
                onPress={() => {
                  connectPc(value);
                  navigation.navigate("TrackPad", { ipAddress: value?.ip });
                }}
              >
                <Ionicons name="desktop-sharp" size={30} color="#7e94ae" />
                <PcListPcName>{value?.ip}</PcListPcName>
              </PcListPc>
            );
          })}
        </ScrollView>
      </PcListBox>
      <PcListHorizonLine />
      <PcListTitleBox>
        <PcListTitleText>Recent PC</PcListTitleText>
      </PcListTitleBox>
      {recentPC?.name && (
        <PcListPc
          onPress={() => {
            navigation.navigate("TrackPad", { ipAddress: recentPC?.name });
          }}
        >
          <Ionicons name="desktop-sharp" size={30} color="#7e94ae" />
          <PcListPcName>{recentPC?.name}</PcListPcName>
          <PcListPcDate>
            {new Date(recentPC?.lastAccessDate).toLocaleString()}
          </PcListPcDate>
        </PcListPc>
      )}
    </PcListContainer>
  );
};

const PcListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f3eee6;
`;

const PcListTitleText = styled.Text`
  font-size: 50px;
`;

const PcListPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

const PcListTitleBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  color: #333333;
`;

const PcListBox = styled.View`
  justify-content: flex-start;
  align-items: center;
  height: 150px;
  width: 200px;
`;

const PcListPc = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  width: 160px;
`;

const PcListPcName = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: #333333;
`;

const PcListPcDate = styled.Text`
  position: absolute;
  transform: translateX(32px) translateY(20px);
  margin-left: 10px;
  font-size: 10px;
  color: #333333;
`;

const PcListHorizonLine = styled.View`
  margin-top: 50px;
  margin-bottom: 40px;
  width: 200px;
  border: 1.2px solid #999999;
  opacity: 0.5;
`;

const PcListRefreshButtonText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: #7e94ae;
`;

const PcListRefreshButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
`;

const PcListLogoutButtonText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: #7e94ae;
`;

const PcListLogoutScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 20px;
`;

export default PcListScreen;
