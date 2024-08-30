// app/signup.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  RadioCanada_400Regular,
  RadioCanada_600SemiBold,
  RadioCanada_700Bold,
  RadioCanada_300Light,
} from "@expo-google-fonts/radio-canada";
import Animated from "react-native-reanimated";
import {
  FadeInUp,
  FadeInDown,
  FadeInLeft,
} from "react-native-reanimated";
import axios from 'axios';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function LoginScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    RadioCanadaRegular: RadioCanada_400Regular,
    RadioCanadaSemiBold: RadioCanada_600SemiBold,
    RadioCanadaBold: RadioCanada_700Bold,
    RadioCanadaLight: RadioCanada_300Light,
  });

  if (!fontsLoaded) {
    return null; // or return a loading spinner/component
  }

  const handleLogin = async () => {
    try {
      const url = 'https://script.google.com/macros/s/AKfycbxiDBNFMVonFWAVYzuAs9AirXRwHg0TvejT4Wl5OfQ5KkkAe045eZHo5sruIiunNh1g/exec';
      const response = await axios.get(url, {
        params: {
          type: 'login',  // Specify the request type as 'login'
          username: name, // Pass the username
          password: password // Pass the password
        }
      });
      
      // Check the response text
      if (response.data === 'Login Successful') {
        alert('Login Successful');
        router.push('/main'); // Redirect to the main directory
      } else {
        alert('Login Failed: ' + response.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting data: ' + error.message);
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
        <Animated.Text style={styles.titleText1}>Dobro Došli!</Animated.Text>
        <Animated.Text style={styles.titleText2}>Login:</Animated.Text>
      </View>

      <View style={styles.logoContainer}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require("./assets/BusBuddyLogo.png")}
          style={styles.logo}
        />
        <Animated.Text
          entering={FadeInUp.delay(400).duration(1000)}
          style={styles.regularText}
        >
          "Ride Smart, Ride Easy."
        </Animated.Text>
      </View>

      <View style={styles.form}>
        <Animated.View
          entering={FadeInLeft.delay(400).duration(1000)}
          style={styles.inputGroup}
        >
          <Text style={styles.label}>Ime</Text>
          <TextInput
            style={styles.input}
            placeholder="Upišite vaše ime"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInLeft.delay(600).duration(1000)}
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
        </Animated.View>
      </View>
      <View style={styles.buttonsContainer}>
        <AnimatedTouchable
          entering={FadeInDown.delay(300).duration(1000)}
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </AnimatedTouchable>
        <AnimatedTouchable
          entering={FadeInDown.delay(500).duration(1000)}
          style={[styles.button, styles.button2]}
          onPress={() => router.push("../")}
        >
          <Animated.Image
            source={require("./assets/Google.png")}
            style={{ width: 25, height: 25 }}
          />
        </AnimatedTouchable>
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
    fontFamily: "RadioCanadaRegular",
    fontSize: 15,
    color: "#F4CE14",
  },
  titleText2: {
    fontFamily: "RadioCanadaBold",
    fontSize: 50,
    color: "#F4CE14",
  },
  regularText: {
    fontFamily: "RadioCanadaSemiBold",
    fontSize: 16,
    marginTop: 5,
  },
  logoContainer: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: '80%',
    height: undefined,
    aspectRatio: 4.64,
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
    fontFamily: "RadioCanadaSemiBold",
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
    fontFamily: "RadioCanadaSemiBold",
    fontSize: 17,
    color: "#F4CE14",
  },
  button2: {
    backgroundColor: "white",
    borderColor: "transparent",
  },
});
