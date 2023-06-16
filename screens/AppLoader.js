/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';

const {width, height} = Dimensions.get('window');

const AppLoader = () => {
  useEffect(() => {
    Orientation.lockToPortrait(); // Replace 'Portrait' with 'Landscape' if you want to lock to landscape orientation.
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#222831',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        width: width,
      }}>
      <Image
        source={require('../assets/logo.png')}
        style={{width: 100, height: 100}}
      />
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>Media Player</Text>
    </View>
  );
};

export default AppLoader;
