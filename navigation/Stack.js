import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLOR_ORANGE } from "../colors";


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
const ScreenMain = ({ navigation : {navigate} }) => (
  <View>
    <TouchableOpacity onPress={() => navigate("stamp")}>
      <Text>꽃다발 스탬프</Text>
    </TouchableOpacity>
  </View>
);

  const ScreenTwo = () => 
  (
    <View>
      <View style={stamp.container}></View>
      <Text style={stamp.title}>stamp history</Text>
    </View>
  );


const NativeStack = createNativeStackNavigator();

const Stack = () => (
    <NativeStack.Navigator>
        <NativeStack.Screen name = "main" component = {ScreenMain}/>
        <NativeStack.Screen name = "stamp" component= {ScreenTwo} />
    </NativeStack.Navigator>
);

export default Stack;