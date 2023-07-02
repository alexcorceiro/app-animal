import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Card, Title, Searchbar, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

function PairList({ navigation }) {
  const [pairs, setPairs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get('http://localhost:7000/pair', { headers: { Authorization: `Bearer ${token}`}});
    setPairs(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="La liste des couples" isHome={true} navigation={navigation} />
      <View style={styles.innerContainer}>
        <Searchbar
          placeholder="Chercher"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={styles.searchbar}
        />
        <Button mode="contained" style={styles.addButton} onPress={() => navigation.navigate('AddPair')}>
          Ajouter un couple
        </Button>
        {pairs.map((pair) => (
          <Card key={pair.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>{pair.animal && pair.animal.length > 0 ? `Couple de ${pair.animal[Math.floor(Math.random() * pair.animal.length)].name}` : 'Non disponible'}</Title>
              <Button mode="contained" style={styles.detailsButton} onPress={() => navigation.navigate('PairDetail', { id: pair.id })}>
                Détails
              </Button>
            </Card.Content>
          </Card>
        ))}
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
  searchbar: {
    marginBottom: 10,
  },
  addButton: {
    marginVertical: 8,
    padding: 7,
    borderRadius: 15,
    backgroundColor: '#3498DB',
  },
  card: {
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  title: {
    fontSize: 20,
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#3498DB',
    width:"40%",
    marginLeft:"58%"
  }
});

export default PairList;
