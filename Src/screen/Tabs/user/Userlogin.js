import {
    View, Text, StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Common/Loader';
const Userlogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const adminLogin = async () => {
        setModalVisible(true);
    
        try {
            const querySnapshot = await firestore()
                .collection('users')
                .where('email', '==', email)
                .get();
    
            setModalVisible(false);
    
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
    
                if (userData.password === password) {
                    goToNextScreen(
                        userData.userId,
                        userData.mobile,
                        userData.name
                    );
                } else {
                    alert('Incorrect Password');
                }
            } else {
                alert('User not found');
            }
        } catch (error) {
            setModalVisible(false);
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };
    const goToNextScreen = async (userId, mobile, name) => {
        await AsyncStorage.setItem('EMAIL', email);
        await AsyncStorage.setItem('USERID', userId);
        await AsyncStorage.setItem('MOBILE', mobile);
        await AsyncStorage.setItem('NAME', name);
        navigation.navigate('Home');

        
    };






    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Login</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Email Id'}
                placeholderTextColor={'black'}
                value={email}
                onChangeText={txt => setEmail(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Password '}
                placeholderTextColor={'black'}
                value={password}
                secureTextEntry={true}
                onChangeText={txt => setPassword(txt)}
            />
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                    if (email !== '' && password !== '') {
                        adminLogin();
                    } else {
                        alert('Please Enter Data');
                    }
                }}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.Register}
                onPress={() => {
                    navigation.navigate('Usersignup')

                }}
            >Create New Acccount</Text>
            <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    );
};



export default Userlogin;

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
    Register: {
        fontSize: 18,
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: '#2F4F4F',
        alignSelf: 'center',
        marginTop: 40,

    },
});