// app/main/index.js
import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const Card = ({ title }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{title}</Text>
  </View>
);

export default function MainScreen() {
  const initialLocation = {
    latitude: 44.53746,
    longitude: 18.67347,
  };
  const [myLocation, setmyLocation] = useState(initialLocation);
  const [pin, setPin] = useState({});
  const [region, setRegion] = useState(null);
  const mapRef = React.useRef();
  const local = {
    latitude: "44.53746",
    longitude: "18.67347",
  };

  useEffect(() => {
    setPin(local);
    _getLocation();
  }, []);

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setmyLocation(location.coords);
    } catch (err) {
      console.warn(err);
    }
  };

  const focusOnLocation = () => {
    if (myLocation.latitude && myLocation.longitude) {
      const region = {
        latitude: parseFloat(myLocation.latitude),
        longitude: parseFloat(myLocation.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      if (mapRef.current) {
        mapRef.current.animateToRegion(region, 1000);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        provider="google"
        customMapStyle={customMapStyle}
      >
        {pin.latitude && pin.longitude && (
          <Marker
            coordinate={{
              latitude: parseFloat(pin.latitude),
              longitude: parseFloat(pin.longitude),
            }}
            title="Local Pin"
          />
        )}
      </MapView>
      <ScrollView style={styles.scrollView}>
        <Card title="Bus 1" />
        <Card title="Bus 2" />
        <Card title="Bus 3" />
        <Card title="Bus 4" />
        <Card title="Bus 5" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headerContainer: {
    height: '20%',
    justifyContent: 'space-evenly',
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#F4CE14',
  },
  searchBar: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  scrollView: {
    height: '40%',
    backgroundColor: '#F4CE14',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});