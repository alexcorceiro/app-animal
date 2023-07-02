import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UpdateAnimalScreen from "../pages/Animal/AnimalUpdate";
import AnimalDetailScreen from "../pages/Animal/AnimalDetail";
import AnimalListScreen from "../pages/Animal/AnimalList";
import AddAnimalScreen from "../pages/Animal/AnimalAdd";

const Stackanimal = createStackNavigator();

function AnimalStackNavigator() {
  return (
    <Stackanimal.Navigator initialRouteName="AnimalList" screenOptions={{ headerShown: false }}>
      <Stackanimal.Screen name="AnimalList" component={AnimalListScreen} />
      <Stackanimal.Screen name="AnimalDetail" component={AnimalDetailScreen} />
      <Stackanimal.Screen name="UpdateAnimal" component={UpdateAnimalScreen}/>
      <Stackanimal.Screen name="AddAnimal" component={AddAnimalScreen}/>
    </Stackanimal.Navigator>
  );
}

export default AnimalStackNavigator;