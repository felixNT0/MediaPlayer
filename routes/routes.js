/* eslint-disable no-unused-vars */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import navigationStrings from '../navigations/navigationStrings';
import MusicList from '../screens/MusicList';
import MusicPlayer from '../screens/MusicPlayer';
import VideoList from '../screens/VideoList';
import VideoPlayerComponent from '../screens/VideoPlayerComponent';
import TabBar from '../screens/AppTab';

const Stack = createNativeStackNavigator();

export default function AppTabBarRoutes() {
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );
  useEffect(() => {
    const onChange = ({window}) => {
      setScreenDimensions(window);
    };

    Dimensions?.addEventListener('change', onChange);
  }, [screenDimensions]);

  const {width} = screenDimensions;
  return (
    <Stack.Navigator
      initialRouteName={navigationStrings.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={TabBar} name={navigationStrings.HOME} />
      <Stack.Screen
        component={MusicPlayer}
        name={navigationStrings.AUDIO_DETAIL}
      />
      <Stack.Screen
        component={VideoPlayerComponent}
        name={navigationStrings.VIDEO_DETAIL}
      />
    </Stack.Navigator>
  );
}
