import { StyleSheet, Text, View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';

const SpotMarker = props => {
    return (
    <Marker
      pinColor='navy'
      coordinate={props.location}
    >
      <Callout tooltip >
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{props.name}</Text>
          </View>
          <View style={styles.columns}>
            <View style={styles.column}>
              <View style={styles.label}>
                <Text style={styles.text}>Livres</Text>
              </View>
              <View style={[styles.box, {backgroundColor:"green"}]}>
                <Text style={styles.number}>{props.free}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.label}>
                <Text style={styles.text}>Reservadas</Text>
              </View>
              <View style={[styles.box, {backgroundColor:"#4691ef"}]}>
                <Text style={styles.number}>{props.occupied}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.label}>
                <Text style={styles.text}>Ocupadas</Text>
              </View>
              <View style={[styles.box, {backgroundColor:"red"}]}>
                <Text style={styles.number}>{props.reserved}</Text>
              </View>
            </View>
          </View>
        </View>
      </Callout>
    </Marker>
    );
};

export default SpotMarker

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: 15,
      padding: 10
    },
    title: {
      flex: 1,
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 20
    },
    columns: {
      flex: 1,
      flexDirection: "row"
    },
    column: {
      flex: 1,
    },
    label: {
      flex: 1,
      marginHorizontal:5,
      alignItems: "center"
    },
    text: {
      fontSize: 14
    },
    box: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 3,
      borderRadius: 20
    },
    number: {
      color: "white",
      fontWeight: "bold",
      fontSize: 28
    }
  });