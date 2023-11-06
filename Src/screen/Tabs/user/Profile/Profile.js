import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [users, setUserData] = useState(null);

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
              const users = documentSnapshot.data();
              setUserData(users);
            } else {
              alert('User data not found.');
            }
          })
      }
    };
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      {users ? (
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}></View>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 10}}>User Profile</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoText}>{users.name}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Mobile</Text>
            <Text style={styles.infoText}>{users.mobile}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoText}>{users.email}</Text>
          </View>
        </View>
      </View>
      ) : (
        <Text>Loading user data...</Text>
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
    width: 300,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
  },
});
