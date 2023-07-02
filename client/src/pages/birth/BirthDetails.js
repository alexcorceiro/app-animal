import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function BirthDetails({ route, navigation }) {
  const [birthDetails, setBirthDetails] = useState(null);
  const { id } = route.params;

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`http://localhost:7000/birth/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    setBirthDetails(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:7000/birth/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return birthDetails ? (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Détails de la naissance" navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Couple :</Text>
        <Text style={styles.text}>{birthDetails.pair.male.name} et {birthDetails.pair.female.name}</Text>

        <Text style={styles.label}>Nombre de bébés :</Text>
        <Text style={styles.text}>{birthDetails.number_babies}</Text>

        <Text style={styles.label}>Date de naissance :</Text>
        <Text style={styles.text}>{birthDetails.date}</Text>

        <Text style={styles.label}>Père :</Text>
        <Text style={styles.text}>{birthDetails.pair.male.name}, espèce: {birthDetails.pair.male.species}</Text>

        <Text style={styles.label}>Mère :</Text>
        <Text style={styles.text}>{birthDetails.pair.female.name}, espèce: {birthDetails.pair.female.species}</Text>

        <Text style={styles.label}>Créé le :</Text>
        <Text style={styles.text}>{format(parseISO(birthDetails.created_at), "d MMMM yyyy", { locale: fr })}</Text>

        <Button mode="contained" style={styles.updateButton} onPress={() => navigation.navigate('UpdateBirth', { id: birthDetails.id })}>
          Modifier la naissance
        </Button>
        <Button mode="outlined" style={styles.deleteButton} onPress={handleDelete}>
          Supprimer la naissance
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

export default BirthDetails;
