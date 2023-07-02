import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddStock from "../pages/stock/StockAdd";
import UpdateStock from "../pages/stock/StockUpdate";
import StockDetails from "../pages/stock/StockDetail";
import StockList from "../pages/stock/StockList";

const StackStock = createStackNavigator();

function StockStackNavigator() {
  return (
    <StackStock.Navigator initialRouteName="StockList" screenOptions={{ headerShown: false }}>
      <StackStock.Screen name="StockList" component={StockList} />
      <StackStock.Screen name="StockDetails" component={StockDetails} />
      <StackStock.Screen name="UpdateStock" component={UpdateStock}/>
      <StackStock.Screen name="AddStock" component={AddStock}/>
    </StackStock.Navigator>
  );
}

export default StockStackNavigator;