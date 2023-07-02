import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';

const BirthListScreen = ({ navigation }) => {
  const [births, setBirths] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/birth');
      setBirths(response.data);
    } catch (error) {
      console.error("Failed to fetch births:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchResults = births.filter(birth =>
    birth.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    birth.number_babies.toLowerCase().includes(searchQuery.toLowerCase()) ||
    birth.animalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBirthItem = ({ item }) => {
    // Choose either the male or female randomly
    const randomAnimal = Math.random() < 0.5 ? item.pair.male : item.pair.female;

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>{`Parent: ${randomAnimal.name}`}</Paragraph>
          <Paragraph>{`Date: ${item.date}`}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button mode="contained" style={{backgroundColor: "#3498DB"}}
           onPress={() => navigation.navigate('BirthDetail', { id: item.id })}>
            Details
          </Button>
        </Card.Actions>
      </Card>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Les naissance list" isHome={true} navigation={navigation} />
      <Searchbar
        placeholder="Search"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Button
        mode="contained"
        style={styles.addButton}
        labelStyle={styles.addButtonText}
        onPress={() => navigation.navigate('AddBirth')}
      >
        ajouter une naissance
      </Button>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={renderBirthItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EFEFF4',
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 10,
  },
  addButton: {
    marginBottom: 16,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    borderColor: '#D1D1D6',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 8,
  },
});

export default BirthListScreen;
