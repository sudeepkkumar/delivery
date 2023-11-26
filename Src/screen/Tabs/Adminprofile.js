import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      const userId = await AsyncStorage.getItem('USERID');
      if (userId) {
        // Fetch user data
        firestore()
          .collection('admin')
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

    const getAdminData = async () => {
      const adminEmail = await AsyncStorage.getItem('EMAIL');
      if (adminEmail) {
        // Fetch admin data based on email
        const adminSnapshot = await firestore()
          .collection('admin')
          .where('email', '==', adminEmail)
          .get();

        if (!adminSnapshot.empty) {
          const admin = adminSnapshot.docs[0].data();
          setAdminData(admin);
        } else {
          alert('Admin data not found.');
        }
      }
    };

    getUserData();
    getAdminData();
  }, []);

  const handleLogout = async () => {
    // Perform logout actions here
    // For example, remove user data from storage and navigate to the login screen
    await AsyncStorage.removeItem('USERID'); // Remove the user ID from storage
    await AsyncStorage.removeItem('EMAIL'); // Remove the admin email from storage
    navigation.navigate('Signin'); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* Placeholder for avatar */} 
        <View style={styles.avatar}></View>
      </View>

      {adminData && (
        <View style={styles.infoContainer}>
          <Text style={{fontSize:23,color:'blue',fontWeight:'bold'}}>Admin Details</Text>
          <View style={styles.infoBox}>
            
            <Text style={styles.infoText}>Admin Name: {adminData.name}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Email ID: {adminData.email}</Text>
          </View>
        </View>
      )}

      {/* Logout button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
                navigation.navigate('Admindetails');
              }}

              
            >
              <Text style={styles.buttonText}>Business Details</Text>
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
              <Text style={styles.buttonText}>View Business Details</Text>
            </TouchableOpacity>
             
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: 'lightblue',
    borderRadius: 40,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: -20, // Adjust this value to move the details up or down
  },
  infoBox: {
    width: 300,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
  },
  infoText: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    backgroundColor: 'red',
    width: 150,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default Profile;
