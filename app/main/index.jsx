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
  TouchableOpacity,
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

const screenHeight = Dimensions.get("window").height;
const twentyPercentOfScreenHeight = screenHeight * 0.2;

const Card = ({ title, location, destination, onPress }) => (
  <TouchableOpacity onPress={() => onPress(title)}>
    <View style={styles.card}>
      <Text style={styles.cardText}>{title}</Text>
      <Text style={styles.cardInfo}>Location: {location}</Text>
      <Text style={styles.cardInfo}>Destination: {destination}</Text>
    </View>
  </TouchableOpacity>
);


export default function MainScreen() {
  const initialLocation = {
    latitude: 44.53746,
    longitude: 18.67347,
  };
  const [myLocation, setmyLocation] = useState(initialLocation);
  const [region, setRegion] = useState(null);
  const mapRef = React.useRef();

  const [cardsData, setCardsData] = useState([
    { title: "Bus 1", location: "Mostar", destination: "Banjaluka" },
    { title: "Bus 2", location: "Mostar", destination: "Tuzla" },
    { title: "Bus 3", location: "Lukavac", destination: "Mostar" },
    // Add more card data as needed
  ]);

  const [filteredCards, setFilteredCards] = useState(cardsData);
  const [locationSearch, setLocationSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  useEffect(() => {
    filterCards();
  }, [locationSearch, destinationSearch]);

  const filterCards = () => {
    const filtered = cardsData.filter(card =>
      card.location.toLowerCase().includes(locationSearch.toLowerCase()) &&
      card.destination.toLowerCase().includes(destinationSearch.toLowerCase())
    );
    setFilteredCards(filtered);
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
  focusOnLocation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Location"
          placeholderTextColor="#bdbdbd"
          value={locationSearch}
          onChangeText={text => setLocationSearch(text)}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Destination"
          placeholderTextColor="#bdbdbd"
          value={destinationSearch}
          onChangeText={text => setDestinationSearch(text)}
        />
      </View>
      <View style={styles.cards}>
        <ScrollView style={styles.scrollView}>
          {filteredCards.map(card => (
            <Card
              key={card.title}
              title={card.title}
              location={card.location}
              destination={card.destination}
              onPress={title => console.log(title)}
            />
          ))}
        </ScrollView>
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        provider="google"
        customMapStyle={customMapStyle}
      >
      </MapView>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#000000'
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headerContainer: {
    height: twentyPercentOfScreenHeight,
    justifyContent: 'space-evenly',
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#F4CE14',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBar: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  cards: {
    position: 'absolute',
    marginBottom: 10,
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1, // Ensure cards appear above the map
    maxHeight: '40%',
  },
  scrollView: {
    height: '100%',
    width: '100%',
    padding: 10,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: '#F4CE14',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  cardText: {
    fontSize: 16,
  },
  cardInfo: {
    fontSize: 14,
  },
});
