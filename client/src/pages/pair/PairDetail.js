import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet , SafeAreaView } from 'react-native';
import { Button, Title } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import CustomHeader from "../../components/CustomHeader";

const PairDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [pair, setPair] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`http://localhost:7000/pair/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPair(res.data);
    };
    fetchData();
  }, [id]);

  if (!pair) {
    return <Text>Loading...</Text>;
  }

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/pair/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Détail du couple"  navigation={navigation} />
      <View style={styles.infoContainer}>
        <Title style={styles.title}>Détails du Couple</Title>
        <Text style={styles.text}>Mâle: {pair.male.name}</Text>
        <Text style={styles.text}>Femelle: {pair.female.name}</Text>
        <Text style={styles.text}>{`Créé le: ${format(parseISO(pair.created_at), "d MMMM yyyy", { locale: fr })}`}</Text>
      </View>
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('UpdatePair', { id: pair.id })}>
        Modifier le couple
      </Button>
      <Button mode="outlined" style={styles.deleteButton} color="#e74c3c" onPress={handleDelete}>
        Supprimer le couple
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  infoContainer: {
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    margin: 20,
    paddingVertical: 10,
    backgroundColor: '#3498DB',
  },
  deleteButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderColor: '#e74c3c',
  },
});

export default PairDetail;
