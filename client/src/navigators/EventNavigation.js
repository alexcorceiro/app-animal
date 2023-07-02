import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventList from "../pages/Event/EventList";
import EventDetails from "../pages/Event/EventDetail";
import UpdateEvent from "../pages/Event/EventUpdate";
import AddEventScreen from "../pages/Event/EventAdd";


const StackEvent = createStackNavigator();

function EventStackNavigator() {
  return (
    <StackEvent.Navigator initialRouteName="EventList" screenOptions={{ headerShown: false }}>
      <StackEvent.Screen name="EventList" component={EventList} />
      <StackEvent.Screen name="DetailEvent" component={EventDetails} />
      <StackEvent.Screen name="UpdateEvent" component={UpdateEvent}/>
      <StackEvent.Screen name="AddEvent" component={AddEventScreen}/>
    </StackEvent.Navigator>
  );
}

export default EventStackNavigator;