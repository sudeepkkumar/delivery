import {
    View, Text, StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
let userId = '';


const Checkout = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const isFocused = useIsFocused();
    const [selectedAddress, setSelectedAddress] = useState('No Selected Address');
    useEffect(() => {
        getCartItems();
        getAddressList();
    }, [isFocused]);
    const getCartItems = async () => {
        userId = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(userId).get();
        setCartList(user._data.cart);
    };

    const getAddressList = async () => {
        const userId = await AsyncStorage.getItem('USERID');
        const addressId = await AsyncStorage.getItem('ADDRESS');
        const user = await firestore().collection('users').doc(userId).get();
        let tempDart = [];
        tempDart = user._data.address;
        tempDart.map(item => {
            //if (item.addressId == addressId) {
                //setSelectedAddress(
                 //  item.street +
                  //  ',' +
                    //item.city +
                   // ',' +
                   // item.pincode +
                  //  ',' +
                  //  item.mobile,
                //);


                if (item.addressId === addressId) {
                    const formattedAddress = `\n Address : ${item.street},\n City & State: ${item.city},\n Pincode: ${item.pincode}, \n Mobile: ${item.mobile}`;
                    setSelectedAddress(formattedAddress);
                  }

        });

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
            <View>
                <FlatList
                    data={cartList}
                    renderItem={({ item, index }) => {
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
                                <Text style={styles.nameText
                                }>{'QTY : ' + item.data.qty}</Text>

                            </View>
                        );
                    }}
                />
            </View>
            <View style={styles.totalView}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Total :-</Text>
                <Text style={styles.nameText}>
                    {'₹' + getTotal()}</Text>


            </View>
            <View style={styles.totalView}>
                <Text style={styles.nameText}>Selected Address</Text>
                <Text style={styles.editAddress} onPress={() => {
                    navigation.navigate('Address');

                }}> Add New Address</Text>
            </View>
            <Text style={{ margin: 15, width: '100%', color: 'black',
             fontSize: 18, fontWeight: '500', }}>
                {selectedAddress}</Text>
                <TouchableOpacity style={styles.checkoutbtn}>
                    <Text style={{color:'white',
                    fontWeight: 'bold' }}>Pay Now   {'₹' + getTotal()}</Text>

                </TouchableOpacity>

        </View>
    )
}

export default Checkout;
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
    totalView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        height: 50,
        borderTopWidth: 0.3,
        paddingRight: 20,
        marginTop: 20,
        alignItems: 'center',
        borderTopColor: '#8e8e8e',

    },
    editAddress: {
        color: '#2F62D1',
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },

    checkoutbtn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },


});

