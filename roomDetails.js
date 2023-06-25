import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button,FlatList , Image , TextInput, Alert } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {Marker} from 'react-native-maps'
import * as Calendar from 'expo-calendar';
import DatePicker from 'react-native-datepicker';

const RoomDetails = ({route}) => {
  console.log(route.params);
  const {hotelId} = route.params;
  const {roomId} = route.params;
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
 // const roomFiltres = hotelFiltres.filter(item =>item.Rooms.some(room => room.RoomId === roomId));
  console.log('room');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rooms</Text>
        <FlatList
          data={hotelFiltres}
          renderItem={(item) => {

          return(      
            item.item.Rooms.map((room, index) => (
                
              <View style={styles.container} key={index}>
                {room.RoomId === roomId && (
                    <View style={styles.hotel} >
                <Text style={styles.hotelText}>- Description: {room.Description} {'\n'}
                - Type : {room.Type} {'\n'}
                - BedOptions: {room.BedOptions} {'\n'}
               </Text>
               </View>
              )}
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
  });


  export default RoomDetails;