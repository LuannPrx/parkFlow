import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import SpotMarker from '../components/SpotMarker';
import * as Location from 'expo-location'
import Paho from 'paho-mqtt';

client = new Paho.Client(
  "test.mosquitto.org",
  Number(8080),
  'mqtt-async-test'
);

function MapScreen() {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showUserLocation, setShowUserLocation] = useState(true);
    const [spots, setSpots] = useState([])

    function onMessage(message) {
      if (message.destinationName === "notifications"){
        setSpots(JSON.parse(message.payloadString));
      }
    }

    const renderSpotMarkers = (spots) => {
      return spots.map((spot) => (
        <SpotMarker 
          key={spot.deviceName} 
          location={spot.location}
          name={spot.name} 
          status={spot.isOcuppied}
          deviceName={spot.deviceName}
          client={client}
          user={12345}
          requested={spot.requestedBy}
          //weather={spot.weather} 
        />
      ));
    };

    const showSpots = renderSpotMarkers(spots);
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permissão negada", "Para utilizar as funcionalidades do mapa, o aplicativo precisa utilizar a sua localização");
          setShowUserLocation(false)
          setLocation({latitude: -3.7329694, longitude: -38.5265801})
          setIsLoading(false)
          return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      })();
    }, []);
    
    useEffect(() => {
        client.connect( {
          onSuccess: () => {
            client.subscribe("notifications");
            client.onMessageArrived = onMessage;
            setIsLoading(false)
        },
        onFailure: () => {
          Alert.alert("Serviço indisponível", "não foi possível se conectar ao servidor");
          setIsLoading(false)
        }
      });
    }, [])

    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
          <ActivityIndicator size="large" color="#9222F2"/>
        </View>
      );
    }
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <MapView
          provider="google"
          initialRegion={{
            latitude: -3.7449195, //location.latitude,
            longitude: -38.5781234, //location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
            }}
          style={styles.map}
          showsUserLocation={showUserLocation}
          >
            {showSpots}
          </MapView>
          <View style={styles.overlay}>
            <View style={styles.searchBar}>
              <TextInput style={{marginLeft: 20, width:"90%", height:"100%"}}
              autoComplete="street-address" 
              placeholder='Onde vamos estacionar?'
              placeholderTextColor={"gray"}
              returnKeyType="search"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex:1
  },
  overlay: {
    width: "100%",
    position: "absolute",
    top: 50,
    height: 50,
    alignItems: "center"
  },
  searchBar: {
    flex: 1,
    width: "90%",
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: "flex-start",
    justifyContent: 'center'
  }
});