// app/main/Header.js
import React from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router'

export default function Header() {
  const router = useRouter();

  const navigateToProfile = () => {
    router.push("/profile"); // Navigate to the Profile screen
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#bdbdbd"
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#bdbdbd"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: "center",
    width: undefined,
    backgroundColor: 'red',
  },
  searchBar: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
});
