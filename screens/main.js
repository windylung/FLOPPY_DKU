import React from "react";
import { Image, View} from 'react-native';
import { COLOR_ORANGE } from "../colors";
const TopBar = () => (
    // <View style = {{
    //     flex: 1,

    //     backgroundColor : COLOR_ORANGE, 
    // }}>
    // </View>

    <Image source={require("../screens/logo.png")} style={{width: '50%', height: '20%'}} ></Image>
    
);

const Main = () => (
    <TopBar/>
);

export default Main;