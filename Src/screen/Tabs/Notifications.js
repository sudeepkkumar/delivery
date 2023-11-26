import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllOrders = () => {
  const [orders, setOrders] = useState({});
  const [total, settotal] = useState(0);
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    const adminId = await AsyncStorage.getItem('adminId');
    firestore()
      .collection('orders')
      .where('items.adminId', '==', adminId)
      .get()
      .then(querySnapshot => {
        const orderData = querySnapshot.docs.map(doc => {
          return {...doc.data(), id: doc.id};
        });
        setOrders(orderData);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.orderItem}>
              <Text style={styles.nameText}>Order ID: {item.id}</Text>
              <Text style={styles.nameText}>Customer: {item.orderBy}</Text>
              <Text style={styles.nameText}> {item.address}</Text>

              <Text style={styles.nameText}>
                Alternative Mobile: {item.userMobile}
              </Text>
              <Text style={styles.nameText}>Payment ID: {item.paymentId}</Text>

              <View style={styles.itemsDetailsGap} />

              <View style={styles.itemView}>
                <Text style={styles.nameText}>{item.items.name}</Text>
                <Text style={styles.nameText}>
                  {'Price: ' +
                    item.items.discountPrice +
                    ', Qty: ' +
                    item.items.qty}
                </Text>
              </View>

              <Text style={styles.totalText}>
                Amount paid: ₹ {item.orderTotal}
              </Text>
            </View>
          );
        }}
      />

      {/* Adding space at the bottom */}
      {/* <View style={styles.bottomSpace} /> */}
    </View>
  );
};

export default AllOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  bottomSpace: {
    marginBottom: 70, // Adjust the margin to create space at the bottom
  },
  itemsDetailsGap: {
    marginVertical: 10,
  },
  itemDetailsMargin: {
    marginBottom: 5,
  },
});
