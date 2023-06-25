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


const AccueilScreen = ({ navigation }) => {
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
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hotels Liste </Text>
        <FlatList
          data={userVal}
          renderItem={(item) => {
            console.log(item.item.Location)
            return(
             <View style={styles.hotel}> 
              <Image source={{uri: item.item.img}} style={styles.ImageStyle}/>
              <Text style={styles.hotelText}>{item.item.HotelName} </Text>
              <Rating type="star" ratingCount={5} imageSize={15} startingValue={item.item.Rating} 
              readonly
              ratingColor="#FFC107" // Custom color for filled stars
              ratingBackgroundColor="#E0E0E0" // Custom color for empty stars
              ratingTextColor="#555555" // Custom color for rating text
              style={styles.rating} // Custom style for the Rating component
               />
              <Button style={styles.buttonStyle} title='Details' onPress={() => navigation.navigate('HotelDetails',{ hotelId: item.item.HotelId})}>
              </Button>
              <Button style={styles.buttonStyle} title='check location' onPress={() => navigation.navigate('LocationScreen' ,{ locationData: item.item.Location})}>
               </Button>
             </View>
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
    ImageStyle: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        marginVertical: 20,
      },
      rating: {
        marginTop: 10,
      },
  });

  export default AccueilScreen;