import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook from React Navigation
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation(); // Initialize navigation

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

      {/* Link/Button for Admin Registration */}
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => navigation.navigate('AdminRegister')} // Navigate to AdminRegister screen
      >
        <Text style={styles.btnText}>Admin Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginBottom: 30,
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
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
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBtn: {
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default Login;
