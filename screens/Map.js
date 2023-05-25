import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

function MapScreen() {  
    return (
      <View style={styles.container}>
        <MapView
        provider="google"
        initialRegion={{
          latitude: -3.7343721,
          longitude: -38.5255120,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
        style={styles.map}
        />
      </View>
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
});