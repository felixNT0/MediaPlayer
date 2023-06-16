/* eslint-disable react-native/no-inline-styles */
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import VideoListCard from './VideoListCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import MusicListCard from './MusicListCard';
import {useAppContext} from '../contexts/AppContext';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;

const VideoList = ({navigation}) => {
  const {allDevicesVideos} = useAppContext();

  useEffect(() => {
    Orientation.lockToPortrait(); // Replace 'Portrait' with 'Landscape' if you want to lock to landscape orientation.
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({item, index}) => {
          return (
            <VideoListCard item={item} index={index} navigation={navigation} />
          );
        }}
        data={allDevicesVideos}
        keyExtractor={(item, index) => index}
        numColumns={numColumns}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />
      {/* <BottomNavigationBar /> */}
    </View>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#222831',
    elevation: 5,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    width: itemWidth,
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    backgroundColor: '#D3D3D3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    marginTop: 5,
    textAlign: 'center',
  },
});
