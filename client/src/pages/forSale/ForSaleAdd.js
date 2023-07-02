import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";

const AddAnimalForSale = ({ navigation }) => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem("token");
        try {
            await axios.post('http://localhost:7000/animalforsale', { name, species, birthdate, price }, { headers: { Authorization: `Bearer ${token}`}});
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Ajouter un animal à vendre" navigation={navigation} />
            <View style={styles.innerContainer}>
                <Text style={styles.label}>Nom</Text>
                <TextInput style={styles.input} onChangeText={text => setName(text)} value={name} />
                <Text style={styles.label}>Espèce</Text>
                <TextInput style={styles.input} onChangeText={text => setSpecies(text)} value={species} />
                <Text style={styles.label}>Date de Naissance</Text>
                <TextInput style={styles.input} onChangeText={text => setBirthdate(text)} value={birthdate} />
                <Text style={styles.label}>Prix</Text>
                <TextInput style={styles.input} onChangeText={text => setPrice(text)} value={price} />
                <Button mode="contained" style={styles.submitButton} onPress={handleSubmit}>
                    Ajouter l'animal
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
    submitButton: {
        backgroundColor: '#3498DB',
        padding: 10,
        borderRadius: 5,
    },
});

export default AddAnimalForSale;
