import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

function StockDetails({ route, navigation }) {
  const { id } = route.params;
  const [stock, setStock] = useState(null);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/stock/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    setStock(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/stock/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="detail du stock"  navigation={navigation} />
      <View style={styles.innerContainer}>
        {stock && (
          <>
            <Text style={styles.label}>Nom:</Text>
            <Text style={styles.text}>{stock.name}</Text>

            <Text style={styles.label}>Type:</Text>
            <Text style={styles.text}>{stock.type}</Text>

            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{stock.description}</Text>

            <Text style={styles.label}>Quantiter:</Text>
            <Text style={styles.text}>{stock.quantity}</Text>

            <Text style={styles.label}> Date:</Text>
            <Text style={styles.text}>{stock.purchase_date}</Text>

            <PaperButton style={styles.updateButton} mode="contained" onPress={() => navigation.navigate('UpdateStock', { id: stock.id })}>
              mettre a jour 
            </PaperButton>
            <PaperButton style={styles.deleteButton} mode="outlined" onPress={handleDelete}>
              supprimer stock
            </PaperButton>
          </>
        )}
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

export default StockDetails;
