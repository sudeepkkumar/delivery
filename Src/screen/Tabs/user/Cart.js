import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Cart = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartList(user._data.cart);
  };

  const addItem = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = user._data.cart;
    tempDart.map(itm => {
      if (itm.id === item.id) {
        itm.data.qty = itm.data.qty + 1;
      }
    });
    await firestore().collection('users').doc(userId).update({ cart: tempDart });
    getCartItems();
  };

  const removeItem = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = user._data.cart;
    tempDart.map(itm => {
      if (itm.id === item.id) {
        itm.data.qty = itm.data.qty - 1;
      }
    });
    await firestore().collection('users').doc(userId).update({ cart: tempDart });
    getCartItems();
  };

  const deleteItem = async index => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = user._data.cart;
    tempDart.splice(index, 1);
    await firestore().collection('users').doc(userId).update({ cart: tempDart });
    getCartItems();
  };

  const getTotal = () => {
    let total = 0;
    cartList.map(item => {
      total = total + item.data.qty * item.data.discountPrice;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartList}
        renderItem={({ item, index }) => {
          const isLastItem = index === cartList.length - 1;
          return (
            <View style={[styles.itemView, isLastItem && styles.lastItemView]}>
              <Image source={{ uri: item.data.imageUrl }} style={styles.itemImage} />
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.descText}>{item.data.description}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>{'₹' + item.data.discountPrice}</Text>
                  <Text style={styles.discountText}>{'₹' + item.data.price}</Text>
                </View>
              </View>
              <View style={styles.addRemoveView}>
                <TouchableOpacity
                  style={[styles.addToCartBtn, { width: 30, justifyContent: 'center', alignItems: 'center', marginRight: 15 }]}
                  onPress={() => {
                    if (item.data.qty > 1) {
                      removeItem(item);
                    } else {
                      deleteItem(index);
                    }
                  }}>
                  <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{item.data.qty}</Text>
                <TouchableOpacity
                  style={[styles.addToCartBtn, { width: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 15 }]}
                  onPress={() => {
                    addItem(item);
                  }}>
                  <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {cartList.length > 0 && (
        <View style={styles.checkoutContainer}>
          <Text style={styles.totalText}>{'Items (' + cartList.length + ') Total: ₹' + getTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Text style={{ color: '#fff' }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
  },
  lastItemView: {
    marginBottom: 80, // Adjust the margin as needed for spacing.
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
    color: 'black',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
    color: 'black',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: 'red',
  },
  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  totalText: {
    color: '#000',
    fontWeight: '600',
  },
  checkoutBtn: {
    width: 100,
    height: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Cart;
