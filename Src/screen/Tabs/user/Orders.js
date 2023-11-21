import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../../Common/Header';
import { FlatList } from 'react-native-gesture-handler';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    firestore()
      .collection('orders')
      .get()
      .then((querySnapshot) => {
        let tempData = [];
        querySnapshot.forEach((documentSnapshot) => {
          const orderData = documentSnapshot.data().data;
          const orderTotal = calculateOrderTotal(orderData.items);
          tempData.push({
            orderId: documentSnapshot.id,
            data: orderData,
            total: orderTotal,
          });
        });
        setOrders(tempData);
      });
  };

  const calculateOrderTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.discountPrice * item.qty;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <Header title={'All Orders'} />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => {
          return (
            <View style={styles.orderItem}>
              <FlatList
                data={item.data.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.itemView}>

                      <Text style={styles.nameText}>{item.name}</Text>
                      <Text style={styles.nameText}>
                        {'Price: ' +
                          item.discountPrice +
                          ', Qty: ' +
                          item.qty}
                      </Text>
                    </View>
                  );
                }}
              />
              <Text style={styles.totalText}>Amount paid: ₹ {item.total}</Text>
              <View style={styles.itemsDetailsGap} />
              <Text style={styles.paymentIdText}>Order ID: {item.orderId}</Text>
              <Text style={styles.paymentIdText}>Payment ID: {item.data.paymentId}</Text>



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
