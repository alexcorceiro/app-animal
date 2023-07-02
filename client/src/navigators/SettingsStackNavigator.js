import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsPage from "../pages/Profiles/UpdateProfile";
import ProfileScreen from "../pages/Profiles/ProfileScreen";

const StackSetting = createStackNavigator();

function SettingsStackNavigator() {
  return (
    <StackSetting.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <StackSetting.Screen name="UpdateProfile" component={SettingsPage} />
      <StackSetting.Screen name="Profile" component={ProfileScreen} />
    </StackSetting.Navigator>
  );
}

export default SettingsStackNavigator;
