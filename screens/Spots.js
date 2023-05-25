import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import SpotCard from '../components/SpotCard';

const userSpots = [
  {location: "Av Santos Dumont", vehicle: "NDR1987", timer:"00:40" },
  {location: "Av 13 de maio", vehicle: "NDR1987", timer:"00:00" },
  {location: "Av Heráclito Graça", vehicle: "NDR1987", timer:"00:00" },
  {location: "Av da Abolição", vehicle: "NDR1987", timer:"00:00" },
  {location: "Av Jovita Feitosa", vehicle: "NDR1987", timer:"00:00" },
]

const spotComponent = userSpots.map((spot) => 
  <SpotCard location={spot.location} vehicle={spot.vehicle} timer={spot.timer} />
  );

function SpotsScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {spotComponent}
        </ScrollView>
      </SafeAreaView>
    );
  }

export default SpotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc"
  }
});