import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { View, Button, StyleSheet, Text } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function EventList({ navigation }) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get('http://localhost:7000/event', { headers: { Authorization: `Bearer ${token}`}});
    setEvents(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Liste d'événements" isHome={true} navigation={navigation} />
      <View style={styles.innerContainer}>
        <Searchbar
          style={styles.searchbar}
          placeholder="Rechercher"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        <Button style={styles.btnadd}
          mode="contained"
          title="Ajouter un événement"
          onPress={() => navigation.navigate('AddEvent')}
        />
        {events.map((event) => (
          <Card key={event.id} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.titleDateContainer}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.date}>{event.date}</Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                title="Détails"
                onPress={() => navigation.navigate('DetailEvent', { id: event.id })}
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
  titleDateContainer: {
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
  date: {
    fontSize: 16,
    color: '#666',
  },
  btnadd: {
    marginVertical: 6,
    padding: 7,
    borderRadius: 15,
    backgroundColor: '#3498DB',
    
  }
});

export default EventList;
