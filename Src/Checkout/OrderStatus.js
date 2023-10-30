import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderStatus = ({ navigation }) => {
  const route = useRoute();
  useEffect(() => {
    if (route.params.status == 'success') {
      placeOrder();
    }
  }, []);
  const placeOrder = async () => {
    let tempOrders = ({
      items: route.params.cartList,
      address: route.params.address,
      orderBy: route.params.userName,
      userEmail: route.params.userEmail,
      userMobile: route.params.userMobile,
      userId: route.params.userId,
      orderTotal: route.params.total,
    });


    firestore().collection('users')
      .doc(route.params.userId).update({
        cart: [],
        orders: tempOrders,
      });
    firestore()
      .collection('orders')
      .add({
        data: {
          items: route.params.cartList,
          address: route.params.address,
          orderBy: route.params.userName,
          userEmail: route.params.userEmail,
          userMobile: route.params.userMobile,
          userId: route.params.userId,
          orderTotal: route.params.total,
          paymentId: route.params.paymentId,
        },
        orderBy: route.params.userId,
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={
          route.params.status == 'success'
            ? require('../screen/Tabs/images/sucess.gif')
            : require('../screen/Tabs/images/failed.gif')
        }
        style={styles.icon}
      />
      <Text style={styles.msg}>
        {route.params.status == 'success'
          ? 'Order Placed Successfully !!'
          : 'Order Failed !!'}
      </Text>
      <TouchableOpacity
        style={styles.backToHome}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.homeText}>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderStatus;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '70%',
    height: '40%',
    alignSelf: 'center',
  },
  msg: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: -20,
  },
  backToHome: {
    width: '50%',
    height: 30,
    borderWidth: 0.5,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,

  },
  homeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});