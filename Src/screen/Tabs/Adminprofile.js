import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const adminData = await AsyncStorage.getItem('admin');
        if (admin) {
          const parsedAdminData = JSON.parse(admin);
          setAdminDetails(parsedAdmin);
        } else {
          console.log('Admin details not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      {adminDetails ? (
        <View style={styles.adminInfo}>
          <Text style={styles.infoText}>Name: {admin.name}</Text>
          <Text style={styles.infoText}>Email: {admin.email}</Text>
          {/* Render other admin details if needed */}
        </View>
      ) : (
        <Text>Loading admin details...</Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  adminInfo: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AdminDashboard;
