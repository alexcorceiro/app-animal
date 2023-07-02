import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import LoginPage from "./src/pages/Auth/LoginPage";
import RegistrationPage from "./src/pages/Auth/RegistrationPage";
import StockList from "./src/pages/stock/StockList";
import AnimalListScreen from "./src/pages/Animal/AnimalList";
import PairList from "./src/pages/pair/PairList";
import BirthListScreen from "./src/pages/birth/BirthList";
import BirthDetailScreen from "./src/pages/birth/BirthDetails";
import EventDetails from "./src/pages/Event/EventDetail";
import HomePage from "./src/pages/Home/HomePage";


const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Login"  screenOptions={{ headerShown: false }}>
        <StackApp.Screen name="HomeApp" component={DrawerNavigator} />
        <StackApp.Screen name="Login" component={LoginPage} />
        <StackApp.Screen name="Register" component={RegistrationPage} />
        <StackApp.Screen name="StockList" component={StockList}/>
        <StackApp.Screen name="AnimalList" component={AnimalListScreen}/>
        <StackApp.Screen name="PairList" component={PairList}/>
        <StackApp.Screen name="BirthList" component={BirthListScreen}/>
        <StackApp.Screen name="DetailEvent" component={EventDetails}/>
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
