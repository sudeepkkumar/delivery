import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AdminRegister = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Validate input fields (add more validation if needed)
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }

      // Check if the email is already registered
      const existingAdmin = await firestore()
        .collection('admin')
        .where('email', '==', email)
        .get();

      if (!existingAdmin.empty) {
        alert('Email already registered');
        return;
      }

      // Register the admin
      const adminRef = await firestore().collection('admin').add({
        name,
        email,
        password, // Note: Password should be hashed in a real-world scenario
      });

      alert('Admin registered successfully!');

      // Save the newly registered admin ID in AsyncStorage
      await AsyncStorage.setItem('ADMINID', adminRef.id);

      // Navigate to the AdminLogin page or any other page as needed
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during admin registration:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Registration</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Name'}
        placeholderTextColor={'black'}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Email Id'}
        placeholderTextColor={'black'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password'}
        placeholderTextColor={'black'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 20,
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
    backgroundColor: 'white',
  },
  registerBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AdminRegister;
