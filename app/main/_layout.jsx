import React from "react";
import { Image } from "react-native"; // Make sure to import Image
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./index";
import SubscriptionsScreen from "./subscriptions";
import ProfileScreen from './profile'; // Ensure the correct component name

import MapIcon from '../assets/MapIcon.png';
import SubIcon from '../assets/SubIcon.png';
import ProfileIcon from '../assets/ProfileIcon.png';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#F4CE14",
        },
        headerTintColor: "#000", // Header text color
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#F4CE14", // Tab bar background color
          height: 45,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#000", // Active tab text color
        tabBarInactiveTintColor: "#000",
        tabBarIcon: ({ size, color }) => {
          let iconSource;

          switch (route.name) {
            case 'Main':
              iconSource = MapIcon;
              break;
            case 'Subscriptions':
              iconSource = SubIcon;
              break;
            case 'Profile':
              iconSource = ProfileIcon;
              break;
            default:
              iconSource = MapIcon;
          }

          return (
            <Image
              style={{ width: size, height: size, tintColor: color }} // tintColor will set the color of the icon
              source={iconSource}
            />
          );
        },
      })}
    >
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
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}
