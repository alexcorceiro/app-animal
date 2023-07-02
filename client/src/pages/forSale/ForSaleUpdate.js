import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

const UpdateAnimalForSale = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [price, setPrice] = useState('');
    const { id } = route.params;

    useEffect(() => {
        fetchAnimalForSale();
    }, [])

    const fetchAnimalForSale = async () => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`http://localhost:7000/animalforsale/${id}`, { headers: { Authorization: `Bearer ${token}`}});
        const animal = response.data;
        setName(animal.name);
        setSpecies(animal.species);
        setBirthdate(animal.birthdate);
        setPrice(animal.price);
    }

    const updateAnimalForSale = async () => {
        const token = await AsyncStorage.getItem("token");
        await axios.put(`http://localhost:7000/animalforsale/${id}`, { name, species, birthdate, price }, { headers: { Authorization: `Bearer ${token}`}});
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Mettre à jour l'animal à vendre" navigation={navigation} />
            <View style={styles.innerContainer}>
                <Text style={styles.label}>Nom</Text>
                <TextInput style={styles.input} onChangeText={text => setName(text)} value={name} />
                <Text style={styles.label}>Espèce</Text>
                <TextInput style={styles.input} onChangeText={text => setSpecies(text)} value={species} />
                <Text style={styles.label}>Date de Naissance</Text>
                <TextInput style={styles.input} onChangeText={text => setBirthdate(text)} value={birthdate} />
                <Text style={styles.label}>Prix</Text>
                <TextInput style={styles.input} onChangeText={text => setPrice(text)} value={price} />
                <Button mode="contained" style={styles.updateButton} onPress={updateAnimalForSale}>
                    Mettre à jour l'animal
                </Button>
            </View>
        </SafeAreaView>
    );
};

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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    updateButton: {
        backgroundColor: '#3498DB',
        padding: 10,
        borderRadius: 5,
    },
});

export default UpdateAnimalForSale;
