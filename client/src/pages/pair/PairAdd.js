import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

const AddPair = ({ navigation }) => {
  const [maleName, setMaleName] = useState('');
  const [femaleName, setFemaleName] = useState('');
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAnimals = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get('http://localhost:7000/animal', { headers: { Authorization: `Bearer ${token}` } }); 
    const animalsNotInPairs = response.data.filter(animal => animal.pair_id === null);
    setMales(animalsNotInPairs.filter(animal => animal.gender === 'male'));
    setFemales(animalsNotInPairs.filter(animal => animal.gender === 'female'));
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleAddPair = async () => {
    const selectedMale = males.find(male => male.name === maleName);
    const selectedFemale = females.find(female => female.name === femaleName);

    if (selectedMale.species !== selectedFemale.species) {
      setErrorMessage('Les deux animaux doivent être de la même espèce.');
      return;
    }

    const token = await AsyncStorage.getItem("token");
    await axios.post('http://localhost:7000/pair', { maleName, femaleName }, { headers: { Authorization: `Bearer ${token}` } });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Ajouter un couple" navigation={navigation} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text style={styles.label}>Male:</Text>
      <Searchbar
        style={styles.searchbar}
        placeholder="Rechercher un mâle"
        onChangeText={setMaleName}
        value={maleName}
      />
      <FlatList
        data={males.filter(male => male.name.includes(maleName))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => setMaleName(item.name)}>
            <Text style={styles.listText}>Nom : {item.name} Espèce:  {item.species}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.label}>Femelle:</Text>
      <Searchbar
        style={styles.searchbar}
        placeholder="Rechercher une femelle"
        onChangeText={setFemaleName}
        value={femaleName}
      />
      <FlatList
        data={females.filter(female => female.name.includes(femaleName))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => setFemaleName(item.name)}>
            <Text style={styles.listText}>Nom : {item.name} Espèce:  {item.species}</Text>
          </TouchableOpacity>
        )}
      />
      <Button mode="contained" style={styles.button} onPress={handleAddPair}>Ajouter un couple</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchbar: {
    marginBottom: 10,
    borderRadius: 5,
    elevation: 0,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  listText: {
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#3498DB',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  }
});

export default AddPair;
