import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button,FlatList , Image , TextInput, Alert } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {Marker} from 'react-native-maps'
import * as Calendar from 'expo-calendar';
import DatePicker from 'react-native-datepicker';
import AccueilScreen from './AccueilScreen';
import LocationScreen from './LocationScreen';


const ReserveScreen = ({route}) => {

    const {hotelId} = route.params;
    const {roomId} = route.params;
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    let isActive = false;
  
    useNativeDriver=true;
  
    async function fetchReservationData() {
      try {
        const response = await axios.get('http://10.74.0.242:3000/api/reservation');
        const data = response.data;
        return data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch reservation data');
      }
    }
  
    const sendDataToServer = async () => {
      try {
        const response = await axios.post('http://10.74.0.242:3000/api/data', {
          hotelId: hotelId,
          roomId: roomId,
          startDate: startDate,
          endDate: endDate
        });
        console.log('Data sent to the server');
        // Vérifier la réponse pour la réussite
        if (response.status === 200) {
          Alert.alert('Succès', 'votre reservation est bien enregistrée');
          setTitle('');
          setStartDate('');
          setEndDate('');
        } else {
          Alert.alert('Erreur', 'Échec de l\'envoi des données');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'envoi des données');
      }
    };
  
    const handleAddEvent = async () => {
      // Validate the input data
    if (!hotelId ||!roomId ||!startDate || !endDate) {
      Alert.alert('Erreur', 'Veuillez sélectionner une date de début et une date de fin');
      return;
    }
  
      fetchReservationData()
        .then((data) => {
          const hotelFiltres  = data.filter(((item) => item.hotelId === hotelId));
          if (hotelFiltres.length !=0){
            const roomFiltres  = hotelFiltres.filter(((item) => item.roomId === roomId));
            if (roomFiltres.length !=0){
              const dateFiltres  = roomFiltres.filter(((item) => item.startDate === startDate || item.endDate === endDate));
              if (dateFiltres.length !=0)
              {
                Alert.alert('Désolé une réservation est enregistrée avec la même date ');
                setStartDate('');
                setEndDate('');
                return;
              }else{
                sendDataToServer();
              }
            }else{
              sendDataToServer();
            }
          }else{
            sendDataToServer();
          }
        })
  
        Animated.timing(value, {
          toValue: 1,
          useNativeDriver: false, // Set useNativeDriver to true
        }).start();
  
    };
  
    return (
      <View style={styles.container}>
        
        <DatePicker
          style={styles.datePicker}
          date={startDate}
          mode="date"
          placeholder="Date de début"
          format="YYYY-MM-DD"
          confirmBtnText="Confirmer"
          cancelBtnText="Annuler"
          onDateChange={(date) => setStartDate(date)}
        />
        <DatePicker
          style={styles.datePicker}
          date={endDate}
          mode="date"
          placeholder="Date de fin"
          format="YYYY-MM-DD"
          confirmBtnText="Confirmer"
          cancelBtnText="Annuler"
          onDateChange={(date) => setEndDate(date)}
        />
        <Button
          title="Reserver"
          onPress={handleAddEvent}
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
      marginBottom: 40,
    },
  });


  export default ReserveScreen;