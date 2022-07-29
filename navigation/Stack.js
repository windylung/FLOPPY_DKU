import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLOR_ORANGE } from "../colors";
// import Main from "../screens/main";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'



const stamp = StyleSheet.create({
  container : {
    flex: 1,
    margin: 10,
    paddingTop: 250,
    backgroundColor: COLOR_ORANGE,
    textAlign: "center",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }

}

)
const ScreenMain = ({ navigation : {navigate} }) => {
  let now = new Date();
  let month = (now.getMonth() + 1).toLocaleString;
  let monthString = now.toLocaleString("en-US", { month: "long" });
  let date = now.getDate();
  

  return (
    <View>
      <View style={{height: '10%', backgroundColor: COLOR_ORANGE}}>
        <Image source={require("../screens/logo.png")} style={{width:'40%', height:'100%', marginTop: 10,overflow: 'hidden'}}></Image>
      </View>
      <View style={{ height: '100%', margin: 10}}>
              <View>
                  <Text style={{fontSize : 20, fontWeight: "600"}}>{monthString}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Text>{date}</Text>
                    <Text>{date + 1}</Text>
                    <Text>{date + 2}</Text>
                    <Text>{date + 3}</Text>
                    <Text>{date + 4}</Text>
                    <Text>{date + 5}</Text>
                    <Text>{date + 6}</Text>
                  </View>
              </View>
  
              <View>
                  <Text style = {{fontSize : 20}}>제작 현황</Text>
                  <View style={{width:'auto' ,height: 150, backgroundColor : COLOR_ORANGE, borderRadius: 10, opacity: 0.15}}>
                  </View>
              </View>
  
              <View style={{flexDirection: "row", height: 56, marginVertical: 10, justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={() => navigate("stamp")} style={{width:158 ,height: 56, backgroundColor : COLOR_ORANGE, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center'}}>꽃다발 스탬프</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate("planManagement")} style={{width:158 ,height: 56, backgroundColor : COLOR_ORANGE, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>플랜 구독/관리</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text>주문한 꽃다발</Text>
                <View style={{width:'auto', height: 150, backgroundColor : COLOR_ORANGE, borderRadius: 10, opacity: 0.15}}>
                  <Text>5월 12일(2회차)튤립</Text>
                </View>
              </View>
              
          </View>
      {/* <TouchableOpacity onPress={() => navigate("stamp")}>
        <Text>꽃다발 스탬프</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("planManagement")}>
        <Text>플랜구독</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("order")}>
        <Text>주문한 꽃다발</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("news")}>
        <Text>FLOPPY 소식</Text>
      </TouchableOpacity>
     */}
    </View>
  );
}




  const ScreenStamp = () => 
  (
    <View>
      <View style={stamp.container}></View>
      <Text style={stamp.title}>stamp history</Text>
    </View>
  );

  const ScreenPlanManagement =  ({ navigation : {navigate} }) => 
  (
    <TouchableOpacity onPress={() => navigate("Tabs", {screen : ""})}>
      <Text>구독중인 플랜</Text>
    </TouchableOpacity>
  );

  const ScreenOrder = () => 
  (
    <View>
      <Text></Text>
    </View>
  );

  const ScreenNews = () => 
  (
    <View>
      <Text>FLOPPY 이야기</Text>
      <Image source= {require('../screens/logo.png')} style={{height:10,width:300, resizeMode:'contain'}}></Image>
    </View>
  );

  const ScreenPlanList = () => 
  (
    <View>
      <Text>연인플랜</Text>
      <Text>가족플랜</Text>
    </View>
  );


export const NativeStack = createNativeStackNavigator();

const Stack = () => (
    <NativeStack.Navigator screenOptions={{headerShown: false}}>
        <NativeStack.Screen name = "main" component = {ScreenMain}/>
        <NativeStack.Screen name = "stamp" component= {ScreenStamp} />
        <NativeStack.Screen name = "planManagement" component={ScreenPlanManagement}/>
        <NativeStack.Screen name = "order" component={ScreenOrder}/>
        <NativeStack.Screen name = "news" component={ScreenNews}/>
        <NativeStack.Screen name = "planList" component={ScreenPlanList}/>
    </NativeStack.Navigator>
);

export default Stack;