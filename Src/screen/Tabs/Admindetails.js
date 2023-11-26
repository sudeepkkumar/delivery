import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetailsForm = ({ name, email }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessLandmark, setBusinessLandmark] = useState('');
  const [contractDetails, setContractDetails] = useState(''); // Corrected variable name
  const [GST, setGST] = useState('');

  const saveBusinessDetails = async () => {
    try {
      if (!businessName || !businessAddress || !businessLandmark || !contractDetails || !GST) {
        alert('Please fill in all fields');
        return;
      }

      await firestore().collection('adminDetails').doc(email).set({
        businessName,
        businessAddress,
        businessLandmark,
        contractDetails,
        GST,
      });

      alert('Business details saved successfully!');
      
      setBusinessName('');
      setBusinessAddress('');
      setBusinessLandmark('');
      setContractDetails('');
      setGST('');

    } catch (error) {
      console.error('Error saving business details:', error);
      alert('An error occurred while saving business details');
    }
  };

  return (
    <View style={styles.container}>
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
      
      <TouchableOpacity style={styles.saveBtn} onPress={saveBusinessDetails}>
        <Text style={styles.btnText}>Save</Text>
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
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
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
  saveBtn: {
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

export default UserDetailsForm;
