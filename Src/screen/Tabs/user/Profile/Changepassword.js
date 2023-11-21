import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');

  const changePassword = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    if (userId) {
      // Assuming you have a 'users' collection in Firestore
      firestore()
        .collection('users')
        .doc(userId)
        .update({
          password: newPassword, // Update the password field with the new password
        })
        .then(() => {
          console.log('Password changed successfully!');
          alert('Password changed successfully.');
          navigation.goBack(); // Navigate back to the profile page
        })
        .catch((error) => {
          console.error('Error changing password:', error);
          alert('An error occurred while changing the password.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#808080"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={changePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    color:'black',
  },
  button: {
    backgroundColor: 'green',
    height: 50,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
  },
});
