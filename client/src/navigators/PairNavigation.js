import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddPair from "../pages/pair/PairAdd";
import UpdatePair from "../pages/pair/PairUpdate";
import PairDetail from "../pages/pair/PairDetail";
import PairList from "../pages/pair/PairList";


const StackPair = createStackNavigator();

function PairStackNavigator() {
  return (
    <StackPair.Navigator initialRouteName="PairList" screenOptions={{ headerShown: false }}>
      <StackPair.Screen name="PairList" component={PairList} />
      <StackPair.Screen name="PairDetail" component={PairDetail} />
      <StackPair.Screen name="UpdatePair" component={UpdatePair}/>
      <StackPair.Screen name="AddPair" component={AddPair}/>
    </StackPair.Navigator>
  );
}

export default PairStackNavigator;