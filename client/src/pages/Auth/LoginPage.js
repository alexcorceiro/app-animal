import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:7000/users/login', { email, password });
      await AsyncStorage.setItem("token", response.data.token)
      navigation.navigate('HomeApp');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.image}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://www.thesprucepets.com/thmb/rW016PPM5VrD2cAJnMId-W1mLmM=/3865x0/filters:no_upscale():strip_icc()/close-up-of-gold-and-blue-macaw-perching-on-tree-962288862-5b50073e46e0fb0037c23c23.jpg',
        }}
      />
      </View>
    <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>
    <TextInput style={styles.input} placeholder="Mot de Passe" onChangeText={setPassword} value={password} secureTextEntry />
    <Button title="Se connecter" onPress={login} />
    <View style={styles.navigateContainer}>
      <Text>Vous avez pas de compte?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.navigateText}>Register</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  input: {
    marginBottom: 15,
    marginTop: 20,
    padding: 10
  },
  navigateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  navigateText: {
    color: 'blue',
    marginLeft: 5,
  },
  image: {
   display: 'flex', 
   alignItems: "center",
   marginBottom: 35
  },
  tinyLogo :{
    width: 200,
    height: 200,
    borderRadius: 100
  }
});

export default LoginPage;
