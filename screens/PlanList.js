import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScreenHEIGHT, ScreenFONT } from "../resposiveScreen";
import { COLOR_LGREY, COLOR_ORANGE, COLOR_GREY } from "../colors";

const PlanListStyle = StyleSheet.create(
    {
        title : {fontSize: ScreenFONT(15),
          fontWeight: "600",
          color: "white",
          marginBottom: ScreenHEIGHT(6),},
        subTitle : {
            fontSize: ScreenFONT(13),
            fontWeight: "500",
            color: COLOR_GREY,
        },
        mainTitle: {
            // fontFamily:
            fontSize: ScreenFONT(18),
            fontWeight: "600",
            color: "black",
            marginBottom: ScreenHEIGHT(6),
          },
    }
)

const OrderPlanList = () => (
  //
  <View
    style={{
      height: ScreenHEIGHT(120),
      width: "100%",
      borderColor: COLOR_LGREY,
      borderRadius: 20,
      marginBottom: 20,
      flexDirection: "row",
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
    }}
  >
    <View
      style={{
        flex: 1.8,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1.9,
        borderColor: COLOR_LGREY,
        paddingVertical: '10%',
        paddingLeft: '5%'
        
      }}
    >
        <Text style={[PlanListStyle.mainTitle]}>연인플랜</Text>
        <Text style={[PlanListStyle.subTitle, {color: 'black'}]}>연 3회 꽃다발 선물</Text>
        
    </View>

    <TouchableOpacity
      style={{
        backgroundColor: COLOR_ORANGE,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
       style={PlanListStyle.title} 
        
      >
        60000원
      </Text>

      <Text
        style={PlanListStyle.title}
      >
        구독하기
      </Text>
    </TouchableOpacity>
  </View>
);

export default OrderPlanList;
