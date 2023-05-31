import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import SpotMarker from '../components/SpotMarker';
import * as Location from 'expo-location'

let spots = [
  {
    name: "Av Santos Dumont",
    location: {
      latitude: -3.7380718,
      longitude: -38.4921980
    },
    status: "Livre",
    weather: "shade",
    id: "1"
  },
  {
    name: "Av Beira Mar",
    location: {
      latitude: -3.7243827,
      longitude: -38.5021659
    },
    status: "Reservada",
    weather: "sunny",
    id:"2"
  },
  {
    name: "Rua Barão do Rio Branco",
    location: {
      latitude: -3.7233251,
      longitude: -38.5272121
    },
    status: "Ocupada",
    weather: "sunny",
    id:"3"
  }
]

const showSpots = spots.map((spot) => 
  <SpotMarker 
    key={spot.id} 
    location={spot.location}
    name={spot.name} 
    status={spot.status}
    weather={spot.weather} 
  />
);

function MapScreen() {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showUserLocation, setShowUserLocation] = useState(true)

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
        setIsLoading(false)
      })();
    }, []);

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
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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