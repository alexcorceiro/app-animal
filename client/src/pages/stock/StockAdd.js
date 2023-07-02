import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

function AddStock({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchase_date, setPurchaseDate] = useState('');

  const addStock = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const response = await axios.post('http://localhost:7000/stock', {
        name,
        type,
        description,
        quantity,
        purchase_date,
      }, { headers: { Authorization: `Bearer ${token}`}});
      console.log(response.data);
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Ajouter un stock"  navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Nom</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />

        <Text style={styles.label}>Type</Text>
        <TextInput style={styles.input} onChangeText={setType} value={type} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} onChangeText={setDescription} value={description} />

        <Text style={styles.label}>Quantiter</Text>
        <TextInput style={styles.input} onChangeText={setQuantity} value={quantity} />

        <Text style={styles.label}> Date</Text>
        <TextInput style={styles.input} onChangeText={setPurchaseDate} value={purchase_date} />

        <PaperButton style={styles.addButton} mode="contained" onPress={addStock}>
          Add Stock
        </PaperButton>
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
    fontSize: 18,
    color: '#0A8F91',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#3498DB',
  },
});

export default AddStock;
