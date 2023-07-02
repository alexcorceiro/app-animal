import React, { useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

function AddEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const addEvent = async () => {
    const token = await AsyncStorage.getItem("token")
    await axios.post('http://localhost:7000/event', { title, description, address, date }, { headers: { Authorization: `Bearer ${token}` }});
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Ajouter un événement" navigation={navigation} />
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
        <Button mode="contained" style={styles.addButton} onPress={addEvent}>
          Ajouter l'événement
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
  addButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 5,
  },
});

export default AddEventScreen;
