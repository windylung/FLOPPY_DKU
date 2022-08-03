import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PixelRatio
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLOR_BG, COLOR_GREY, COLOR_ORANGE } from "../colors";
import { ScreenWidth, ScreenHEIGHT } from "../resposiveScreen";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

// const WINDOW_WIDTH = Dimensions.get("window").width;
// const WINDOW_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  title: {
    // fontFamily: 
    fontSize: 18,
    fontWeight: "500",
    color: 'black',
  },
  subTitle: {
    
    fontSize: 14,
    fontWeight: "500",
    color: COLOR_GREY,
  },
});

const ScreenMain = ({ navigation: { navigate } }) => {
  // let now = new Date();
  // let month = (now.getMonth() + 1).toLocaleString;
  // let monthString = now.toLocaleString("en-US", { month: "long" });
  // let date = now.getDate();
  console.log(PixelRatio.get())
  return (
    <View>
    
      <View style={{backgroundColor: COLOR_ORANGE, height: 101 ,justifyContent: 'flex-end', alignItems: 'flex-start'}}>
        <Image source={require("../logo_orange.png")} style= {{height: ScreenHEIGHT(36), width:ScreenWidth(137)}}></Image>
      </View>

      <View style={{backgroundColor: COLOR_BG}}>
      <View style={{backgroundColor: 'white', height: ScreenHEIGHT(162), width: ScreenWidth(350), marginHorizontal: ScreenWidth(20), marginVertical: ScreenHEIGHT(29)}}/>
      <View>
        <TouchableOpacity>
          <Text style={styles.title}>꽃다발 주문하기</Text>
          <Text style={styles.subTitle}>꽃다발 예약</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{width: ScreenWidth(165),height: ScreenHEIGHT(165), backgroundColor: COLOR_ORANGE}}>
          <Text style={styles.title}>꽃다발 스탬프</Text>
          <Text style={styles.subTitle}>주문 내역 확인</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.title}>플랜 구독/관리</Text>
          <Text style={styles.subTitle}>꽃다발 주문 플랜 구독</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.title}>FLOPPY 이야기</Text>
          <Text style={styles.subTitle}>FLOPPY의 소식</Text>
        </TouchableOpacity>
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
