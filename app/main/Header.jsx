// app/main/Header.js
import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
      <TouchableOpacity onPress={navigateToProfile}>
      <Image
        source={require("../assets/profile.jpg")} // Adjust the path as necessary
        style={styles.profileIcon}
      />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
