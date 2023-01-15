import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Homescreen from "../sections/Home";
import Chatscreen from "../sections/Chat";

//const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TAB_ICON = {
  Home: "home",
  Chat: "chatbox-ellipses",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarStyle: { backgroundColor: "#060606" },
  };
};

const Controller = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "#F56B1D",
        inactiveTintColor: "white",
      }}
      initialRouteName="Homepage"
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chatscreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Acctnav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Controller}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Acctnav;
