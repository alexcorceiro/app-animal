import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

function AnimalForSaleDetails({ route, navigation }) {
  const [animal, setAnimal] = useState(null);
  const { id } = route.params;

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/animalforsale/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    setAnimal(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/animalforsale/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return animal ? (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Détails de l'animal à vendre" navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.text}>{animal.name}</Text>

        <Text style={styles.label}>Espèce :</Text>
        <Text style={styles.text}>{animal.species}</Text>

        <Text style={styles.label}>Date de naissance :</Text>
        <Text style={styles.text}>{animal.birthdate}</Text>

        <Text style={styles.label}>Prix :</Text>
        <Text style={styles.text}>{animal.price} €</Text>

        <Text style={styles.label}>Sexe :</Text>
        <Text style={styles.text}>{animal.gender}</Text>

        <Button mode="contained" style={styles.updateButton} onPress={() => navigation.navigate('UpdateAnimalForSale', { id: animal.id })}>
          Modifier l'animal
        </Button>
        <Button mode="outlined" style={styles.deleteButton} onPress={handleDelete}>
          Supprimer l'animal
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

export default AnimalForSaleDetails;
