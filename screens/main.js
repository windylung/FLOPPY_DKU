import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLOR_ORANGE } from "../colors";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 
const Main = () => (
        <View style={{ height: '100%', margin: 10 }}>
            <View style={{height: '10%', backgroundColor: COLOR_ORANGE}}>
                <Image source={require("./logo.png")} style={{width:'40%', height:'100%', marginTop: 10,overflow: 'hidden'}}></Image>
            </View>

            <View>
                <Text style={{fontSize : 20, fontWeight: "600"}}>MAY</Text>
                <Text style={{fontSize : 20, textAlign: 'center'}}>4   5   6   7   8   9   10</Text>
            </View>

            <View>
                <Text style = {{fontSize : 20}}>제작 현황</Text>
                <View style={{width:'auto' ,height: 150, backgroundColor : COLOR_ORANGE, marginHorizontal: 10, borderRadius: 10, opacity: 0.15}}>
                </View>
            </View>

            <View style={{flexDirection: "row", height: 56, marginVertical: 10}}>
              <View style={{width:158 ,height: 56, backgroundColor : COLOR_ORANGE, marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>꽃다발 스탬프</Text>
              </View>
              <TouchableOpacity onPress={(event) => console.log(event)} style={{width:158 ,height: 56, backgroundColor : COLOR_ORANGE, marginHorizontal: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text>플랜 구독/관리</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>주문한 꽃다발</Text>
              <View style={{width:'auto', height: 150, backgroundColor : COLOR_ORANGE, marginHorizontal: 10, borderRadius: 10, opacity: 0.15}}>
                <Text>5월 12일(2회차)튤립</Text>
              </View>
            </View>
            
        </View>

        
        
);

export default Main;
