import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,ScrollView  } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AdminRegister = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessLandmark, setBusinessLandmark] = useState('');
  const [contractDetails, setContractDetails] = useState('');
  const [GST, setGST] = useState('');

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !businessName || !businessAddress || !businessLandmark || !contractDetails || !GST) {
        alert('Please fill in all fields');
        return;
      }

      const existingAdmin = await firestore().collection('admin').where('email', '==', email).get();

      if (!existingAdmin.empty) {
        alert('Email already registered');
        return;
      }

      const adminRef = await firestore().collection('admin').add({
        name,
        email,
        password,
        adminId:Math MIDIAcc(Math.random() * 10000 + 1),
        business: {
          businessName,
          businessAddress,
          businessLandmark,
          contractDetails,
          GST,
        },
      });

      alert('Admin and Business details registered successfully!');

      await AsyncStorage.setItem('ADMINID', adminRef.id);

      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during admin and business registration:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
      
      
      
      <Text style={styles.title}>Business Details</Text>
      
      
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Business Name'}
        placeholderTextColor={'black'}
        value={businessName}
        onChangeText={(text) => setBusinessName(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Business Address'}
        placeholderTextColor={'black'}
        value={businessAddress}
        onChangeText={(text) => setBusinessAddress(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Business Landmark'}
        placeholderTextColor={'black'}
        value={businessLandmark}
        onChangeText={(text) => setBusinessLandmark(text)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Contract details'}
        placeholderTextColor={'black'}
        value={contractDetails}
        onChangeText={(text) => setContractDetails(text)} // Changed to setContractDetails
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter GST NUMBER'}
        placeholderTextColor={'black'}
        value={GST}
        onChangeText={(text) => setGST(text)}
      />

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
    marginBottom: 0,
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20, // Add padding to the bottom to avoid overlapping the Register button
  },
});

export default AdminRegister;
