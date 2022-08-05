import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PixelRatio,
  Platform,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  COLOR_BG,
  COLOR_GREY,
  COLOR_LGREY,
  COLOR_LIGHT,
  COLOR_ORANGE,
} from "../colors";
import { ScreenWidth, ScreenHEIGHT, ScreenFONT } from "../resposiveScreen";
import Modal from "react-native-modal";
import styled from "styled-components/native";

import { format, formatDistance, formatRelative, subDays } from "date-fns";

// const WINDOW_WIDTH = Dimensions.get("window").width;
// const WINDOW_HEIGHT = Dimensions.get("window").height;

const OrderPlanView = (props) => (
  <View
    style={[
      {
        height: ScreenHEIGHT(75.6),
        borderColor: COLOR_ORANGE,
        borderRadius: 10,
        borderWidth: 1.9,
        flexDirection: "row",
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
      },
    ]}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={[styles.title, { fontSize: 20, marginRight: 8 }]}>
        {props.planName}
      </Text>
      <Text style={[styles.subTitle, { fontSize: 15 }]}>
        {props.num}회차 진행중
      </Text>
    </View>
    <TouchableOpacity style={{ width: 24, height: 14 }}>
      <Text>X</Text>
    </TouchableOpacity>
  </View>
);

const planListModal = styled.View`
  flex-direction: column;
  align-items: center;
  /* 모달창 크기 조절 */
  width: 320px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;
const styles = StyleSheet.create({
  statusView: {
    backgroundColor: "white",
    height: ScreenHEIGHT(162),
    width: ScreenWidth(350),
    marginHorizontal: ScreenWidth(20),
    marginTop: ScreenHEIGHT(29),
    marginBottom: ScreenHEIGHT(32),
    paddingTop: ScreenHEIGHT(26),
    paddingBottom: ScreenHEIGHT(16),
    paddingHorizontal: ScreenWidth(30),
    // making px
    borderRadius: 15,
  },
  circleBtn: {
    width: ScreenWidth(10),
    height: ScreenHEIGHT(10),
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 100,
    marginHorizontal: ScreenWidth(6),
  },
  title: {
    // fontFamily:
    fontSize: ScreenFONT(18),
    fontWeight: "600",
    color: "black",
    marginBottom: ScreenHEIGHT(6),
  },
  subTitle: {
    fontSize: ScreenFONT(13),
    fontWeight: "500",
    color: COLOR_GREY,
  },
  btn: {
    width: ScreenWidth(165),
    height: ScreenHEIGHT(165),
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: ScreenWidth(20),
    paddingVertical: ScreenHEIGHT(20),
  },

  btnView: {
    width: ScreenWidth(390),
    height: ScreenHEIGHT(165),
    paddingHorizontal: ScreenWidth(20),
    marginBottom: ScreenHEIGHT(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnImage: {
    width: 60,
    height: 60,
    alignSelf: "flex-end",
  },

  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: {
          height: 3,
          width: 0,
        },
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

const ScreenMain = ({ navigation: { navigate } }) => {
  // let now = new Date();
  // let month = (now.getMonth() + 1).toLocaleString;
  // let monthString = now.toLocaleString("en-US", { month: "long" });
  // let date = now.getDate();
  // console.log(PixelRatio.get());
  return (
    <View>
      <View
        style={{
          backgroundColor: COLOR_ORANGE,
          height: 101,
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Image
          source={require("../image/logo_orange.png")}
          style={{ height: ScreenHEIGHT(36), width: ScreenWidth(137) }}
        ></Image>
      </View>

      <View style={{ backgroundColor: COLOR_BG }}>
        <View style={[styles.statusView, styles.shadow]}>
          <View
            style={{
              height: ScreenHEIGHT(110),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View style={{ flex: 91 }}>
              <Image
                style={{ height: ScreenHEIGHT(91), width: ScreenWidth(91) }}
                source={require("../rose.png")}
              />
            </View>
            <View style={{ flex: 25 }}></View>
            <View style={{ flex: 175 }}>
              <Text style={[styles.title, { fontWeight: "700" }]}>
                꽃다발을{"\n"}제작하고 있어요
              </Text>
              <Text style={styles.subTitle}>8월 15일 이지수님께 전달예정</Text>
            </View>
          </View>
          <View
            style={{
              height: ScreenHEIGHT(9),
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={styles.circleBtn}></TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleBtn, { backgroundColor: COLOR_ORANGE }]}
            ></TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}></TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={[
                styles.btn,
                styles.shadow,
                { backgroundColor: COLOR_ORANGE },
              ]}
              onPress={() => navigate("order")}
            >
              {/* () => navigate("Tabs", { screen: "" }) */}
              <Text style={styles.title}>꽃다발{"\n"}주문하기</Text>
              <Text style={styles.subTitle}>꽃다발 예약</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/rosebouquet.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.shadow]}>
              <Text style={styles.title}>꽃다발{"\n"}스탬프</Text>
              <Text style={styles.subTitle}>주문 내역 확인</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/megaphone.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity style={[styles.btn, styles.shadow]}>
              <Text style={styles.title}>플랜{"\n"}구독/관리</Text>
              <Text style={styles.subTitle}>주문 플랜 구독</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/calendar.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.shadow]}>
              <Text style={styles.title}>FLOPPY{"\n"}이야기</Text>
              <Text style={styles.subTitle}>FLOPPY의 소식</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/megaphone.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const ScreenStamp = () => (
  <View>
    <View style={stamp.container}></View>
    <Text style={stamp.title}>stamp history</Text>
  </View>
);

const ScreenPlanManagement = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "" })}>
    <Text>구독중인 플랜</Text>
  </TouchableOpacity>
);

const ScreenOrder = ({ navigation: { navigate } }) => {
  return (
    <View style={{ paddingHorizontal: ScreenWidth(30) }}>
      <View
        style={{
          width: ScreenWidth(390),
          height: ScreenHEIGHT(125),
          justifyContent: "flex-end",
          alignItems: "flex-start",
          marginBottom: ScreenHEIGHT(30),
        }}
      >
        <Text style={[styles.title, { fontSize: 22 }]}>구독 플랜 선택</Text>
        <Text style={[styles.subTitle, { fontSize: 16 }]}>
          주문을 진행할 플랜을 선택해주세요
        </Text>
      </View>

      <View>
        <OrderPlanView planName={"연인플랜"} num={3} />
        <OrderPlanView planName={"가족플랜"} num={1} />
        <View
          style={[
            styles.shadow,
            {
              height: ScreenHEIGHT(75.6),
              backgroundColor: COLOR_LGREY,
              borderColor: COLOR_LGREY,
              borderRadius: 10,
              // borderWidth: 1.8,
              flexDirection: "row",
              paddingHorizontal: 30,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 25,
            },
          ]}
        >
          <TouchableOpacity onPress={() => navigate("planList")}>
            <Text style={[styles.title, { fontSize: 20, marginRight: 8 }]}>
              구독 추가하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ScreenNews = () => (
  <View>
    <Text>FLOPPY 이야기</Text>
    <Image
      source={require("../image/logo.png")}
      style={{ height: 10, width: 300, resizeMode: "contain" }}
    ></Image>
  </View>
);

const PlanListButton = () => {
  return (
    <View style={{height: ScreenHEIGHT(100), s}}>

    </View>
  );
}
const ScreenPlanList = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Modal
        style={{
          borderRadius: 10,
          backgroundColor: "white",
        }}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        animationIn={"slideInUp"}
        animationOut={"slideInDown"}
      >
        <View
          style={{
            paddingVertical: ScreenHEIGHT(20),
            paddingHorizontal: ScreenWidth(20),
          }}
        >
          <View>
            <Text style={[styles.title, { fontSize: 22, marginBottom: 8}]}>
              구독 플랜 추가하기
            </Text>
            <Text style={[styles.subTitle, { fontSize: 16 }]}>
              새롭게 구독할 플랜을 선택해주세요
            </Text>
          </View>
          <View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator screenOptions={{ headerShown: false }}>
    <NativeStack.Screen name="main" component={ScreenMain} />
    <NativeStack.Screen
      name="planManagement"
      component={ScreenPlanManagement}
    />
    <NativeStack.Screen name="order" component={ScreenOrder} />
    <NativeStack.Screen name="news" component={ScreenNews} />
    <NativeStack.Screen name="planList" component={ScreenPlanList} />
  </NativeStack.Navigator>
);

export default Stack;
