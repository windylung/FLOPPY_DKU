import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PixelRatio,
  Platform,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
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
import OrderPlanList from "../screens/PlanList";
import styled from "styled-components/native";
import CalendarPicker from "react-native-calendar-picker";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import moment from "moment";

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

const NextBtn = (props) => (
  <View
    style={{
      height: ScreenHEIGHT(50),
      borderColor: COLOR_ORANGE,
      borderRadius: 30,
      paddingHorizontal: 30,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 25,
      backgroundColor: COLOR_ORANGE,
    }}
  >
    <Text style={[styles.title, { color: "white" }]}>{props.text}</Text>
  </View>
);

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
                // {backgroundColor: onfocus ? COLOR_ORANGE : "white"}
              ]}
              onPress={() => navigate("order")}
              // onFocus={onfocus}
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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ paddingHorizontal: ScreenWidth(30) }}>
      <View
        style={{
          width: ScreenWidth(330),
          height: ScreenHEIGHT(125),
          justifyContent: "flex-end",
          alignItems: "baseline",
          marginBottom: ScreenHEIGHT(30),
        }}
      >
        <Text style={[styles.title, { fontSize: 22 }]}>구독 플랜 선택</Text>
        <Text style={[styles.subTitle, { fontSize: 16 }]}>
          주문을 진행할 플랜을 선택해주세요
        </Text>
      </View>
      <View style={{ height: "100%" }}>
        <View style={{ flex: 1.5 }}>
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
                borderWidth: 1.8,
                flexDirection: "row",
                paddingHorizontal: 30,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 25,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={[styles.title, { fontSize: 20, marginRight: 8 }]}>
                구독 추가하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigate("orderDate")}>
            <NextBtn text={"Next"} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: ScreenHEIGHT(44),
            }}
          >
            <View style={styless.modalView}>
              <OrderPlanList />
              <OrderPlanList />
              <OrderPlanList />

              <Pressable
                style={[
                  styless.button,
                  styless.buttonClose,
                  { backgroundColor: COLOR_ORANGE, width: ScreenWidth(80) },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styless.textStyle}>완료</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  return <View style={{ height: ScreenHEIGHT(100) }}></View>;
};
const ScreenPlanList = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Text>연인플랜</Text>
    </View>
  );
};

