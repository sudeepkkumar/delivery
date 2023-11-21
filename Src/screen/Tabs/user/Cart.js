import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Cart = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  const [userId, setuserId] = useState('');

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const getCartItems = async () => {
    let userId = await AsyncStorage.getItem('USERID');
    setuserId(userId);
    const user = await firestore().collection('users').doc(userId).get();
    setCartList(user._data.cart || []);
  };

  const addItem = async (item) => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempCart = user._data.cart || [];
    tempCart.map((itm) => {
      if (itm.id === item.id) {
        itm.qty = itm.qty + 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });
    getCartItems();
  };

  const removeItem = async (item) => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempCart = user._data.cart || [];
    tempCart.map((itm) => {
      if (itm.id === item.id) {
        itm.qty = itm.qty - 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });
    getCartItems();
  };

  const deleteItem = async (index) => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempCart = user._data.cart || [];
    tempCart.splice(index, 1);
    firestore().collection('users').doc(userId).update({
      cart: tempCart,
    });
    getCartItems();
  };

  const getTotal = () => {
    let total = 0;
    if (cartList && cartList.length > 0) {
      cartList.forEach((item) => {
        const itemDiscountPrice = item.discountPrice || 0;
        const itemQty = item.qty || 0;
        total += parseFloat(itemDiscountPrice * itemQty);
      });
    }
    return total;
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={cartList}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemView}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.descText}>{item.description}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {'₹' + (item.discountPrice || 0)}
                  </Text>
                  <Text style={styles.discountText}>
                    {'₹' + (item.price || 0)}
                  </Text>
                </View>
              </View>

              <View style={styles.addRemoveView}>
                <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 15,
                    },
                  ]}
                  onPress={() => {
                    if (item.qty > 1) {
                      removeItem(item);
                    } else {
                      deleteItem(index);
                    }
                  }}>
                  <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
                  {item.qty}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 15,
                    },
                  ]}
                  onPress={() => {
                    addItem(item);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      {cartList && cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <Text style={{ color: '#000', fontWeight: '600' }}>
            {'Items(' + cartList.length + ') Total: ₹' + getTotal()}
          </Text>
          <TouchableOpacity
            style={[
              styles.addToCartBtn,
              {
                width: 100,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
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
  flatList: {
    marginBottom: 60,
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
  checkoutView: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Cart;
