import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

function EventDetails({ route, navigation }) {
  const [event, setEvent] = useState(null);
  const { id } = route.params;

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/event/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    setEvent(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/event/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return event ? (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Détails de l'événement" navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Titre :</Text>
        <Text style={styles.text}>{event.title}</Text>

        <Text style={styles.label}>Description :</Text>
        <Text style={styles.text}>{event.description}</Text>

        <Text style={styles.label}>Adresse :</Text>
        <Text style={styles.text}>{event.address}</Text>

        <Text style={styles.label}>Date :</Text>
        <Text style={styles.text}>{event.date}</Text>

        <Button mode="contained" style={styles.updateButton} onPress={() => navigation.navigate('UpdateEvent', { id: event.id })}>
          Modifier l'événement
        </Button>
        <Button mode="outlined" style={styles.deleteButton} onPress={handleDelete}>
          Supprimer l'événement
        </Button>
      </View>
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    color: '#0A8F91',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  updateButton: {
    margin: 20,
    paddingVertical: 10,
    backgroundColor: '#3498DB',
  },
  deleteButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderColor: "#E74C3C"
  },
});

export default EventDetails;
