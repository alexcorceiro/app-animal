import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

function RegistrationPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState("")

  const register = async () => {
    try {
      await axios.post('http://localhost:7000/users/register', { 
        email, password, firstName, lastName , confirmPassword
      });
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
    <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} value={firstName}/>
    <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName}/>
    <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>
    <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
    <TextInput style={styles.input} placeholder='Confirm Password' onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry />
    <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
    </TouchableOpacity>
    <View style={styles.navigateContainer}>
      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navigateText}>Login</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    borderColor: '#3498DB',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498DB',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  navigateText: {
    color: '#3498DB',
    marginLeft: 5,
  },
});

export default RegistrationPage;
