import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:7000/users/profile", { headers: { Authorization: `Bearer ${token}` } });
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = () => {
    navigation.navigate("UpdateProfile");
  };

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:7000/users/deleteuser`, { headers: { Authorization: `Bearer ${token}` } });
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text style={styles.header}>Profile</Text>
          <Text style={styles.label}>Prenom: <Text style={styles.info}>{user.firstName}</Text></Text>
          <Text style={styles.label}>Nom: <Text style={styles.info}>{user.lastName}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.info}>{user.email}</Text></Text>
          <Text style={styles.label}>Adress: <Text style={styles.info}>{user.address}</Text></Text>
          <Text style={styles.label}>City: <Text style={styles.info}>{user.city}</Text></Text>
          <Text style={styles.label}>Pays: <Text style={styles.info}>{user.country}</Text></Text>
          <View style={styles.buttonContainer}>
            <Button style={styles.btnupdate} title="Mettre a jour le compte" onPress={handleUpdate} color="#3CB371"/>
            <Button  style={styles.btndelete} title="Supprimer mon compte" onPress={handleDeleteAccount} color="#CB4335"  />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: '#666',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'colomun',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    height: 100
  },
  btnupdate: {
    backgroundColor: "green",
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    elevation: 3, // This will give a shadow effect
    shadowOffset: { width: 1, height: 1 }, // Shadow positioning
    shadowColor: '#333', // Generic gray
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 10,
    marginTop: 10
  },
  btndelete: {
    backgroundColor: "#ff4500",
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    elevation: 3, // This will give a shadow effect
    shadowOffset: { width: 1, height: 1 }, // Shadow positioning
    shadowColor: '#333', // Generic gray
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 10,
    marginTop: 20
  },
});


export default ProfileScreen;
