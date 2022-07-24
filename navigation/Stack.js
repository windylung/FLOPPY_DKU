import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-NativeStack";



const ScreenOne = () => 
  (
    <View>
      <Text>One</Text>
    </View>
  );


const NativeStack = createNativeStackStackNavigator();

const Stack = () => (
    <NativeStack.Navigator>
        <NativeStack.Screen name = "main" components = {ScreenOne}/>
    </NativeStack.Navigator>
);

export default Stack;