import React from "react";
import { View, Text } from "react-native";
import { ScreenHEIGHT } from "../resposiveScreen";
import { COLOR_LGREY } from "../colors";

const OrderPlanList = () => (
    // 
    <View style={{
        width: '100%',
        flexDirection: 'row'
    }}>
        <View style={{flex: 3, backgroundColor: 'red'}}><Text>flex 3</Text></View>
        <View style={{flex: 1, backgroundColor: 'blue'}}><Text>flex 1</Text></View>
    </View>
  );
  

  export default OrderPlanList;