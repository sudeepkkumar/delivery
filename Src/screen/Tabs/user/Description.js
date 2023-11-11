import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

let userId = ''; // Make sure to set the userId somewhere in your code

const DescriptionPage = () => {
  const route = useRoute();
  const { data } = route.params;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigation = useNavigation();

  const onAddToCart = async () => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = user._data.cart ? [...user._data.cart] : [];

    let existing = false;
    tempDart.forEach((itm) => {
      if (itm.id === data.id) {
        existing = true;
        itm.data.qty = itm.data.qty + 1;
      }
    });

    if (!existing) {
      tempDart.push({ id: data.id, data: { ...data, qty: 1 } });
    }

    await firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });

    setIsAddedToCart(true);
  };

  const navigateToCart = () => {
    // Navigate to the Cart screen
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.imageUrl }} style={styles.itemImage} />
      <Text style={[styles.nameText, { color: 'black', fontSize: 24 }]}>{data.name}</Text>
      <Text style={styles.descText}>{data.description}</Text>
      <Text style={styles.discountText}>M R P ₹{data.price}</Text>
      <Text style={styles.priceText}>Price: ₹{data.discountPrice}</Text>

      <TouchableOpacity
        style={[styles.addToCartButton, isAddedToCart && { backgroundColor: 'gray' }]}
        onPress={onAddToCart}>
        <Text style={styles.addToCartButtonText}>{isAddedToCart ? 'View Cart' : 'Add to Cart'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginBottom: 10,
  },
  descText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'green',
    marginBottom: 10,
  },
  discountText: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    color: 'red',
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DescriptionPage;
