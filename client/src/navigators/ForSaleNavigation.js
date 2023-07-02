import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddAnimalForSale from "../pages/forSale/ForSaleAdd";
import UpdateAnimalForSale from "../pages/forSale/ForSaleUpdate";
import AnimalForSaleDetails from "../pages/forSale/ForSaleDetail";
import { AnimalForSaleList } from "../pages/forSale/ForSaleList";


const StackForSale = createStackNavigator();

function ForSaleStackNavigator() {
  return (
    <StackForSale.Navigator initialRouteName="ForSaleList" screenOptions={{ headerShown: false }}>
      <StackForSale.Screen name="ForSaleList" component={AnimalForSaleList} />
      <StackForSale.Screen name="AnimalForSaleDetails" component={AnimalForSaleDetails} />
      <StackForSale.Screen name="UpdateAnimalForSale" component={UpdateAnimalForSale}/>
      <StackForSale.Screen name="AddforAnimal" component={AddAnimalForSale}/>
    </StackForSale.Navigator>
  );
}

export default ForSaleStackNavigator;