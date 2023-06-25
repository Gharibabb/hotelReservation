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
import ReserveScreen from './ReserveScreen';
import HotelDetails from './HotelDetails';
import RoomDetails from './roomDetails';
import Disponibilite from './Disponibilite';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Accueil" component={AccueilScreen} />
          <Stack.Screen name="HotelDetails" component={HotelDetails} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="ReserveScreen" component={ReserveScreen} />
          <Stack.Screen name="RoomDetails" component={RoomDetails} />
          <Stack.Screen name="Disponibilite" component={Disponibilite} />
        </Stack.Navigator>
      </NavigationContainer>
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