const ScreenOrderDate = ({ navigation: { navigate } }) => {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderData, setOrderData] =  useState({
    date : [],
    flower: 'tulip',
  })
  var orderDatas = new Array();

  const onDateChange = (date) => {
    const month = Object.entries(date)[1][1]["month"] + 1;
    const day = Object.entries(date)[1][1]["day"];
    setSelectedDate([month, day]);
    setOrderData(selectedDate);
    console.log(orderData);
  };
  
  const addOrderData = (newOrderData) => {
    setOrderData([newOrderData], '');
    orderDatas.concat(orderData);
  };

  const onRemove = (key) => {

    // console.log(key["order"]);
    // console.log("-------------")
    // console.log(orderData);
    setOrderData(orderData.filter((order) => {
      // console.log(order);
      // console.log("----");
      order !== key}));
    // console.log(orderData);
  }
  // var OrderList = new Array();

  // function Order(date, flower) {
  //   this.date = date;
  //   this.flower = flower;

  // };

  // function Order.protype.setValue(newDate, newFlower) {
  //   this.date = newDate;
  //   this.flower = newFlower;
  // };

  return (
    <View style={{ paddingHorizontal: ScreenWidth(30) }}>
      <View
        style={{
          width: ScreenWidth(330),
          height: ScreenHEIGHT(125),
          justifyContent: "flex-end",
          alignItems: "baseline",
          marginBottom: ScreenHEIGHT(30),
        }}
      >
        <Text style={[styles.title, { fontSize: 22 }]}>배송 날짜 선택</Text>
        <Text style={[styles.subTitle, { fontSize: 16 }]}>
          꽃다발을 선물할 일자를 선택해주세요
        </Text>
      </View>

      <View style={{ height: "100%" }}>
        <View style={{ flex: 1.5 }}>
          <CalendarPicker
            width={ScreenWidth(350)}
            selectedDayColor={COLOR_ORANGE}
            firstDay={1}
            onDateChange={onDateChange}
          />

          {selectedDate ? (
            <View style={{ marginTop: ScreenHEIGHT(20) }}>
                
                {orderDatas.map((order) => (
                  <View style={{
                    backgroundColor: COLOR_LGREY,
                    width: ScreenWidth(140),
                    height: ScreenHEIGHT(42),
                    borderColor: COLOR_ORANGE,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 15,
                    flexDirection: "row",
                  }}>
                    <Text
                      style={[styles.subTitle, { color: "black" }]}
                      key={order}
                    >
                      {order.date[0]}
                      {/* {order.date + "월 " + order[1] + "일"} */}
                    </Text>
                    <TouchableOpacity onPress={() => onRemove({order})}>
                      <Text>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigate("orderFlower")}>
            <NextBtn text={"Next"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const ScreenOrderFlower = ({ navigation: { navigate } }) => {
  return (
    <View style={{ paddingHorizontal: ScreenWidth(30) }}>
      <View
        style={{
          width: ScreenWidth(330),
          height: ScreenHEIGHT(125),
          justifyContent: "flex-end",
          alignItems: "baseline",
          marginBottom: ScreenHEIGHT(30),
        }}
      >
        <Text style={[styles.title, { fontSize: 22 }]}>꽃다발 선택</Text>
        <Text style={[styles.subTitle, { fontSize: 16 }]}>
          선물할 꽃다발을 일자마다 선택해주세요
        </Text>
      </View>

      {/* <TouchableOpacity onPress={() => navigate("orderCheck")}>
        <Text>Next</Text></TouchableOpacity> */}

      <View style={{ height: "100%" }}>
        <View style={{ flex: 1.5 }}>
          <Pressable onPress={() => navigate("orderFlowerList")}>
            <Text>select FLOWER</Text>
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <Pressable onPress={() => navigate("orderCheck")}>
            <NextBtn text={"Next"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styless = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenHEIGHT(44),
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: ScreenHEIGHT(800),
    width: ScreenWidth(390),
    paddingHorizontal: ScreenWidth(30),
    paddingTop: ScreenHEIGHT(26),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
const ScreenFlowerList = ({ navigation }) => {
  const [value, onChangeText] = useState("Useless Multiline Placeholder");
  return (
    <View>
      <TextInput></TextInput>
      <ScrollView>
        <Text>국화</Text>
        <Text>수국</Text>
        <Text>튤립</Text>
      </ScrollView>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>완료</Text>
      </Pressable>
    </View>
  );
};

const ScreenOrderCheck = ({ navigation: { navigate } }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const onPress = () => {
    navigate("main");
  };
  return (
    <View style={{ paddingHorizontal: ScreenWidth(30) }}>
      <View
        style={{
          width: ScreenWidth(330),
          height: ScreenHEIGHT(125),
          justifyContent: "flex-end",
          alignItems: "baseline",
          marginBottom: ScreenHEIGHT(30),
        }}
      >
        <Text style={[styles.title, { fontSize: 22 }]}>주문 완료</Text>
        <Text style={[styles.subTitle, { fontSize: 16 }]}>
          주문 내역을 확인해주세요
        </Text>
      </View>

      <View style={{ height: "100%" }}>
        <View style={{ flex: 1.5 }}>
          <Text>Hello</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Pressable onPress={() => setModalVisible(true)}>
            <NextBtn text={"Order"} />
          </Pressable>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: ScreenHEIGHT(272),
              backgroundColor: modalVisible ? "rgba(52, 52, 52, 0.7)" : "white",
            }}
          >
            <View
              style={{
                margin: 20,
                width: ScreenWidth(300),
                height: ScreenWidth(300),
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text style={styles.title}>
                주문 완료!{"\n"}예쁜 꽃다발을 만들어드릴게요
              </Text>
              <Image
                style={{
                  height: ScreenWidth(120),
                  width: ScreenWidth(120),
                  margin: ScreenHEIGHT(20),
                }}
                source={require("../image/rosebouquet.png")}
              ></Image>

              <TouchableOpacity
                style={[
                  styless.button,
                  styless.buttonClose,
                  { backgroundColor: COLOR_ORANGE },
                ]}
                onPress={onPress}
              >
                <Text style={styless.textStyle}>Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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

    {/* 꽃다발 구매 단계 화면 */}
    <NativeStack.Screen name="orderDate" component={ScreenOrderDate} />
    <NativeStack.Screen name="orderFlower" component={ScreenOrderFlower} />
    <NativeStack.Screen name="orderFlowerList" component={ScreenFlowerList} />
    <NativeStack.Screen name="orderCheck" component={ScreenOrderCheck} />
  </NativeStack.Navigator>
);

export default Stack;
