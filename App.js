import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Stack from "./navigation/Stack";
import { NavigationContainer } from "@react-navigation/native";
import Realm from "realm";
import AppLoading from "expo-app-loading";
import { DBContext } from "./context";

const OrderSchema = {
  name: "order",
  properties: {
    _id: "int",
    plan: "string",
    date: "int",
    flower: "string",
  },
  primaryKey: "_id",
};

const PlanSchema = {
  name: "Planning",
  properties: {
    _id: "int",
    plan: "string",
  },
  primaryKey: "_id",
};


export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);
  const startLoading = async () => {
    const connection = await Realm.open({
      schema: [PlanSchema],
    })
    setRealm(connection);
  };
  const onFinish = () => setReady(true);
  if (!ready) {
    return (
      <AppLoading
        onError={console.error}
        startAsync={startLoading}
        onFinish={onFinish}
      />
    );
  }
  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
