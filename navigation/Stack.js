import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PixelRatio,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLOR_BG, COLOR_GREY, COLOR_ORANGE } from "../colors";
import { ScreenWidth, ScreenHEIGHT, ScreenFONT } from "../resposiveScreen";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

// const WINDOW_WIDTH = Dimensions.get("window").width;
// const WINDOW_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  title: {
    // fontFamily:
    fontSize: ScreenFONT(18),
    fontWeight: "600",
    color: "black",
    marginBottom: ScreenHEIGHT(6),
  },
  subTitle: {
    fontSize: ScreenFONT(14),
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
});

const ScreenMain = ({ navigation: { navigate } }) => {
  // let now = new Date();
  // let month = (now.getMonth() + 1).toLocaleString;
  // let monthString = now.toLocaleString("en-US", { month: "long" });
  // let date = now.getDate();
  console.log(PixelRatio.get());
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
          source={require("../logo_orange.png")}
          style={{ height: ScreenHEIGHT(36), width: ScreenWidth(137) }}
        ></Image>
      </View>

      <View style={{ backgroundColor: COLOR_BG }}>
        <View
          style={{
            backgroundColor: "white",
            height: ScreenHEIGHT(162),
            width: ScreenWidth(350),
            marginHorizontal: ScreenWidth(20),
            marginTop: ScreenHEIGHT(29),
            marginBottom: ScreenHEIGHT(32),
            // making px
            borderRadius: 15,
          }}
        />
        <View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: COLOR_ORANGE }]}
              onPress={() => navigate("order")}
            >
              {/* () => navigate("Tabs", { screen: "" }) */}
              <Text style={styles.title}>꽃다발{"\n"}주문하기</Text>
              <Text style={styles.subTitle}>꽃다발 예약</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.title}>꽃다발{"\n"}스탬프</Text>
              <Text style={styles.subTitle}>주문 내역 확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.title}>플랜{"\n"}구독/관리</Text>
              <Text style={styles.subTitle}>주문 플랜 구독</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.title}>FLOPPY{"\n"}이야기</Text>
              <Text style={styles.subTitle}>FLOPPY의 소식</Text>
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

const ScreenOrder = () => (
  <View>
    <Text></Text>
  </View>
);

const ScreenNews = () => (
  <View>
    <Text>FLOPPY 이야기</Text>
    <Image
      source={require("../screens/logo.png")}
      style={{ height: 10, width: 300, resizeMode: "contain" }}
    ></Image>
  </View>
);

const ScreenPlanList = () => (
  <View>
    <Text>연인플랜</Text>
    <Text>가족플랜</Text>
  </View>
);

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
