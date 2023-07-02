import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';


const UpdateAnimalScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [ring, setRing] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [image, setImage] = useState(null);

  const { id } = route.params;

  useEffect(() => {
    const fetchAnimalData = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`http://localhost:7000/animal/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const animal = response.data;
      setName(animal.name);
      setSpecies(animal.species);
      setRing(animal.ring);
      setGender(animal.gender);
      setBirthdate(animal.birthdate);
      setImage(animal.image);
    };

    fetchAnimalData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateAnimal = async () => {
    const token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('ring', ring);
    formData.append('gender', gender);
    formData.append('birthdate', birthdate);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'testPhoto.jpg',
    });

    await axios.put(
      `http://localhost:7000/animal/${id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    navigation.navigate('AnimalList');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Update Animal</Text>
    <View style={styles.inputContainer}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
    </View>
    <View style={styles.inputContainer}>
      <Text>Species</Text>
      <TextInput value={species} onChangeText={setSpecies} style={styles.input} />
    </View>
    <View style={styles.inputContainer}>
      <Text>Ring</Text>
      <TextInput value={ring} onChangeText={setRing} style={styles.input} />
    </View>
    <View style={styles.inputContainer}>
        <Text>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
    <View style={styles.inputContainer}>
      <Text>Birthdate</Text>
      <TextInput value={birthdate} onChangeText={setBirthdate} style={styles.input} />
    </View>
    <Button title="Pick an image" onPress={pickImage} color="#841584" />
    {image && <Image source={{ uri: image }} style={styles.image} />}
    <Button title="Update Animal" onPress={updateAnimal} color="#841584" />
    <Button title="Go Back" onPress={() => navigation.goBack()} color="#841584" />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default UpdateAnimalScreen;
