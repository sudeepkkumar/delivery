import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useState } from 'react';
import Loader from '../../../Common/Loader';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';//libary for doc id generation or create a unique id

const Usersignup = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobileNo] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const saveUser = () => {
        setModalVisible(true);

        const userId = uuid.v4();//used for docid


        firestore()
            .collection('users')
            .doc(userId) // documentid
            .set({

                name: name,
                email: email,
                password: password,
                mobile: mobile,
                userId: userId, //docid
                cart: [], //empty array for cart



            }).then(res => {
                setModalVisible(false);
                navigation.goBack();

            }).catch(error => {
                setModalVisible(false);
                console.log(error);

            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Your New Account</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Your Name'}
                placeholderTextColor={'black'}
                value={name}
                onChangeText={txt => setName(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Email '}
                placeholderTextColor={'black'}
                value={email}
                onChangeText={txt => setEmail(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Mobile no '}
                keyboardType={'number-pad'}
                placeholderTextColor={'black'}
                value={mobile}
                onChangeText={txt => setMobileNo(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Password '}
                placeholderTextColor={'black'}
                value={password}
                onChangeText={txt => setPassword(txt)}
            />
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                    if (
                        email !== '' &&
                        password !== '' &&
                        name !== '' &&
                        mobile !== '' &&
                        mobile.length > 9
                    ) {
                        saveUser();
                    } else {
                        alert('Please Enter Data');
                    }
                }}>
                <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>
            <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />



        </View>
    );
};

export default Usersignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
        marginTop: 100,
        alignSelf: 'center',
    },
    inputStyle: {
        paddingLeft: 20,
        height: 50,
        alignSelf: 'center',
        marginTop: 30,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '90%',
        color: 'black'

    },
    loginBtn: {
        backgroundColor: 'orange',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
});