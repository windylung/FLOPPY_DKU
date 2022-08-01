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