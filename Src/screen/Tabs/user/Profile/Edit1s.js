import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const userId = await AsyncStorage.getItem('USERID');
      if (userId) {
        firestore()
          .collection('users')
          .doc(userId)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
              const user = documentSnapshot.data();
              setUserData(user);
              setName(user.name);
              setMobile(user.mobile);
              setEmail(user.email);
            } else {
              alert('User data not found.');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data.');
          });
      }
    };

    getUserData();
  }, []);

  const updateUserProfile = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    if (userId) {
      firestore()
        .collection('users')
        .doc(userId)
        .update({
          name: name,
          mobile: mobile,
          email: email,
        })
        .then(() => {
          console.log('User profile updated!');
          alert('User profile updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating user profile:', error);
          alert('An error occurred while updating user profile.');
        });
    }
  };

  

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}></View>
          <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 10 }}>
           Edit User Profile
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Name</Text>
              <TextInput
                style={styles.infoText}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Mobile</Text>
              <TextInput
                style={styles.infoText}
                value={mobile}
                onChangeText={(text) => setMobile(text)}
              />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Email</Text>
              <TextInput
                style={styles.infoText}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={updateUserProfile}
          >
            <Text style={{ color: 'white' }}>Update Profile</Text>
          </TouchableOpacity>

          

        </View>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 150,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: 'lightblue',
    borderRadius: 40,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoBox: {
    width: 280,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: 'green',
    width: 120,
    height: 40,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
