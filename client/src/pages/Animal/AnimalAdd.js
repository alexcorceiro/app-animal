import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { View, Text, Image, StyleSheet, Button, Platform } from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import { Picker } from '@react-native-picker/picker';


const AddAnimalScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [ring, setRing] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [image, setImage] = useState(null);

  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addAnimal = async () => {
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('image', {
      name: 'image.jpg',
      type: 'image/jpeg',
      uri: image,
    });
    formData.append('name', name);
    formData.append('species', species);
    formData.append('ring', ring);
    formData.append('gender', gender);
    formData.append('birthdate', birthdate);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post('http://localhost:7000/animal', formData, config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader title="Nouveau Animal"  navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.title}>ajouter un animal</Text>
      <Input placeholder="Nom" value={name} onChangeText={setName} />
      <Input placeholder="epaise" value={species} onChangeText={setSpecies} />
      <Input placeholder="bague" value={ring} onChangeText={setRing} />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choisir le sexe" value="" />
          <Picker.Item label="Mâle" value="male" />
          <Picker.Item label="Femelle" value="female" />
        </Picker>
      </View>
      <Input placeholder="date de naissance" value={birthdate} onChangeText={setBirthdate} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="ajouter une image" onPress={pickImage} />
      <Button title="enregistrer animal" onPress={addAnimal} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5, 
    marginBottom: 20,
    borderColor: '#fff'
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000', 
    borderColor: "none"
    
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default AddAnimalScreen;
