// app/main/Header.js
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();

  const navigateToProfile = () => {
    router.push("/profile"); // Navigate to the Profile screen
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by Location"
        placeholderTextColor="#dcdcdc" // Light placeholder text color
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search by Destination"
        placeholderTextColor="#dcdcdc" // Light placeholder text color
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: "center",
    width: '100%',
    backgroundColor: 'red',
  },
  searchBar: {
    width: '100%',
    backgroundColor: "#000000", // Dark background color for search bars
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
});
