import { SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native';
import { useState } from 'react';
import SpotCard from '../components/SpotCard';
import useStore from '../dataStore';

function SpotsScreen() {
  const client = useStore((state) => state.client);
  const data = useStore((state) => state.data);
  const userSpots = data.filter((spot) => spot.requestedBy === 12345)
  
  const spotComponent = userSpots.map((spot) => 
    <SpotCard location={spot.name} key={spot.name}/>
  );  

  return (
    <SafeAreaView style={styles.container}> 
        {userSpots.length !== 0 ? 
          <ScrollView>
            {spotComponent}
          </ScrollView>: 
          <View style={{justifyContent: "center", alignItems:"center", flex:1}}>
            <Text style={{color:"gray", alignSelf:"center"}}>Não há nenhuma vaga ativa para o usuário</Text>
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