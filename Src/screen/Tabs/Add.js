import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
//import { color } from 'native-base/lib/typescript/theme/styled-system';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Add = () => {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  //camera permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery()
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //camera permission
  //open gallerys
  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };
  //upload image
  const uplaodImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    uploadItem(url);
  };
  //upload item
  const uploadItem = url => {
    firestore()
      .collection('items')
      .add({
        name: name,
        price: price,
        description: description,
        discountPrice: discountPrice,

        imageUrl: url + '',
      })
      .then(() => {
        console.log('User added!');


      });
  };






  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Item</Text>

        </View>

        {imageData !== null ? (
          <Image source={{ uri: imageData.assets[0].uri }} style={styles.imagestyles} />
        ) : null}


        <TextInput
          placeholder="Enter Item Name"
          placeholderTextColor="black"
          style={styles.inputstyle} value={name}
          onChangeText={text => setName(text)}

        />
        <TextInput placeholder="Enter Item Price"
          placeholderTextColor="black"
          style={styles.inputstyle} value={price}
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Enter Item  Description"
          placeholderTextColor="black"
          style={styles.inputstyle} value={description}
          onChangeText={text => setDescription(text)}
        />
        <TextInput placeholder="Enter Item Discount"
          placeholderTextColor="black"
          style={styles.inputstyle} value={discountPrice}
          onChangeText={text => setDiscountPrice(text)}
        />
        <TextInput placeholder="Enter Item Image URL"
          placeholderTextColor="black"
          style={styles.inputstyle} value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <Text style={{
          alignSelf: 'center',
          marginTop: 20, color: 'black'
        }}>OR</Text>
        <TouchableOpacity
          style={styles.pickbtn} onPress={() => {
            requestCameraPermission();

          }

          }>

          <Text style={{ color: "white" }}>
            Pick Image Form Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadbtn} onPress={() => {
            uplaodImage();
          }}>


          <Text style={{ color: "white" }}>UPLOAD ITEM</Text>
          
        </TouchableOpacity>
      </View >
    </ScrollView>
  );
};



export default Add;
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  header: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',


  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',


  },
  inputstyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    color: 'black',
    alignSelf: 'center',




  },
  pickbtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'black',

  },
  uploadbtn: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 70,







  },
  imagestyles: {
    width: '90%',
    height: 200, borderRadius: 10,
    alignSelf: 'center', marginTop: 20,
  },



});
