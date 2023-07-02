import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { View, Button, StyleSheet, Text } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function StockList({ navigation }) {
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get('http://localhost:7000/stock', { headers: { Authorization: `Bearer ${token}`}});
    setStocks(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Les stocks" isHome={true} navigation={navigation} />
      <View style={styles.innerContainer}>
        <Searchbar
          style={styles.searchbar}
          placeholder="Rechercher"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        <Button
          title="Ajouter un stock"
          onPress={() => navigation.navigate('AddStock')}
        />
        {stocks.map((stock) => (
          <Card key={stock.id} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.titleTypeContainer}>
                <Text style={styles.title}>{stock.name}</Text>
                <Text style={styles.type}>{stock.type}</Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                title="Détails"
                onPress={() => navigation.navigate('StockDetails', { id: stock.id })}
              />
            </Card.Actions>
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
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cardActions: {
    justifyContent: 'flex-end'
  },
  titleTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  type: {
    fontSize: 16,
    color: '#666',
  },
});

export default StockList;
