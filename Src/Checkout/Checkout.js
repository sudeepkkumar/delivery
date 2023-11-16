import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import RazorpayCheckout from 'react-native-razorpay';
import OrderStatus from './OrderStatus';

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
            if (item.addressId == addressId) {
                const formattedAddress = `\n Address : ${item.street},\n City & State: ${item.city},\n Pincode: ${item.pincode}, \n Mobile: ${item.mobile}`;
                setSelectedAddress(formattedAddress);
            }
        });
    };

    const getTotal = () => {
        let total = 0;
        cartList.map(item => {
            total = total + parseFloat(item.qty * item.discountPrice);
        });
        return total;
    };

    const payNow = async () => {
        const email = await AsyncStorage.getItem('EMAIL');
        const name = await AsyncStorage.getItem('NAME');
        const mobile = await AsyncStorage.getItem('MOBILE');
        var options = {
            description: 'PANDA STUDIO S ',
            image: require('../screen/Tabs/images/add.png'),
            currency: 'INR',
            key: 'rzp_test_YdYwsHYsBLC4fC',
            amount: getTotal() * 100,
            name: 'PANDA STUDIO S',
            order_id: '', // Replace this with an order_id created using Orders API.
            prefill: {
                email: email,
                contact: mobile,
                name: name,
            },
            theme: { color: 'blue' },
        };
        RazorpayCheckout.open(options)
            .then(data => {
                navigation.navigate('OrderStatus', {
                    status: 'success',
                    paymentId: data.razorpay_payment_id,
                    cartList: cartList,
                    total: getTotal(),
                    address: selectedAddress,
                    userId: userId,
                    userName: name,
                    userEmail: email,
                    userMobile: mobile,
                });
            })
            .catch(error => {
                navigation.navigate('OrderStatus', {
                    status: 'failed',
                });
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <FlatList
                    data={cartList}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.itemView}>
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.itemImage}
                                />
                                <View style={styles.nameView}>
                                    <Text style={styles.nameText}>{item.name}</Text>
                                    <Text style={styles.descText}>{item.description}</Text>
                                    <View style={styles.priceView}>
                                        <Text style={styles.priceText}>
                                            {'₹' + item.discountPrice}
                                        </Text>
                                        <Text style={styles.discountText}>
                                            {'₹' + item.price}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.nameText}>{'QTY : ' + item.qty}</Text>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={styles.totalView}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Total :-</Text>
                <Text style={styles.nameText}>{'₹' + getTotal()}</Text>
            </View>
            <View style={styles.changeAddressButtonContainer}>
                <TouchableOpacity
                    style={styles.changeAddressButton}
                    onPress={() => {
                        navigation.navigate('Address');
                    }}
                >
                    <Text style={styles.changeAddressButtonText}>Change Address</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.selectedAddressText}>{selectedAddress}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    disabled={selectedAddress == 'No Selected Address' ? true : false}
                    style={[
                        styles.checkoutBtn,
                        {
                            backgroundColor: selectedAddress == 'No Selected Address' ? '#DADADA' : 'green',
                        },
                    ]}
                    onPress={() => {
                        if (selectedAddress !== 'No Selected Address') {
                            payNow();
                        }
                    }}
                >
                    <Text style={styles.checkoutBtnText}>
                        Pay Now {'₹' + getTotal()}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Checkout;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    changeAddressButtonContainer: {
        alignSelf: 'center',
        marginTop: 10,
    },
    changeAddressButton: {
        backgroundColor: '#2F62D1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    changeAddressButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    selectedAddressText: {
        margin: 15,
        width: '100%',
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 100, 
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutBtn: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutBtnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
