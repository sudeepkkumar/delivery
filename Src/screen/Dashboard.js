import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Add from './Tabs/Add';
import Items from './Tabs/Items';
import Notifications from './Tabs/Notifications';
import Orders from './Tabs/Orders';
import Transaction from './Tabs/Transaction';






const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Transaction />
      ) : selectedTab == 2 ? (
        <Add />
      ) : selectedTab == 3 ? (
        <Notifications />
      ) : (
        < Orders />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('./Tabs/images/supplies.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 0 ? 'blue' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('./Tabs/images/search.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 1 ? 'blue' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('./Tabs/images/add.png')}
            style={[
              styles.bottomTabImg,
              {
                width: 35,
                height: 35,
                tintColor: selectedTab == 2 ? 'blue' : 'black',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('./Tabs/images/approved.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 3 ? 'blue' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={require('./Tabs/images/user.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 4 ? 'blue' : 'black'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
  bottomTab: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabImg: {
    width: 24,
    height: 24,
  },
});