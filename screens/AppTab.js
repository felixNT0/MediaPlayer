/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MusicList from './MusicList';
import VideoList from './VideoList';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLoader from './AppLoader';
import {useAppContext} from '../contexts/AppContext';

const TabBar = () => {
  const navigation = useNavigation();

  const {width} = useAppContext();

  const [tabIndex, setTabIndex] = useState(0);

  const [loader, setLoader] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;

  const songSlider = useRef(null);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (tabIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (tabIndex - 1) * width,
    });
  };

  const onPress = id => {
    if (id === 0) {
      skipToPrevious();
    }
    if (id === 1) {
      skipToNext();
    }
  };

  useEffect(() => {
    scrollX.addListener(({value}) => {
      //   console.log(`ScrollX : ${value} | Device Width : ${width} `);

      const index = Math.round(value / width);

      setTabIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
      // TrackPlayer?.destroy();
    };
  }, [tabIndex, scrollX, width]);

  useEffect(() => {
    Orientation.lockToPortrait(); // Replace 'Portrait' with 'Landscape' if you want to lock to landscape orientation.

    // return () => {
    //   Orientation.unlockAllOrientations();
    // };
  }, [loader]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [loader]);

  const Tabs = [
    {
      id: 0,
      name: 'Music',
      icon_name: 'musical-notes-outline',
      Component: <MusicList navigation={navigation} />,
    },
    {
      id: 1,
      name: 'Video',
      icon_name: 'videocam-outline',
      Component: <VideoList navigation={navigation} />,
    },
  ];

  const renderSongs = ({item, index}) => {
    return (
      <Animated.View
        key={index}
        style={{
          width: width,
        }}>
        {item.Component}
      </Animated.View>
    );
  };

  if (loader) return <AppLoader />;

  return (
    <View style={{backgroundColor: '#222831', flex: 1}}>
      <Animated.View style={{flexDirection: 'row'}}>
        {Tabs.map((tab, index) => (
          <View key={tab.id} style={styles.tab}>
            <TouchableOpacity
              onPress={() => onPress(tab.id)}
              style={{flexDirection: 'row', gap: 15}}>
              <Ionicons
                name={tab.icon_name}
                size={20}
                style={{
                  color: tab.id === tabIndex ? '#41BCC4' : '#FFFFFF',
                  marginTop: 5,
                }}
              />
              <Text
                style={{
                  color: tab.id === tabIndex ? '#41BCC4' : '#FFFFFF',
                  marginTop: 5,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#41BCC4',
          marginHorizontal: 5,
        }}
      />
      <Animated.FlatList
        ref={songSlider}
        renderItem={renderSongs}
        data={Tabs}
        keyExtractor={(item, index) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,
    padding: 20,
  },
  activeTab: {
    color: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default TabBar;
