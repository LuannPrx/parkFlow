import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SpotCard = props => {
    return (
    <View style={styles.spotCard}>
      <View style={styles.info}>
        <View style={styles.icon}>
            <Ionicons name="location-sharp" size={36} color="#9222F2" />
        </View>
        <View style={styles.location}>
          <Text style={styles.locationText}>{props.location}</Text>
        </View>
      </View>
      <View style={styles.status}>
        <Text style={styles.statusText}>Estacionado</Text>
      </View>
    </View>
    );
};

export default SpotCard

const styles = StyleSheet.create({
    spotCard: {
      height: 170,
      flexDirection: 'row',
      margin: 20,
      marginBottom: 0,
      borderWidth: 2,
      borderColor: "#f0f0f0",
      borderRadius: 15,
      backgroundColor: "white"
    },
    info: {
      flex: 3,
    },
    icon: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    location: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    locationText: {
      fontSize: 18, 
      fontWeight: "bold", 
      flexWrap: "wrap",
      margin: 5,
      marginTop: 0,
    },
    status: {
      flex: 2,
      backgroundColor: "#9222F2",
      justifyContent: "center",
      alignItems: "center",
      marginRight:15,
      marginTop: 35,
      marginBottom: 35,
      borderRadius: 15,
      padding: 5
    },
    statusText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "bold",
    }

  });