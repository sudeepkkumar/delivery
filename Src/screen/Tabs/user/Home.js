import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
//import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.bottomTabView}>
                <TouchableOpacity style={styles.bottomTab}>
                    <Image 
                    source={require('../images/edit.png')} 
                    style={styles.bottomIcon} />


                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab}>
                    <Image source=
                    {require('../images/edit.png')} 
                    style={styles.bottomIcon} />


                </TouchableOpacity>


            </View>
        </View>
    )
}

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomTabView: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 5,
        position: 'absolute',
        bottom: 0,
    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',


    },
    bottomIcon: {
        width: '24%',
        height: '24%',
        // justifyContent: 'center',
        //alignItems:'center',



    },

});