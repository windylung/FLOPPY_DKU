import React, { useContext, useEffect, useState } from "react";
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
  LayoutAnimation,
} from "react-native";
import uuid from "react-native-uuid";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  COLOR_BG,
  COLOR_GREY,
  COLOR_LGREY,
  COLOR_MGREY,
  COLOR_LIGHT,
  COLOR_ORANGE,
} from "../colors";
import { ScreenWidth, ScreenHEIGHT, ScreenFONT } from "../resposiveScreen";

import styled from "styled-components/native";
import CalendarPicker from "react-native-calendar-picker";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import moment from "moment";
import flowerLists from "../flowerList/flowerList";
import { useIsFocused } from "@react-navigation/native";
import planLists from "../planList/planList";
import { DBContext, useDB } from "../context";

// const WINDOW_WIDTH = Dimensions.get("window").width;
// const WINDOW_HEIGHT = Dimensions.get("window").height;


const ScreenOrder = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [modalVisible, setModalVisible] = useState(false);
  const [plannings, setPlannings] = useState(realm.objects("Planning"));
  const [orders, setOrders] = useState(realm.objects("Order"));
  const plans = planLists;
  const [selectPlan, setSelectPlan] = useState("플랜");
  const PlanListStyle = StyleSheet.create({
    title: {
      fontSize: ScreenFONT(15),
      fontWeight: "600",
      color: "white",
      marginBottom: ScreenHEIGHT(6),
    },
    subTitle: {
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
  });

  const OrderPlanList = (props) => {
    const realm = useDB();
    const planDB = (props) => {
      setModalVisible(!modalVisible);
      realm.write(() => {
        const plan = realm.create("Planning", {
          _id: Date.now(),
          plan: props.name,
        });
      });
    };

    return (
      <View
        style={{
          height: ScreenHEIGHT(120),
          width: "100%",
          borderColor: COLOR_LGREY,
          borderRadius: 20,
          marginBottom: 20,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1.8,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            borderWidth: 1.9,
            borderColor: COLOR_LGREY,
            paddingVertical: "10%",
            paddingLeft: "5%",
          }}
        >
          <Text style={[PlanListStyle.mainTitle]}>{props.name}</Text>
          <Text style={[PlanListStyle.subTitle, { color: "black" }]}>
            연 {props.times}회 꽃다발 선물
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => planDB(props)}
          style={{
            backgroundColor: COLOR_ORANGE,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={PlanListStyle.title}>{props.price}원</Text>

          <Text style={PlanListStyle.title}>구독하기</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const OrderPlanView = () => {
    return (
      <ScrollView>
        {plannings.map((planning) => {
          const planName = planning.plan;
          const planOrderNum = orders.filtered(`plan="${planName}"`).length;
          return (
            <TouchableOpacity
              onPress={() => setSelectPlan(planning.plan)}
              key={planning._id}
            >
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
                    backgroundColor: "white",
                  },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={[styles.title, { fontSize: 20, marginRight: 8 }]}
                  >
                    {planning.plan}
                  </Text>
                  <Text style={[styles.subTitle, { fontSize: 15 }]}>
                    {planOrderNum}회차 진행중
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View
      style={{ paddingHorizontal: ScreenWidth(30), backgroundColor: "white" }}
    >
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
          {/* 구독한 플랜 리스트 */}
          <OrderPlanView />
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
          <TouchableOpacity
            onPress={() => navigate("orderDate", { selectPlan })}
          >
            <NextBtn text={"Next"} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
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
              {plans.map((plan) => (
                <OrderPlanList
                  key={plan._id}
                  name={plan.name}
                  times={plan.times}
                  price={plan.price}
                />
              ))}

              <Pressable
                style={[
                  styless.button,
                  styless.buttonClose,
                  { backgroundColor: COLOR_ORANGE, width: ScreenWidth(80) },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={[
                    styles.subtitle,
                    { color: "white", textAlign: "center", fontWeight: "800" },
                  ]}
                >
                  완료
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

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
  const realm = useDB();
  const [orders, setorders] = useState(realm.objects("Order"));
  const [orderDate, setOrderDate] = useState("");
  const [nearOrderDate, setNearOrderDate] = useState("");
  useEffect(() => {
    setOrderDate(new Date(nearOrderDate["_id"]));
    if (orders.length > 0) {
      // 가장 빠른 주문
      setNearOrderDate(orders.sorted("_id")[0]);
    }
  }, []);

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
          style={{ height: ScreenHEIGHT(36), width: ScreenWidth(180) }}
        ></Image>
      </View>

      <View style={{ backgroundColor: COLOR_BG }}>
        <View
          style={[
            styles.statusView,
            styles.shadow,
            { backgroundColor: nearOrderDate !== "" ? "white" : COLOR_LGREY },
          ]}
        >
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
              <Text
                style={[
                  {
                    color: COLOR_ORANGE,
                    fontWeight: "900",
                    fontSize: 14,
                    marginBottom: 7,
                  },
                ]}
              >
                {nearOrderDate !== ""
                  ? nearOrderDate.plan
                  : "구독 중인 플랜이 없어요"}
              </Text>
              <Text style={[styles.title, { fontWeight: "700" }]}>
                {nearOrderDate.state === "order"
                  ? "꽃다발을\n제작하고 있어요 "
                  : "꽃다발 주문이\n필요해요"}
              </Text>
              <Text style={styles.subTitle}>
                {/* {nearOrderDate !== "" ? {nearOrderDate.month}  : ""} */}
                {nearOrderDate !== ""
                  ? nearOrderDate.month +
                    "월" +
                    nearOrderDate.day +
                    "일 전달 예정"
                  : ""}
              </Text>
            </View>
          </View>
          {/* <View
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
          </View> */}
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

            <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={() => navigate("stamp")}
            >
              <Text style={styles.title}>꽃다발{"\n"}스탬프</Text>
              <Text style={styles.subTitle}>주문 내역 확인</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/stampIcon.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={() => navigate("planManagement")}
            >
              <Text style={styles.title}>구독 플랜{"\n"}관리</Text>
              <Text style={styles.subTitle}>주문/결제 관리</Text>
              <Image
                style={styles.btnImage}
                source={require("../image/calendar.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={() => navigate("floppyStory")}
            >
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

const ScreenStamp = ({ navigation: { goBack } }) => {
  const realm = useDB();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orders = realm.objects("Order");
    orders.addListener((orders, changes) => {
      setOrders(orders.sorted(["month", "day"]));
    });
    return () => {
      orders.removeAllListeners();
    };
  }, []);

  const OrderPlanView = () =>
    orders.map((order) => (
      <TouchableOpacity>
        <View
          style={[
            {
              height: ScreenHEIGHT(75.6),
              borderColor: COLOR_GREY,
              borderRadius: 10,
              borderWidth: 1.2,
              flexDirection: "row",
              paddingHorizontal: 30,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: ScreenHEIGHT(15),
            },
          ]}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={[styles.title, { fontSize: 16, marginRight: 8 }]}>
                {/* {props.planName} */}
                {order.plan}
              </Text>
              <Text style={[styles.subTitle, { fontSize: 14 }]}>
                {/* {props.useTimes}회차 진행중 */}
                {order.useFlower}
              </Text>
            </View>
            <Text style={[styles.title, { fontSize: 15, marginRight: 8 }]}>
              {/* {props.planName} */}
              {order.month}월 {order.day}일 선물 예정
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ));

  return (
    <View
      style={{
        paddingHorizontal: ScreenWidth(30),
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <View>
        <View
          style={{
            marginTop: ScreenHEIGHT(60),
            marginBottom: ScreenHEIGHT(20),
            width: ScreenWidth(330),
            backgroundColor: COLOR_ORANGE,
            justifyContent: "flex-end",
            borderRadius: 10,
            padding: ScreenWidth(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                styles.title,
                { fontSize: 20, color: "white", fontWeight: "900" },
              ]}
            >
              꽃다발 스탬프
            </Text>
            <Text style={[styles.subTitle, { fontSize: 16 }]}>
              제작한 꽃다발 {orders.length}개
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {orders.map((order) => {
              return (
                <Image
                  style={{
                    width: ScreenWidth(60),
                    height: ScreenHEIGHT(70),
                    resizeMode: "contain",
                    marginHorizontal: ScreenWidth(5),
                    marginVertical: ScreenHEIGHT(10),
                  }}
                  source={require("../image/Stamp.png")}
                  key={order._id}
                ></Image>
              );
            })}
          </View>
        </View>
        <View>
          <ScrollView style={{ marginBottom: ScreenHEIGHT(100) }}>
            {/* <OrderPlanView />
             */}
            {orders.map((order) => (
              <TouchableOpacity key={order._id}>
                <View
                  style={[
                    {
                      height: ScreenHEIGHT(75.6),
                      borderColor: COLOR_GREY,
                      borderRadius: 10,
                      borderWidth: 1.2,
                      flexDirection: "row",
                      paddingHorizontal: 30,
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: ScreenHEIGHT(15),
                    },
                  ]}
                >
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "baseline" }}
                    >
                      <Text
                        style={[styles.title, { fontSize: 16, marginRight: 8 }]}
                      >
                        {/* {props.planName} */}
                        {order.plan}
                      </Text>
                      <Text style={[styles.subTitle, { fontSize: 14 }]}>
                        {/* {props.useTimes}회차 진행중 */}
                        {order.useFlower}
                      </Text>
                    </View>
                    <Text
                      style={[styles.title, { fontSize: 15, marginRight: 8 }]}
                    >
                      {/* {props.planName} */}
                      {order.month}월 {order.day}일 선물 예정
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={{ position: "absolute", left: 30, right: 30, bottom: 16 }}>
        <TouchableOpacity onPress={() => goBack()}>
          <NextBtn text={"Home"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ScreenPlanManagement = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [plannings, setPlannings] = useState(realm.objects("Planning"));
  const [orders, setorders] = useState(realm.objects("Order"));
  const PlanManageView = () => {
    return plannings.map((planning) => {
      const planName = planning.plan;
      const planOrderNum = orders.filtered(`plan="${planName}"`).length;
      // const planPayDate = orders.filtered(`plan="${planName}"`)
      const today = new Date(
        orders.filtered(`plan="${planName}"`).sorted("_id")[0]["_id"]
      );
      var planPayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      console.log(planName);

      return (
        <View
          key={planning._id}
          style={{
            width: ScreenWidth(330),
            height: ScreenHEIGHT(120),
            borderRadius: 10,
            borderColor: COLOR_MGREY,
            borderWidth: 0.9,
            marginBottom: ScreenHEIGHT(20),
          }}
        >
          <View style={{ height: "100%" }}>
            <View style={{ flex: 7, flexDirection: "row", width: "100%" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[{ fontSize: 20, fontWeight: "900" }]}>
                  {planning.plan}
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: ScreenFONT(13),
                    fontWeight: "600",
                    color: COLOR_GREY,
                  }}
                >
                  결제일 {planPayDate.getFullYear()}년{" "}
                  {planPayDate.getMonth() + 1}월 {planPayDate.getDate()}일{"\n"}
                  {planOrderNum}회차 진행 중
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 4,
                backgroundColor: COLOR_ORANGE,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopColor: "#d7d5d5",
                borderTopWidth: 1.2,
                width: "100%",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => navigate("main")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRightColor: "#d7d5d5",
                  borderRightWidth: 0.8,
                }}
              >
                <Text
                  style={[
                    styles.title,
                    { color: "white", fontSize: 16, fontWeight: "900" },
                  ]}
                >
                  결제 관리
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // navigate("orderFlower", { selectPlan })
                // onPress={() => navigate("planManagementDetail", {planName})}
                onPress={() => navigate("planManagementDetail", { planName })}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeftColor: "#d7d5d5",
                  borderLeftWidth: 0.8,
                }}
              >
                <Text
                  style={[
                    styles.title,
                    { color: "white", fontSize: 16, fontWeight: "900" },
                  ]}
                >
                  플랜 관리
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <View
      style={{ paddingHorizontal: ScreenWidth(30), backgroundColor: "white" }}
    >
      <View
        style={{
          width: ScreenWidth(330),
          height: ScreenHEIGHT(125),
          justifyContent: "flex-end",
          alignItems: "baseline",
          marginBottom: ScreenHEIGHT(30),
        }}
      >
        <Text style={[styles.title, { fontSize: 22 }]}>구독 플랜 관리</Text>
        <Text style={[styles.subTitle, { fontSize: 16 }]}>
          플랜별 주문 / 결제 현황을 관리합니다
        </Text>
      </View>

      <View style={{ height: "100%" }}>
        <View style={{ flex: 1.5 }}>
          <ScrollView>
            <PlanManageView />
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigate("main")}>
            <NextBtn text={"Home"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ScreenPlanMangagementDetail = ({ navigation, route }) => {
  const selectPlan = route.params.planName;
  const realm = useDB();
  const [orders, setOrders] = useState([]);
  const [planOrderNum, setPlanOrderNum] = useState(0);
  useEffect(() => {
    const orders = realm.objects("Order").filtered(`plan = "${selectPlan}"`);
    setPlanOrderNum(orders.filtered(`plan="${selectPlan}"`).length);
    orders.addListener((orders, changes) => {
      setOrders(orders.sorted(["month", "day"]));
    });
    return () => {
      orders.removeAllListeners();
    };
  }, []);

  const AddOrderBtn = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: ScreenWidth(330),
            height: ScreenHEIGHT(115),
            borderRadius: 10,
            backgroundColor: COLOR_MGREY,
            alignItems: "center",
            marginBottom: ScreenHEIGHT(15),
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("order")}>
            <Image
              source={require("../image/PlusIcon.png")}
              style={{ marginBottom: ScreenHEIGHT(10) }}
            ></Image>
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            다음 제작될 꽃다발을 주문해주세요
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        paddingHorizontal: ScreenWidth(30),
        height: "100%",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <View>
        {/* 플랜 이름 및 진행 상황 */}
        <View
          style={{
            width: ScreenWidth(330),
            height: ScreenHEIGHT(60),
            borderRadius: 10,
            backgroundColor: COLOR_ORANGE,
            marginTop: ScreenHEIGHT(60),
            marginBottom: ScreenHEIGHT(20),
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
            paddingHorizontal: ScreenWidth(24),
          }}
        >
          <Text
            style={[
              {
                fontSize: 20,
                fontWeight: "900",
                color: "white",
                marginRight: 8,
              },
            ]}
          >
            {selectPlan}
          </Text>
          <Text style={{ color: "white" }}>{planOrderNum}회차 진행 중</Text>
        </View>
        <ScrollView>
          {/* 상세 주문 내용 */}
          {orders.map((order) => {
            return (
              <View key={order._id} style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: ScreenWidth(330),
                    height: ScreenHEIGHT(115),
                    borderRadius: 10,
                    borderColor:
                      order.state === "order" ? COLOR_ORANGE : COLOR_MGREY,
                    borderWidth: 1.3,
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: ScreenHEIGHT(15),
                  }}
                >
                  <Image
                    source={
                      order.state === "order"
                        ? require("../image/rosebouquet.png")
                        : require("../image/rosebouquet_Black.png")
                    }
                    style={{
                      height: ScreenHEIGHT(83),
                      resizeMode: "contain",
                      flex: 2,
                    }}
                  ></Image>

                  <View style={{ flex: 3 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        marginBottom: 6,
                      }}
                    >
                      {order.month}월 {order.day}일 (3회차){"\n"}
                      {order.useFlower}
                    </Text>
                    <Text
                      style={{
                        // color: order.state === "order" ? COLOR_ORANGE : COLOR_MGREY,
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      {order.state === "order" ? "제작 중" : "선물 완료"}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}

          <AddOrderBtn />
        </ScrollView>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <NextBtn text={"Back"} />
        </TouchableOpacity>
      </View>

      {/* 꽃다발 주문 연동 버튼 */}
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

const ScreenOrderDate = ({ navigation: { navigate }, route }) => {
  const selectPlan = route.params.selectPlan;
  const realm = useDB();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orders = realm.objects("Order").filtered(`plan = "${selectPlan}"`);
    orders.addListener((orders, changes) => {
      setOrders(orders.sorted(["month", "day"]));
    });
    return () => {
      orders.removeAllListeners();
    };
  }, []);
  const addOrder = (date) => {
    const month = Object.entries(date)[1][1]["month"] + 1;
    const day = Object.entries(date)[1][1]["day"];
    realm.write(() => {
      const order = realm.create("Order", {
        _id: Date.now(),
        plan: selectPlan,
        month: month,
        day: day,
        flower: "",
        useFlower: "",
        state: "order",
      });
    });
  };

  const onRemove = (id) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey("Order", id);
      realm.delete(feeling);
    });
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
            onDateChange={addOrder}
          />

          {
            <ScrollView>
              <View
                style={{
                  marginTop: ScreenHEIGHT(20),
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {orders.map((order) => (
                  <View
                    key={order._id}
                    style={{
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
                      marginHorizontal: ScreenWidth(11),
                    }}
                  >
                    <Text
                      style={[styles.subTitle, { color: "black" }]}
                      key={order._id}
                    >
                      {order.month + "월 " + order.day + "일"}
                    </Text>
                    <TouchableOpacity onPress={() => onRemove(order._id)}>
                      <Text>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          }
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigate("orderFlower", { selectPlan })}
          >
            <NextBtn text={"Next"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const ScreenOrderFlower = ({ navigation: { navigate }, route }) => {
  const realm = useDB();
  const selectPlan = route.params.selectPlan;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orders = realm.objects("Order").filtered(`plan = "${selectPlan}"`);
    orders.addListener((orders, changes) => {
      setOrders(orders.sorted(["month", "day"]));
    });
    return () => {
      orders.removeAllListeners();
    };
  }, []);
  return (
    <View
      style={{ paddingHorizontal: ScreenWidth(30), backgroundColor: "white" }}
    >
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
          선물할 꽃다발을 선택해주세요
        </Text>
      </View>

      <View style={{ height: "100%" }}>
        <View style={{ flex: 1.5 }}>
          <ScrollView>
            {orders.map((order) => (
              <View
                key={order._id}
                style={[
                  {
                    height: ScreenHEIGHT(82),
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
                <View>
                  <Text style={[styles.title, { fontSize: 14 }]}>
                    {order.month}월 {order.day}일
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        styles.title,
                        {
                          fontSize: 17,
                          marginRight: ScreenWidth(5),
                          alignItems: "flex-end",
                        },
                      ]}
                    >
                      {order.flower === "" ? (
                        <Text>꽃다발을 선택해주세요</Text>
                      ) : (
                        order.flower
                      )}
                    </Text>
                    <Text style={[styles.subTitle, { alignSelf: "center" }]}>
                      {order.flower === "" ? "" : order.useFlower}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => navigate("orderFlowerList", { order })}
                >
                  {order.flower === "" ? (
                    <Image
                      style={{
                        height: ScreenHEIGHT(60),
                        width: ScreenWidth(60),
                      }}
                      source={require("../image/rosebouquet_Black.png")}
                    ></Image>
                  ) : (
                    <Image
                      style={{
                        height: ScreenHEIGHT(55),
                        width: ScreenWidth(55),
                      }}
                      source={require("../image/rosebouquet.png")}
                    ></Image>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 1 }}>
          <Pressable onPress={() => navigate("orderCheck", { selectPlan })}>
            <NextBtn text={"Next"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const ScreenFlowerList = ({ navigation: { goBack }, route }) => {
  const [flowerBouquet, setFLowerBouquet] = useState();

  const realm = useDB();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orders = realm.objects("Order");
    orders.addListener((orders, changes) => {
      setOrders(orders.sorted(["month", "day"]));
    });
    return () => {
      orders.removeAllListeners();
    };
  }, []);

  // const id = route.params._id;
  const order = route.params.order;

  const flowers = flowerLists;
  function selectedFlower(flower) {
    realm.write(() => {
      order.flower = flower[0];
    });
    realm.write(() => {
      order.useFlower = flower[1];
    });
    goBack();
  }

  return (
    <View
      style={{ paddingHorizontal: ScreenWidth(15), backgroundColor: COLOR_BG }}
    >
      <View style={{ marginTop: 70 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingBottom: ScreenHEIGHT(200),
            }}
          >
            {flowerLists.map((flower) => (
              <TouchableOpacity
                style={{
                  width: ScreenWidth(170),
                  height: ScreenHEIGHT(200),
                  borderRadius: 7,
                  marginHorizontal: ScreenWidth(5),
                  marginBottom: ScreenHEIGHT(15),
                  backgroundColor: "white",
                  padding: ScreenWidth(10),
                }}
                onPress={() => selectedFlower([flower.name, flower.useFlower])}
              >
                <Image
                  style={{
                    width: ScreenWidth(150),
                    height: ScreenHEIGHT(100),

                    marginBottom: 5,
                  }}
                  source={flower.image}
                ></Image>
                <View>
                  <Text
                    style={[styles.title, { justifyContent: "flex-start" }]}
                  >
                    {flower.name}
                  </Text>
                  <Text style={[styles.subTitle, { fontSize: 13 }]}>
                    {flower.mean}
                    {"\n"}
                    {flower.useFlower}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <Pressable onPress={() => goBack()}>
        <Text>완료</Text>
      </Pressable>
    </View>
  );
};

const ScreenOrderCheck = ({ navigation: { navigate }, route }) => {
  const realm = useDB();
  const selectPlan = route.params.selectPlan;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const orders = realm.objects("Order").filtered(`plan = "${selectPlan}"`);
    orders.addListener((orders, changes) => {
      setOrders(orders.sorted(["month", "day"]));
    });
    return () => {
      orders.removeAllListeners();
    };
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const onPress = () => {
    navigate("main");
  };
  return (
    <View
      style={{
        paddingHorizontal: ScreenWidth(30),
        height: "100%",
        backgroundColor: "white",
      }}
    >
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

      <View
        style={{
          backgroundColor: COLOR_LGREY,
          padding: ScreenWidth(20),
          borderRadius: 20,
        }}
      >
        <ScrollView>
          {orders.map((order) => (
            <View
            key={order._id}
              style={[
                {
                  height: ScreenHEIGHT(82),
                  borderColor: COLOR_ORANGE,
                  borderRadius: 10,
                  borderWidth: 1.9,
                  flexDirection: "row",
                  paddingHorizontal: 30,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  backgroundColor: "white",
                },
              ]}
            >
              <View>
                <Text style={[styles.title, { fontSize: 14 }]}>
                  {order.month}월 {order.day}일
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.title,
                      {
                        fontSize: 17,
                        marginRight: ScreenWidth(5),
                        alignSelf: "center",
                      },
                    ]}
                  >
                    {order.flower === "" ? (
                      <Text>꽃다발을 선택해주세요</Text>
                    ) : (
                      order.flower
                    )}
                  </Text>
                  <Text style={[styles.subTitle, { alignSelf: "center" }]}>
                    {order.flower === "" ? "" : order.useFlower}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ position: "absolute", left: 30, right: 30, bottom: 16 }}>
        <Pressable onPress={() => setModalVisible(true)}>
          <NextBtn text={"Order"} />
        </Pressable>
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

const ScreenFloppyStory = () => {
  return (
    <View
      style={{
        paddingHorizontal: ScreenWidth(30),
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: ScreenWidth(330),
          height: ScreenHEIGHT(125),
          justifyContent: "flex-end",
          alignItems: "baseline",
          marginBottom: ScreenHEIGHT(30),
        }}
      >
        <Text style={[styles.title, { fontSize: 22 }]}>FLOPPY 이야기</Text>
        <Text style={[styles.subTitle, { fontSize: 16 }]}>
          FLOPPY의 다양한 소식 / 이야기
        </Text>
      </View>
      <Text style={styles.title}>튤립의 꽃말</Text>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <ScrollView horizontal={true}>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/1.png")}
          ></Image>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/2.png")}
          ></Image>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/3.png")}
          ></Image>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/4.png")}
          ></Image>
        </ScrollView>
      </View>
      <Text style={styles.title}>하바리움의 모든 것</Text>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <ScrollView horizontal={true}>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/5.png")}
          ></Image>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/6.png")}
          ></Image>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/7.png")}
          ></Image>
          <Image
            style={{
              width: ScreenWidth(240),
              height: ScreenHEIGHT(300),
              resizeMode: "contain",
            }}
            source={require("../image_FLOPPYSTORY/8.png")}
          ></Image>
        </ScrollView>
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

export const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator screenOptions={{ headerShown: false }}>
    <NativeStack.Screen name="main" component={ScreenMain} />
    <NativeStack.Screen
      name="planManagement"
      component={ScreenPlanManagement}
    />
    <NativeStack.Screen name="order" component={ScreenOrder} />
    <NativeStack.Screen name="stamp" component={ScreenStamp} />
    <NativeStack.Screen name="news" component={ScreenNews} />
    <NativeStack.Screen name="planList" component={ScreenPlanList} />

    {/* 꽃다발 구매 단계 화면 */}
    <NativeStack.Screen name="orderDate" component={ScreenOrderDate} />
    <NativeStack.Screen name="orderFlower" component={ScreenOrderFlower} />
    <NativeStack.Screen name="orderFlowerList" component={ScreenFlowerList} />
    <NativeStack.Screen name="orderCheck" component={ScreenOrderCheck} />
    <NativeStack.Screen name="floppyStory" component={ScreenFloppyStory} />

    {/* 구독 플랜 관리 화면 */}
    <NativeStack.Screen
      name="planManagementDetail"
      component={ScreenPlanMangagementDetail}
    />
  </NativeStack.Navigator>
);

export default Stack;
