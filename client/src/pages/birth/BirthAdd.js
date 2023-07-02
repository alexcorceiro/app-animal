import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from "../../components/CustomHeader";

const AddBirthScreen = ({ navigation }) => {
    const [date, setDate] = useState('');
    const [numberBabies, setNumberBabies] = useState('');
    const [animals, setAnimals] = useState([]);
    const [animalName, setAnimalName] = useState('');
    const [filteredAnimals, setFilteredAnimals] = useState([]);

    useEffect(() => {
      fetchPairs();
    }, []);

    useEffect(() => {
      const results = animals.filter(animal =>
        animal.toLowerCase().includes(animalName.toLowerCase())
      );
      setFilteredAnimals(results);
    }, [animalName]);

    const fetchPairs = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://localhost:7000/pair', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const animalNames = response.data.reduce((names, pair) => {
          return names.concat(pair.animal.map(animal => animal.name));
        }, []);
        setAnimals(animalNames);
      } catch (error) {
        console.error('Failed to fetch animals:', error);
      }
    };

    const addBirth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.post('http://localhost:7000/birth', {
          date,
          number_babies: numberBabies,
          animalName
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigation.goBack();
      } catch (err) {
        console.error('Failed to add birth:', err);
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title="Ajouter une naissance" navigation={navigation} />
        <View style={styles.container}>
          <Text style={styles.label}>Date</Text>
          <TextInput style={styles.input} onChangeText={setDate} value={date} placeholder="Entrez la date" />
          
          <Text style={styles.label}>Nombre de bébés</Text>
          <TextInput style={styles.input} onChangeText={setNumberBabies} value={numberBabies} placeholder="Entrez le nombre de bébés" keyboardType="numeric" />
          
          <Text style={styles.label}>Nom de l'animal</Text>
          <TextInput style={styles.input} onChangeText={setAnimalName} value={animalName} placeholder="Entrez le nom de l'animal" />
          
          <Text style={styles.label}>Voici le nom des parents actuellement en couple :</Text>
          <FlatList
            data={filteredAnimals}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
          
          <Button title='Ajouter la naissance' onPress={addBirth} />
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default AddBirthScreen;
