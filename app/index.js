import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient'; 

const { height } = Dimensions.get('window');
const slides = [
  { 
    key: '1', 
    title: 'MiAgendaFCFM', 
    text: 'Tu nueva app para tu escuela', 
    colors: ['#59b2ab', '#3a7e78'] 
  },
  { 
    key: '2', 
    title: 'Organízate', 
    text: 'Notas, tareas y archivos.', 
    colors: ['#febe29', '#f39c12'] 
  }
];

export default function IndexScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('@viewedOnboarding');
        if (value !== null) {
          router.replace('/(tabs)/tareas'); 
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  const onDone = async () => {
    await AsyncStorage.setItem('@viewedOnboarding', 'true');
    router.replace('/(tabs)/tareas');
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <LinearGradient
        colors={item.colors}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider 
        renderItem={renderItem} 
        data={slides} 
        onDone={onDone}
        showSkipButton={true}
        onSkip={onDone}
        doneLabel="Entrar"
        nextLabel="Siguiente"
        skipLabel="Saltar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  slide: { flex: 1 },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 28, color: 'white', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  text: { fontSize: 18, color: 'white', textAlign: 'center', opacity: 0.9 },
  botonEmergencia: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 15 } // Lo hice un poco transparente para que luzca mejor
});