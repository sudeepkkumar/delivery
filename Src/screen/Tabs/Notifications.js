import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

let userId = '';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    getAllOrders();
    
  }, []);

  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS');
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    tempDart.map(item => {
        if (item.addressId == addressId) {
            const formattedAddress = `\n Address : ${item.street},\n City & State: ${item.city},\n Pincode: ${item.pincode}, \n Mobile: ${item.mobile}`;
            setSelectedAddress(formattedAddress);
        }
    });
};

  const getAllOrders = async () => {
    try {
      const querySnapshot = await firestore().collection('orders').get();
  
      const tempData = [];
      for (const documentSnapshot of querySnapshot.docs) {
        const orderData = documentSnapshot.data().data;
        const userId = orderData.userId;
  
        // Fetch user details
        const userSnapshot = await firestore().collection('users').doc(userId).get();
        const userData = userSnapshot.data();
  
        // Fetch user address details
        const addressSnapshot = await firestore().collection('users').doc(userId).collection('address').get();
        const addressData = addressSnapshot.docs.map(doc => doc.data());
  
        tempData.push({
          orderId: documentSnapshot.id,
          userData,
          addressData,
          orderData,
        });
      }
  
      setOrders(tempData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Orders</Text>
      </View>
      <FlatList
        data={orders}
        //data={item.orderData.address}
        keyExtractor={({ orderId }) => orderId}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.userName}>{item.userData.name}</Text>
            {/* Display user information */}
            <Text style={styles.userInfo}>{`Address: ${item.userData.street}`}</Text>
            <Text style={styles.userInfo}>{`Street: ${item.userData.street}`}</Text>
            <Text style={styles.userInfo}>{`Pincode: ${item.userData.pincode}`}</Text>
            <Text style={styles.userInfo}>{`Mobile: ${item.userData.mobile}`}</Text>
            <Text style={styles.userInfo}>{`Email: ${item.userData.email}`}</Text>
            

            
            

            <FlatList
              data={item.orderData.items}
              renderItem={({ item: orderItem }) => (
                <View style={styles.itemView}>
                  <Image source={{ uri: orderItem.data.imageUrl }} style={styles.itemImage} />
                  <View>
                    <Text style={styles.nameText}>{orderItem.data.name}</Text>
                    <Text style={styles.nameText}>{`Price: ${orderItem.data.discountPrice}, Qty: ${orderItem.data.qty}`}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  orderItem: {
    width: '90%',
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 5,
    padding: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemView: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 20,
    marginTop: 5,
  },
  
});

export default Orders;
