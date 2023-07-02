import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";


function UpdateEvent({ route, navigation }) {
  const { id } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/event/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    const event = response.data;
    setTitle(event.title);
    setDescription(event.description);
    setAddress(event.address);
    setDate(event.date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateEvent = async () => {
    const token = await AsyncStorage.getItem("token")
    await axios.put(`http://localhost:7000/event/${id}`, { title, description, address, date }, { headers: { Authorization: `Bearer ${token}`}});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Mettre à jour l'événement" navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Titre</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le titre de l'événement"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez la description de l'événement"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.label}>Adresse</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez l'adresse de l'événement"
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez la date de l'événement"
          value={date}
          onChangeText={setDate}
        />
        <Button mode="contained" style={styles.updateButton} onPress={updateEvent}>
          Mettre à jour l'événement
        </Button>
      </View>
    </SafeAreaView>
  );
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
  },
});

export default UpdateEvent;
