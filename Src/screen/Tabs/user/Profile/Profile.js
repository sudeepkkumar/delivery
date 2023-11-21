import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



const Profile = () => {
  const [users, setUserData] = useState(null);
  const navigation = useNavigation();


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

  const handleLogout = async () => {
    // Perform logout actions here
    // For example, remove user data from storage and navigate to the login screen
    await AsyncStorage.removeItem('USERID'); // Remove the user ID from storage
    navigation.navigate('Signin'); // Navigate to the login screen
  };

  return (
    <View style={[styles.container, { marginTop: 100 }]}>
      {users ? (
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}></View>
          <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 10,color:'black' }}>
            User Profile
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
            <Text style={[styles.infoLabel, { fontWeight: 'bold', color: 'black' }]}>Name</Text>
              <Text style={[styles.infoText, { fontWeight: 'bold', color: 'black' }]}>{users.name}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={[styles.infoLabel, { fontWeight: 'bold', color: 'black' }]}>Mobile</Text>
              <Text style={[styles.infoText, { fontWeight: 'bold', color: 'black' }]}>{users.mobile}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={[styles.infoLabel, { fontWeight: 'bold', color: 'black' }]}>Email</Text>
              <Text style={[styles.infoText, { fontWeight: 'bold', color: 'black' }]}>{users.email}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                width: 350,
                height: 50,
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('Changepassword');
              }}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: 8 }} />
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                width: 350,
                height: 50,
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('Edit1s');
              }}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: 8 }} />
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
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
  button: {
    backgroundColor: 'red',
    width: 150,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
