import React from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
//import NotificationsPage from "../pages/Notifications/NotificationsPage";
import AnimalStackNavigator from "./AnimalNavigation";
import EventStackNavigator from "./EventNavigation";
import StockStackNavigator from "./StockNavigation";
import PairStackNavigator from "./PairNavigation";
import ForSaleStackNavigator from "./ForSaleNavigation";
import BirthStackNavigator from "./BirthNavigator";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ marginLeft: 5 }}>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate("MenuTab")}>
          <Text>Aceuil</Text>
        </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate("Animals")}>
          <Text>Mes Animaux</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate("pair")}>
          <Text>Mes couple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate("Evenement")}>
          <Text>Mes Evenements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate("stock")}>
          <Text>Mes Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate("Birth")}>
          <Text>Mes naissance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate("forsale")}>
          <Text>Mes animaux a vendre</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="MenuTab" screenOptions={{ headerShown: false }} drawerContent={(props) => CustomDrawerContent(props)}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="pair"  component={PairStackNavigator}/>
      <Drawer.Screen name="Animals" component={AnimalStackNavigator}/>
      <Drawer.Screen name="Evenement" component={EventStackNavigator}/>
      <Drawer.Screen name="stock" component={StockStackNavigator}/>
      <Drawer.Screen name="forsale" component={ForSaleStackNavigator}/>
      <Drawer.Screen name="Birth"  component={BirthStackNavigator}/>
      </Drawer.Navigator>
  );
}

export default DrawerNavigator;
