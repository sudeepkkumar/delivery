import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = async () => {
    try {
      const adminSnapshot = await firestore().collection('admin').where('email', '==', email).get();

      if (!adminSnapshot.empty) {
        const adminData = adminSnapshot.docs[0].data();

        if (password === adminData.password) {
          // Passwords match, navigate to the Dashboard
          await AsyncStorage.setItem('EMAIL', email);
          navigation.navigate('Dashboard');
        } else {
          // Incorrect password
          alert('Incorrect password');
        }
      } else {
        // User not found with the given email
        alert('User not found');
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Email Id'}
        placeholderTextColor={'black'}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password '}
        placeholderTextColor={'black'}
        value={password}
        secureTextEntry={true}
        onChangeText={(txt) => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Please Enter Data');
          }
        }}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
    color: 'black',
  },
  loginBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default Login;
