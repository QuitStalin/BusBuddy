import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";

const customMapStyle = [
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "saturation": 36
          },
          {
              "color": "#dedede"
          },
          {
              "lightness": 40
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "weight": "10.00"
          },
          {
              "invert_lightness": true
          },
          {
              "gamma": "7.24"
          },
          {
              "lightness": "60"
          },
          {
              "saturation": "66"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "invert_lightness": true
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.medical",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#d2cece"
          },
          {
              "invert_lightness": true
          },
          {
              "weight": "10.00"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#ff0000"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "gamma": "10.00"
          },
          {
              "invert_lightness": true
          },
          {
              "weight": "10.00"
          },
          {
              "color": "#ffffff"
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "weight": "5.10"
          },
          {
              "gamma": "0.00"
          },
          {
              "hue": "#ff0000"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#393939"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 29
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#1c1c1c"
          },
          {
              "lightness": 18
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#343434"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 19
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          }
      ]
  }
];

const screenHeight = Dimensions.get("window").height;
const twentyPercentOfScreenHeight = screenHeight * 0.2;

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbx8FgR3pFJAP3KHjlgx9Zy2_SfkFMvtPAbgL-RfYpeglRrPOr3jrFIAIWJfqouGsl/exec";

const Card = ({ title, location, destination, setStartCoordinates, setEndCoordinates }) => {
  const handlePress = async () => {
    try {
      const response = await axios.get(APPS_SCRIPT_URL, {
        params: {
          type: 'getCoordinates',
          startStation: location,
          endStation: destination,
        },
      });

      const { startCoordinates, endCoordinates } = response.data;

      setStartCoordinates(startCoordinates);
      setEndCoordinates(endCoordinates);
    } catch (error) {
      console.error('Error fetching data from Apps Script:', error);
      alert('Failed to fetch data. Please try again.');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{title}</Text>
        <Text style={styles.cardInfo}>Location: {location}</Text>
        <Text style={styles.cardInfo}>Destination: {destination}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function MainScreen() {
  const initialLocation = {
    latitude: 44.53746,
    longitude: 18.67347,
  };
  const [myLocation, setMyLocation] = useState(initialLocation);
  const [region, setRegion] = useState(null);
  const mapRef = useRef();

  const [cardsData, setCardsData] = useState([
    { title: "Bus 1", location: "Siporeks", destination: "Solana" },
    { title: "Bus 2", location: "Sicki_Brod", destination: "Siporeks" },
    { title: "Bus 3", location: "Solana", destination: "Irac" },
    { title: "Bus 4", location: "Irac", destination: "Lukavac" },
    { title: "Bus 5", location: "Lukavac", destination: "Mostar" },
    { title: "Bus 6", location: "Mostar", destination: "Tuzla" },
    { title: "Bus 7", location: "Tuzla", destination: "Zenica" },
    { title: "Bus 8", location: "Zenica", destination: "Sarajevo" },
    { title: "Bus 9", location: "Sarajevo", destination: "Banja Luka" },
    { title: "Bus 10", location: "Banja Luka", destination: "Trebinje" },
    { title: "Bus 11", location: "Trebinje", destination: "Neum" },
    { title: "Bus 12", location: "Neum", destination: "Dubrovnik" },
    { title: "Bus 13", location: "Dubrovnik", destination: "Split" },
    { title: "Bus 14", location: "Split", destination: "Zadar" },
    { title: "Bus 15", location: "Zadar", destination: "Rijeka" },
    { title: "Bus 16", location: "Rijeka", destination: "Pecs" },
    { title: "Bus 17", location: "Pecs", destination: "Budapest" },
    { title: "Bus 18", location: "Budapest", destination: "Vienna" },
    { title: "Bus 19", location: "Vienna", destination: "Prague" },
    { title: "Bus 20", location: "Prague", destination: "Berlin" },
  ]);
  

  const [filteredCards, setFilteredCards] = useState(cardsData);
  const [locationSearch, setLocationSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const [startCoordinates, setStartCoordinates] = useState(null);
  const [endCoordinates, setEndCoordinates] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    filterCards();
  }, [locationSearch, destinationSearch]);

  useEffect(() => {
    if (startCoordinates && endCoordinates) {
      fetchRoute();
      focusOnMarkers();
    }
  }, [startCoordinates, endCoordinates]);

  const filterCards = () => {
    const filtered = cardsData.filter(card =>
      card.location.toLowerCase().includes(locationSearch.toLowerCase()) &&
      card.destination.toLowerCase().includes(destinationSearch.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  const fetchRoute = async () => {
    try {
      const url = `http://router.project-osrm.org/route/v1/driving/${startCoordinates.longitude},${startCoordinates.latitude};${endCoordinates.longitude},${endCoordinates.latitude}?overview=full&geometries=geojson`;
      const response = await axios.get(url);
      const route = response.data.routes[0].geometry.coordinates;
      const coordinates = route.map(coord => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
      setRouteCoordinates(coordinates);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const focusOnMarkers = () => {
    if (startCoordinates && endCoordinates) {
      mapRef.current.fitToCoordinates([startCoordinates, endCoordinates], {
        edgePadding: { top: 50, right: 50, bottom: 420, left: 50 },
        animated: true,
      });
    }
  };

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
              setStartCoordinates={setStartCoordinates}
              setEndCoordinates={setEndCoordinates}
            />
          ))}
        </ScrollView>
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        customMapStyle={customMapStyle}
        provider="google"
      >
        {startCoordinates && (
          <Marker
            coordinate={{
              latitude: startCoordinates.latitude,
              longitude: startCoordinates.longitude,
            }}
            title="Start Location"
          />
        )}
        {endCoordinates && (
          <Marker
            coordinate={{
              latitude: endCoordinates.latitude,
              longitude: endCoordinates.longitude,
            }}
            title="End Location"
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#F4CE14" // Promenjena boja putanje
            strokeWidth={3}      // Debljina putanje
          />
        )}
      </MapView>
    </SafeAreaView>
  );
}

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
    zIndex: 1,
    maxHeight: '35%',
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
