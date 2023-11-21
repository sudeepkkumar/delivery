import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
            // Add more details here, e.g., customer info, order date, status, etc.
            customer: orderData.customer, // Assuming customer info is present in orderData
            orderDate: orderData.orderDate, // Assuming order date is present in orderData
            status: orderData.status, // Assuming status is present in orderData
            // ... Add other relevant details
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
      <Text style={styles.title}>All Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => {
          return (
            <View style={styles.orderItem}>
              {/* Display additional order details */}
              <Text style={styles.nameText}>Order ID: {item.orderId}</Text>
              <Text style={styles.nameText}>Customer: {item.data.orderBy}</Text>
              <Text style={styles.nameText}> {item.data.address}</Text>
              
              <Text style={styles.nameText}>Alternative Mobile: {item.data.userMobile}</Text>
              <Text style={styles.nameText}>Payment ID: {item.data.paymentId}</Text>

              
              <View style={styles.itemsDetailsGap} />
              
              {/* Display order items */}
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
              {/* Display total amount */}
              <Text style={styles.totalText}>Amount paid: ₹ {item.total}</Text>
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
