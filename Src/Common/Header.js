import { View, Text,StyleSheet,Dimensions, } from 'react-native'
import React from 'react'


const{height,width}=Dimensions.get('window')
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'blue'}}>Home</Text>
    </View>
  )
}

export default Home; 

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: width,
    elevation: 5,
    backgroundColor: '#fff',

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
    },
  });