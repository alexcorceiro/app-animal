import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimalListScreen = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAnimals = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('http://localhost:7000/animal', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAnimals(response.data);
  };

  const searchAnimals = () => {
    if(searchQuery) {
      setAnimals(animals.filter(animal => animal.name.includes(searchQuery)));
    } else {
      fetchAnimals();
    }
  }

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Animal List" isHome={true} navigation={navigation} />
      <Searchbar
        placeholder="Search Animals"
        onChangeText={query => setSearchQuery(query)}
        onSubmitEditing={searchAnimals}
        value={searchQuery}
        style={styles.searchbar}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('AddAnimal')}>
        <Text style={styles.buttonText}>Add Animal</Text>
      </TouchableOpacity>
      <FlatList
        data={animals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.label}> {item.name}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: item.image ? item.image : 'https://st2.depositphotos.com/1799371/7138/v/450/depositphotos_71389329-stock-illustration-vector-image-of-an-dog.jpg' }} />
            <Card.Actions style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('AnimalDetail', { id: item.id })} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Details</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    paddingTop: 10,
  },
  searchbar: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 0,
    backgroundColor: 'white',
    height: 50,
  },
  buttonContainer: {
    marginBottom: 10,
    backgroundColor: '#3498DB',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

export default AnimalListScreen;
