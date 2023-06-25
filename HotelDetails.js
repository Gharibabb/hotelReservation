import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button,FlatList , Image , TextInput, Alert } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {Marker} from 'react-native-maps'
import * as Calendar from 'expo-calendar';
import DatePicker from 'react-native-datepicker';
import { Rating } from 'react-native-ratings';

const HotelDetails = ({route, navigation}) => {
  console.log(route.params);
  const {hotelId} = route.params;
  const [userVal, setUserVal] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.74.0.242:3000/data/scan');
        setUserVal(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Filtrer les livres par id 
  const hotelFiltres  = userVal.filter(((item) => item.HotelId === hotelId));
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rooms</Text>
        <FlatList
          data={hotelFiltres}
          renderItem={(item) => {

          return(      
            item.item.Rooms.map((room, index) => (
              <View style={styles.hotel} key={index}>
                <Text style={styles.hotelText}>{room.Description}</Text>
                <Rating type="star" ratingCount={5} imageSize={15} startingValue={room.BaseRate} 
                readonly
                ratingColor="#FFC107" // Custom color for filled stars
                ratingBackgroundColor="#E0E0E0" // Custom color for empty stars
                ratingTextColor="#555555" // Custom color for rating text
                style={styles.rating} // Custom style for the Rating component
                />
                <Button style={styles.buttonStyle} title='RoomDetails' onPress={() => navigation.navigate('RoomDetails',{ hotelId: hotelId , roomId: room.RoomId})}>
                </Button>
                <Button style={styles.buttonStyle} title='Disponibilité' onPress={() => navigation.navigate('Disponibilite',{ hotelId: hotelId , roomId: room.RoomId})}>
                </Button>
                <Button style={styles.buttonStyle} title='Reserver' onPress={() => navigation.navigate('ReserveScreen',{ hotelId: hotelId , roomId: room.RoomId})}>
                </Button>
              </View>
                    )
            )
          )
          }
        }   
        />
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
    rating: {
        marginTop: 10,
      },
  });


  export default HotelDetails;