import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./index";
import SubscriptionsScreen from "./subscriptions";
import Header from './Header.jsx'

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#F4CE14", // Header background color
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
          headerTitle: () => <Header />,
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
