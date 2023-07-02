import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/Home/HomePage";

const StackHome = createStackNavigator();

function HomeStackNavigator() {
  return (
    <StackHome.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
      <StackHome.Screen name="HomePage" component={HomePage} />
   </StackHome.Navigator>
  );
}

export default HomeStackNavigator;
