import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Button } from "react-native"
import { Card } from "react-native-paper"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AnimalForSaleList = ({ navigation }) => {
    const [animalForSale, setAnimalForSale] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchAnimalForSale();
    }, [])

    const fetchAnimalForSale = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const response = await axios.get("http://localhost:7000/animalforsale", { headers: { Authorization: `Bearer ${token}` } })
            setAnimalForSale(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const filteredAnimalForSale = animalForSale.filter(animal =>
        animal.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Liste des animaux à vendre" isHome={true} navigation={navigation} />
            <View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Recherche"
                    onChangeText={text => setSearch(text)}
                    value={search}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddforAnimal')}>
                    <Text style={styles.addButtonText}>Ajouter un animal à vendre</Text>
                </TouchableOpacity>
                <FlatList
                    data={filteredAnimalForSale}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.card} onPress={() => navigation.navigate('AnimalForSaleDetails', { id: item.id })}>
                            <Card.Title title={item.name} subtitle={item.species} />
                            <Card.Actions>
                                <Button title="Details" onPress={() => navigation.navigate('AnimalForSaleDetails', { id: item.id })} />
                            </Card.Actions>
                        </Card>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
    addButton: {
        padding: 10,
        backgroundColor: '#3498DB',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 5,
    },
    cardText: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        fontSize: 14,
        color: '#333',
    },
});
