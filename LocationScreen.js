
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button,FlatList , Image , TextInput, Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps'


const LocationScreen = ({route}) => {
    const {locationData} = route.params;
    console.log(locationData.coordinates[0]);
    console.log(locationData.coordinates[1]);
  
    return (
      <View style={styles.container}>
        {locationData && locationData.coordinates[0] && locationData.coordinates[1] ? (
          <MapView
            style={{ flex: 1, width: '100%', height: 100 }}
            initialRegion={{
              latitude: locationData.coordinates[0],
              longitude: locationData.coordinates[1],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: locationData.coordinates[0],
                longitude: locationData.coordinates[1],
              }}
              title="Votre position"
            />
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  
  };

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    hotel: {
      marginBottom: 40,
      paddingHorizontal: 70,
      paddingVertical: 10,
      backgroundColor: 'lightblue',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    hotelText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonStyle: {
      fontSize: 18,
      marginBottom: 10,
      backgroundColor: 'blue',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      color: '#FFF',
      textAlign: 'center',
    },
    datePicker: {
      width: 200,
      marginBottom: 20,
    },
  });


  export default LocationScreen;