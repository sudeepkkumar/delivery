import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../../../Common/Header';
import { FlatList } from 'react-native-gesture-handler';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    firestore()
      .collection('orders')
      .get()
      .then(querySnapshot => {
        console.log('Total orders: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            orderId: documentSnapshot.id,
            data: documentSnapshot.data().data,
          });
        });
        console.log(JSON.stringify(tempData));
        setOrders(tempData);
      });
  };



  return (
    <View style={styles.container}>
      <Header title={'All Orders'} />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}  // Use orderId as the key
        renderItem={({ item }) => {
          console.log('item' + item);
          return (
            <View style={styles.orderItem}>
              <FlatList
                data={item.data.items}
                keyExtractor={(subItem) => subItem.data.id}  // Use a unique identifier from your data as the key
                renderItem={({ item: subItem }) => {
                  return (
                    <View style={styles.itemView}>
                      <Image
                        source={{ uri: subItem.data.imageUrl }}
                        style={styles.itemImage}
                      />
                      <View>
                        <Text style={styles.nameText}>{subItem.data.name}</Text>
                        <Text style={styles.nameText}>
                          {'Price: ' +
                            subItem.data.discountPrice +
                            ', Qty: ' +
                            subItem.data.qty}
                          
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
      {/* Add a View with margin to create a gap */}
      <View style={styles.bottomMargin} />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderItem: {
    width: '90%',
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 10,
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
  bottomMargin: {
    marginBottom: 60, // Adjust the margin to give space to the bottom tab
  },
});
