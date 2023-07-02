import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from "../../components/CustomHeader";


const AnimalDetailScreen = ({ route, navigation }) => {
  const [animal, setAnimal] = useState(null);
  const { id } = route.params

  const fetchAnimal = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://localhost:7000/animal/${ id }`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAnimal(response.data);
    console.log(response)  };

  const handleUpdate = () => {
    navigation.navigate('UpdateAnimal', { id });
  };

  const handleDelete = async() => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/animal/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnimal();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CustomHeader title="detail de l'animal"  navigation={navigation} />
    <View style={styles.container}>
    {animal && (
      <>
        <Text style={styles.headerText}>Animal Details</Text>
        <Image
          style={styles.image}
          source={{ uri: animal.image ? animal.image : 'https://st2.depositphotos.com/1799371/7138/v/450/depositphotos_71389329-stock-illustration-vector-image-of-an-dog.jpg' }}
        />
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Nom: {animal.name}</Text>
          <Text style={styles.label}>Espaice: {animal.species}</Text>
          <Text style={styles.label}>Bague: {animal.ring}</Text>
          <Text style={styles.label}>Sex: {animal.gender}</Text>
          <Text style={styles.label}>Date de Naissance: {animal.birthdate}</Text>
          
          {animal.pair && (
            <View style={styles.pair}>
              <Text style={styles.label}>En couple:</Text>
              <Text style={styles.label}>Nom: {animal.pair.name}</Text>
              <Text style={styles.label}>espaice: {animal.pair.species}</Text>
              <Text style={styles.label}>Bague: {animal.pair.ring}</Text>
              <Text style={styles.label}>Sex: {animal.pair.gender}</Text>
              <Text style={styles.label}>Date de Naissance: {animal.pair.birthdate}</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Update" onPress={handleUpdate} color="#229954" />
          <Button title="Delete" onPress={handleDelete} color="red"  />
        </View>
      </>
    )}
  </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  detailContainer: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pair: {
    marginTop: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default AnimalDetailScreen;
