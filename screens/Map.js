import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
    free: 1,
    occupied: 2,
    reserved: 2,
    id: "1"
  },
  {
    name: "Av Beira Mar",
    location: {
      latitude: -3.7243827,
      longitude: -38.5021659
    },
    free: 2,
    occupied: 5,
    reserved: 3,
    id:"2"
  }
]

const showSpots = spots.map((spot) => 
  <SpotMarker 
    key={spot.id} 
    location={spot.location}
    name={spot.name} 
    free={spot.free} 
    reserved={spot.reserved} 
    occupied={spot.occupied} 
  />
);

function MapScreen() {
    const [location, setLocation] = useState();
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        if (location) {
          console.log(location)
        }
      })();
    }, []);
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <MapView
          provider="google"
          initialRegion={{
            latitude: -3.734372,
            longitude: -38.522551,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
          style={styles.map}
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