import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { COLOR_ORANGE } from "../colors";


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 
const Main = () => (
        <View style={{ height: '100%' }}>
            <View style={{height: '10%', backgroundColor: COLOR_ORANGE}}>
                <Image source={require("./logo.png")} style={{width:'40%', height:'100%', marginTop: 10,overflow: 'hidden'}}></Image>
            </View>
        </View>
        
);

export default Main;
