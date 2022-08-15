import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Stack from './navigation/Stack';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { DBContext } from './context';

const OrderSchema = {
  name : "Order",
  properties: {
    _id: "int",
    plan : "string",
    date: "int[]",
    flower: "string",
    status : "string"
  },
  primaryKey : "_id"

};

  


export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState();
  const onFinish = () => setReady(true);
  const startLoading = async() => {
    const connection = await Realm.open({
      schema: [OrderSchema],
    });
    setRealm(connection);
  }
  if (!ready) {
    return (<AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error}/>)
  }
  return (
    <DBContext.Provider value={realm}>
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
    </DBContext.Provider>
  );
}
