// Main.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../../../Common/Header';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

let userId = '';

const Main = () => {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getItems();
    getCartItems();
  }, [isFocused]);

  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then((querySnapshot) => {
        let tempData = [];
        querySnapshot.forEach((documentSnapshot) => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
        setFilteredItems(tempData);
      });
  };

  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data.cart.length);
  };

  const onAddToCart = async (item, index) => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      let existing = false;
      tempDart.map((itm) => {
        if (itm.id === item.id) {
          existing = true;
          itm.data.qty = itm.data.qty + 1;
        }
      });
      if (!existing) {
        tempDart.push(item);
      }
      firestore().collection('users').doc(userId).update({
        cart: tempDart,
      });
    } else {
      tempDart.push(item);
    }
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = items.filter((item) =>
      item.data.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Application name'}
        icon={require('../images/add.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search items"
        onChangeText={handleSearch}
        value={search}
      />
      <FlatList
        data={filteredItems}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemView}>
              <Image
                source={{ uri: item.data.imageUrl }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
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
        style={styles.flatList}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 120,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  itemInfo: {
    width: '30%',
    margin: 10,
  },
  flatList: {
    marginBottom: 60, // Adjust the margin to give space to the bottom tab
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
    color: 'grey',
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

export default Main;
