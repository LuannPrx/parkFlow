import { SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native';
import { useState } from 'react';
import SpotCard from '../components/SpotCard';

function SpotsScreen() {
  const [userSpots, setUserSpots] = useState([])

  const spotComponent = userSpots.map((spot) => 
  <SpotCard device={spot.deviceName} location={spot.location} />
  );

  // setUserSpots(
  //   [
  //     {location: "Av Santos Dumont", vehicle: "NDR1987", timer:"00:40" },
  //     {location: "Av Beira Mar", vehicle: "NDR1987", timer:"00:00" },
  //     {location: "R. Barãor do Rio Branco", vehicle: "NDR1987", timer:"00:00" },
  //   ]
  // )

  return (
    <SafeAreaView style={styles.container}> 
        {userSpots===[] ? 
          <ScrollView>
            {spotComponent}
          </ScrollView>: 
          <View style={{justifyContent: "center", alignItems:"center", flex:1}}>
            <Text style={{color:"gray", alignSelf:"center"}}>Não há vagas para esse usuário</Text>
          </View>
        }
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