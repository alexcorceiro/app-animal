import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UpdateBirthScreen from "../pages/birth/BirthUpdate";
import BirthListScreen from "../pages/birth/BirthList";
import AddBirthScreen from "../pages/birth/BirthAdd";
import BirthDetails from "../pages/birth/BirthDetails";



const StackBirth = createStackNavigator();

function BirthStackNavigator() {
  return (
    <StackBirth.Navigator initialRouteName="BirthList" screenOptions={{ headerShown: false }}>
      <StackBirth.Screen name="BirthList" component={BirthListScreen} />
      <StackBirth.Screen name="BirthDetail" component={BirthDetails} />
      <StackBirth.Screen name="UpdateBirth" component={UpdateBirthScreen}/>
      <StackBirth.Screen name="AddBirth" component={AddBirthScreen}/> 
    </StackBirth.Navigator>
  );
}

export default BirthStackNavigator;