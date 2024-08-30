// app/signup.js
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (name === "admin" && password === "admin") {
      router.replace("/main");
    } else {
      alert("Incorrect name or password. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content" // for dark mode content on status bar
        backgroundColor="#F4CE14" // dark background color for status bar
        translucent={true} // to make status bar translucent
      />

      <View style={styles.title}>
        <Text style={styles.titleText1}>Dobro Došli!</Text>
        <Text style={styles.titleText2}>Login:</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require("./assets/BusMateLogo.png")}
          style={styles.logo}
        />
        <Text
          style={styles.regularText}
        >
          "Ride Smart, Ride Easy."
        </Text>
      </View>

      <View style={styles.form}>
        <View
          style={styles.inputGroup}
        >
          <Text style={styles.label}>Ime</Text>
          <TextInput
            style={styles.input}
            placeholder="Upišite vaše ime"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View
          style={styles.inputGroup}
        >
          <Text style={styles.label}>Lozinka</Text>
          <TextInput
            style={styles.input}
            placeholder=". . . . . . . . . . ."
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.button2]}
          onPress={() => router.push("../")}
        >
          <Image
            source={require("./assets/Google.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#F4CE14",
  },
  title: {
    height: "20%",
    paddingLeft: 20,
    justifyContent: "center",
    backgroundColor: "#272727",
  },
  titleText1: {
    fontSize: 15,
    color: "#F4CE14",
  },
  titleText2: {
    fontSize: 50,
    color: "#F4CE14",
  },
  regularText: {
    fontSize: 16,
    marginTop: 5,
  },
  logoContainer: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 39,
  },
  form: {
    height: "30%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputGroup: {
    width: "85%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#272727",
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#272727",
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  buttonsContainer: {
    height: "25%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: "85%",
    color: "#F4CE14",
    borderWidth: 2,
    borderRadius: 13,
    padding: 12,
    color: "black",
    alignItems: "center",
    backgroundColor: "#272727",
    borderColor: "transparent",
  },
  buttonText: {
    fontSize: 17,
    color: "#F4CE14",
  },
  button2: {
    backgroundColor: "white",
    borderColor: "transparent",
  },
});
