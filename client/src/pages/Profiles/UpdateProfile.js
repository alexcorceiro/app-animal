import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UpdateProfile({ navigation }) {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:7000/users/profile", { headers: { Authorization: `Bearer ${token}` } });
        const user = response.data;
        setUser(user);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setAddress(user.address);
        setCity(user.city);
        setCountry(user.country);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem("token");
    const updateUser = {
      firstName,
      lastName,
      email,
      address,
      city,
      country,
    };
    try {
      await axios.put(`http://localhost:7000/users/update`, updateUser, { headers: { Authorization: `Bearer ${token}` } });
      navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Profile</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name:</Text>
        <TextInput style={styles.inputField} value={firstName} onChangeText={setFirstName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Last Name:</Text>
        <TextInput style={styles.inputField} value={lastName} onChangeText={setLastName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput style={styles.inputField} value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Address:</Text>
        <TextInput style={styles.inputField} value={address} onChangeText={setAddress} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>City:</Text>
        <TextInput style={styles.inputField} value={city} onChangeText={setCity} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Country:</Text>
        <TextInput style={styles.inputField} value={country} onChangeText={setCountry} />
      </View>
      <Button title="Update Profile" onPress={handleUpdate} color="#006400" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3c3c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#696969',
  },
  inputField: {
    height: 40,
    borderColor: '#808080',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default UpdateProfile;
