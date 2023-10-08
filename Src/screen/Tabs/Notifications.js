import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Add = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});

export default Add