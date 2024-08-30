import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();


export default function App() {
  const router = useRouter();

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("./assets/welcomeImage.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.middleSection}>
        <Image
          source={require("./assets/BusMateLogo.png")}
          style={styles.logo}
        />

        <Text
          style={[styles.regularText, styles.text1]}
        >
          "Ride Smart, Ride Easy."
        </Text>

        <Text
          style={styles.regularText}
        >
          Uživajte u bezbrižnom putovanju, dok mi brinemo o svim detaljima!
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button2]}
          onPress={() => router.push("/signup")}
        >
          <Text style={[styles.buttonText, styles.yellowColor]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.illustrationSection}>
        <Image
          source={require("./assets/illustration1.png")}
          style={styles.illustration}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4CE14",
  },
  topSection: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  middleSection: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    height: "20%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  illustrationSection: {
    height: "20%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  logo: {
    width: "85%",
    height: undefined,
    aspectRatio: 5.65,
  },
  regularText: {
    fontSize: 16,
    color: "#3C3C3C",
    textAlign: "center",
    width: "75%",
  },
  text1: {
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    width: "85%",
    borderColor: "#272727",
    borderWidth: 2,
    borderRadius: 13,
    padding: 12,
    color: "black",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "#272727",
  },
  yellowColor: {
    color: "#F4CE14",
  },
  button2: {
    backgroundColor: "#272727",
    marginTop: 15,
  },
  illustration: {
    position: "absolute",
    bottom: -0.2,
    left: 0,
    height: "100%",
    width: undefined,
    aspectRatio: 1.76,
    resizeMode: "contain",
  },
});