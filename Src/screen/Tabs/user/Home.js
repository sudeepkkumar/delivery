import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import React, { useState,useEffect } from 'react';
import Main from './Main';
import Search from './Search';
import Wishlist from './Wishlist';
import Orders from './Orders';
import Profile from './Profile/Profile';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderScreen = () => {
    switch (selectedTab) {
      case 0:
        return <Main />;
      case 1:
        return <Search />;
      case 2:
        return <Wishlist />;
      case 3:
        return <Orders />;
      case 4:
        return <Profile />;
      default:
        return null;
    }
  };

  // const Navigation = useNavigation();
  // useEffect(() => {
  //   const unsuscribe = Navigation.addListener('beforeRemove', e => {
  //     e.preventDefault();
  //     BackHandler.exitApp();
  //   });
  //   return unsuscribe;
  // }, [Navigation]);


  return (
    <View style={styles.container}>
      {renderScreen()}
      <View style={styles.bottomTabView}>
        <BottomTabIcon
          iconSource={
            selectedTab == 0
            ? require('../images/home_fill.png')
            : require('../images/home.png')
          }
          onPress={() => setSelectedTab(0)}
        />
        <BottomTabIcon
          iconSource={
            selectedTab == 1
            ? require('../images/search.png')
            : require('../images/loupe.png')
          }
          onPress={() => setSelectedTab(1)}
        />
        <BottomTabIcon
          iconSource={
            selectedTab == 2
            ? require('../images/shop.png')
            : require('../images/wishlist.png')
          }
          onPress={() => setSelectedTab(2)}
        />
        <BottomTabIcon
          iconSource={
            selectedTab == 3
            ? require('../images/cart.png')
            : require('../images/checkout.png')
          }
          onPress={() => setSelectedTab(3)}
        />
        <BottomTabIcon
          iconSource={
            selectedTab == 4
            ? require('../images/profilefill.png')
            : require('../images/user.png')
          }
          onPress={() => setSelectedTab(4)}
        />
      </View>
    </View>
  );
};

const BottomTabIcon = ({ iconSource, onPress }) => (
  <TouchableOpacity style={styles.bottomTab} onPress={onPress}>
    <Image source={iconSource} style={styles.bottomIcon} />
  </TouchableOpacity>
);

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
    width: 24,
    height: 24,
  },
});
