import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

function UpdateStock({ route, navigation}) {
  const { id } = route.params;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchase_date, setPurchaseDate] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/stock/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    const stock = response.data;
    setName(stock.name);
    setType(stock.type);
    setDescription(stock.description);
    setQuantity(stock.quantity);
    setPurchaseDate(stock.purchase_date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStock = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      const response = await axios.put(`http://localhost:7000/stock/${id}`, {
        name,
        type,
        description,
        quantity,
        purchase_date,
      }, { headers: { Authorization: `Bearer ${token}`}});
      navigation.navigate("StockList")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Mettre à jour le stock"  navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Nom</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />

        <Text style={styles.label}>Type</Text>
        <TextInput style={styles.input} onChangeText={setType} value={type} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} onChangeText={setDescription} value={description} />

        <Text style={styles.label}>Quantiter</Text>
        <TextInput style={styles.input} onChangeText={setQuantity} value={quantity} />

        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input} onChangeText={setPurchaseDate} value={purchase_date} />

        <PaperButton style={styles.updateButton} mode="contained" onPress={updateStock}>
          Update Stock
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
  updateButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#3498DB',
  },
});

export default UpdateStock;
