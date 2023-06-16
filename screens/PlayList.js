/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppContext} from '../contexts/AppContext';
// import MusicList from './MusicList';

const PlayList = ({modalVisible, closeModal}) => {
  const {height} = useAppContext();
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: '100%',
      height: height,
    },
    modalText: {
      fontSize: 23,
      fontWeight: '400',
      textAlign: 'center',
      marginLeft: 30,
      color: 'black',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            <View style={styles.header}>
              <View style={{marginLeft: 10}}>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name="close" size={35} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>Music Playlist</Text>
            </View>

            {/* <MusicList /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlayList;
