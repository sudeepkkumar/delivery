import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import Header from '../../../Common/Header';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
//import Cart from '../user/Cart';
let userId = '';
const Main = () => {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);
  useEffect(() => {
    getCartItems();
  }, [isFocused]);
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data.cart.length);//issue
  };
  const onAddToCart = async (item, index) => {
    const user = await firestore().collection('users').doc(userId).get();
    console.log(user._data.cart);
    let tempCart = user._data.cart;
  
    // Find the item in the cart by its ID
    const existingItem = tempCart.find((itm) => itm.id === item.id);
  
    if (existingItem) {
      // If the item is already in the cart, increment its qty property
      existingItem.data.qty = (existingItem.data.qty || 0) + 1;
    } else {
      // If the item is not in the cart, add it with qty 1
      tempCart.push({
        id: item.id,
        data: {
          ...item.data,
          qty: 1,
        },
      });
    }
  
    // Update the user's cart in Firestore
    await firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });
  
    getCartItems();
  };
  return (
    <View style={styles.container}>
      <Header
        title={'name of your application'}
        icon={require('../images/add.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <FlatList
        data={items}
        renderItem={({item,index}) => {
          return (
            <View style={styles.itemView}>
              <Image
                source={{ uri: item.data.imageUrl }}
                style={styles.itemImage}
              />
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.descText}>{item.data.description}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {'₹' + item.data.discountPrice}
                  </Text>
                  <Text style={styles.discountText}>
                    {'₹' + item.data.price}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={() => {
                  onAddToCart(item, index);
                }}>
                <Text style={{ color: '#fff' }}>Add To cart</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Main;
const styles = StyleSheet.create({
  container: { flex: 1 },
  padding: 16,

  itemView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 0,
    alignItems: 'center',
    padding: 16,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '30%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',

  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: 'red',
  },
  addToCartBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
});