import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  COLOR_BG,
  COLOR_GREY,
  COLOR_LGREY,
  COLOR_MGREY,
  COLOR_LIGHT,
  COLOR_ORANGE,
} from "../colors";
import { ScreenHEIGHT, ScreenWidth } from "../resposiveScreen";
import { styles } from "../style/styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NativeStackView from "@react-navigation/native-stack";

export const Home = ({navigation}) => {
  console.log(navigation);
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
                source={require("../image/rose.png")}
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
              style={[styles.btn, styles.shadow]}
              onPress={() => navigation.navigate("order")}
              >
              <Text style={styles.title}>꽃다발{"\n"}주문하기</Text>
              <Text style={styles.subTitle}>꽃다발 예약</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/rosebouquet.png")}
                ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={() => navigation.navigate("stamp")}
              >
              <Text style={styles.title}>꽃다발{"\n"}스탬프</Text>
              <Text style={styles.subTitle}>주문 내역 확인</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/megaphone.png")}
                ></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={() => navigation.navigate("planManagement")}
              >
              <Text style={styles.title}>구독 플랜{"\n"}관리</Text>
              <Text style={styles.subTitle}>주문/결제 관리</Text>
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
