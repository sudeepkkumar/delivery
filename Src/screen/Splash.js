import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react';


const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Signin')//next page to load //Signin
        }, 3000);
    }, []);

    const checkLogin = async () => {
        const email = await AsyncStorage.getItem('EMAIL');
        console.log(email);
        if (email !== null) {
            navigation.navigate('Home');
        } else {
            navigation.navigate('Signin');
        }
    };

    return (
        <View style={styles.container} >
            <Text style={styles.logo}>Delivery </Text>

            <View style={styles.brandContainer}>
        <Text style={styles.brandText}>PANDA STUDOS </Text>
      </View>
        </View >
    )
}

export default Splash;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 30,
        fontWeight: '800',
        color: 'blue',
    },

    brandContainer: {
        position: 'absolute', // Position the brand name at the bottom
        bottom: 5, // Place it at the bottom of the screen
        left: 0, // Align it to the left
        right: 0, // Align it to the right
        backgroundColor: 'black', // Add a semi-transparent background
        paddingVertical: 10, // Add padding top and bottom
        alignItems: 'center', // Center the text horizontally
      },
      brandText: {
        color: 'white', // Set the text color
        fontSize: 16, // Adjust the font size
        fontWeight: 'bold', // Apply font weight if desired
        // Add other styles for the brand name text here
      },



});