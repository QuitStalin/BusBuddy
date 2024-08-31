import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./index";
import SubscriptionsScreen from "./subscriptions";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#F4CE14",
      },
      headerTintColor: "#000", // Header text color
      headerTitleStyle: {
        fontWeight: "bold",
      },
      tabBarStyle: {
        backgroundColor: "#F4CE14", // Tab bar background color
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "bold",
      },
      tabBarActiveTintColor: "#000", // Active tab text color
      tabBarInactiveTintColor: "#000", // Inactive tab text color
    }}>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false, // Hide the default header
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{
          title: "Subscriptions",
        }}
      />
    </Tab.Navigator>
  );
}