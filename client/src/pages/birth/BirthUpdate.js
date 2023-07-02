import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from "../../components/CustomHeader";

const UpdateBirthScreen = ({ navigation, route }) => {
    const [date, setDate] = useState('');
    const [numberBabies, setNumberBabies] = useState('');
    const [animals, setAnimals] = useState([]);
    const [animalName, setAnimalName] = useState('');
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const { id } = route.params;

    useEffect(() => {
        fetchPairs();
        fetchBirthData();
    }, []);

    useEffect(() => {
        const results = animals.filter(animal => animal && animal.toLowerCase().includes(animalName.toLowerCase()));
        setFilteredAnimals(results);
    }, [animalName]);

    const fetchPairs = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://localhost:7000/pair', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const animalNames = response.data.reduce((names, pair) => {
            return names.concat(pair.animal.map(animal => animal.name ? animal.name : ''));
        }, []);
        setAnimals(animalNames);
    };

    const fetchBirthData = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://localhost:7000/birth/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const birth = response.data;
        setDate(birth.date);
        setNumberBabies(birth.number_babies.toString());
        setAnimalName(birth.pair?.animal?.name || '');
    };

    const updateBirth = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.put(`http://localhost:7000/birth/${id}`, {
                date,
                number_babies: numberBabies,
                animalName
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigation.goBack();
        } catch (err) {
            console.error('Failed to update birth:', err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Mise à jour de la naissance" navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.label}>Date</Text>
                <TextInput style={styles.input} onChangeText={setDate} value={date} />
                <Text style={styles.label}>Nombre de bébés</Text>
                <TextInput style={styles.input} onChangeText={setNumberBabies} value={numberBabies} keyboardType='numeric' />
                <Text style={styles.label}>Nom de l'animal</Text>
                <TextInput style={styles.input} onChangeText={setAnimalName} value={animalName} />
                <Text>Voici le nom des parents actuellement en couple :</Text>
                <FlatList
                    data={filteredAnimals}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <Text>{item}</Text>}
                />
                <Button title='Mettre à jour la naissance' onPress={updateBirth} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    }
});

export default UpdateBirthScreen;
