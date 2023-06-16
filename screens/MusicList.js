import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MusicListCard from './MusicListCard';
import {useAppContext} from '../contexts/AppContext';

const MusicList = ({navigation}) => {
  const {allDevicesAudios, height} = useAppContext();

  useEffect(() => {
    Orientation.lockToPortrait(); // Replace 'Portrait' with 'Landscape' if you want to lock to landscape orientation.
  }, []);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: '#222831',
      paddingBottom: 100,
    },
  });

  const renderSongs = ({item, index}) => {
    return <MusicListCard item={item} id={index} navigation={navigation} />;
  };

  return (
    <>
      <FlatList
        data={allDevicesAudios}
        renderItem={renderSongs}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

export default MusicList;
