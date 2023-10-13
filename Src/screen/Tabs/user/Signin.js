import { View, Text, TouchableOpacity,navigation, } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Container } from 'native-base'

const Signin = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <Text style={styles.title} >Select Login Type</Text>


      <TouchableOpacity style={styles.buton}>
        <Text style={styles.btnstyle} onPress={()=>{
          navigation.navigate('Login');
        }}>Admin Login</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.buton}>
        <Text style={styles.btnstyle} onPress={()=>{
          navigation.navigate('Userlogin');
        }}>User Login</Text>
        

      </TouchableOpacity>

    </View>
  );
};

export default Signin
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    


  },

  buton: {
    backgroundColor: 'gold',
    height: 50,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,




  },
  btnstyle:{

    fontSize: 20,
    fontWeight: '900',
    color: 'white',
  

  }
});