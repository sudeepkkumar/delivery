import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../../Common/Header';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setuserId] = useState('');
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    let userId = await AsyncStorage.getItem('USERID');
    setuserId(userId);
    firestore()
      .collection('orders')
      .where('userId', '==', userId)
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
      <Header title={'All Orders'} />
      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
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
      <View style={styles.bottomSpace} />
    </View>
  );
};

export default AllOrders;

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
  orderIdText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3366FF', // blue color
  },
  paymentIdText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#555', // grayish color
  },
  itemsDetailsGap: {
    marginVertical: 10,
  },
  itemDetailsMargin: {
    marginBottom: 5,
  },
});
