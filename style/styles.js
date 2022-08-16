import React from "react";
import { StyleSheet } from "react-native";
import { ScreenFONT, ScreenHEIGHT, ScreenWidth } from "../resposiveScreen";
import {
    COLOR_BG,
    COLOR_GREY,
    COLOR_LGREY,
    COLOR_MGREY,
    COLOR_LIGHT,
    COLOR_ORANGE,
  } from "../colors";
export const styles = StyleSheet.create({
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
  