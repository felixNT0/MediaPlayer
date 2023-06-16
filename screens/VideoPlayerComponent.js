/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  Animated,
} from 'react-native';
import MediaMeta from 'react-native-media-meta';
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from 'react-native-video-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import VideoPlayer from 'react-native-video';

import {useAppContext} from '../contexts/AppContext';

const VideoPlayerComponent = () => {
  const {allDevicesVideos, width, height} = useAppContext();

  const route = useRoute();

  const {id} = route.params;

  const [mediaMetadata, setMediaMetadata] = useState(null);

  const [showTopText, setShowTopText] = useState(false);

  const [showControls, setShowControls] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const doubleTapDelay = 300; // Time in milliseconds to detect double tap
  let lastTap = null;

  const handleDoubleTap = callback => {
    const now = Date.now();
    if (lastTap && now - lastTap < doubleTapDelay) {
      callback();
    } else {
      lastTap = now;
    }
  };

  let videoPlayerRef = null;

  const [isHiddenRight, setIsHiddenRight] = useState(false);
  const [isHiddenLeft, setIsHiddenLeft] = useState(false);

  const skipBackward = () => {
    if (videoPlayerRef && currentTime) {
      const previousTime = Math.max(currentTime - 10, 0);
      videoPlayerRef?.seek(previousTime);
      setIsHiddenLeft(!isHiddenLeft);
    }
  };

  const skipForward = () => {
    if (videoPlayerRef && currentTime) {
      const nextTime = currentTime + 10;
      videoPlayerRef?.seek(nextTime);
      setIsHiddenRight(!isHiddenRight);
    }
  };

  const onPlayerError = ref => {
    videoPlayerRef = ref;
  };

  let mediaMetadataName = '';
  let mediaMetadataThumbnail = '';
  let mediaMetadataArtist = '';

  const getMediaMetadata = async path => {
    try {
      const metadata = await MediaMeta.get(path);

      mediaMetadataName = metadata.title;

      mediaMetadataThumbnail = metadata.thumb;

      mediaMetadataArtist = metadata.artist;
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
    return {mediaMetadataThumbnail, mediaMetadataName, mediaMetadataArtist};
  };

  const title =
    mediaMetadata?.mediaMetadataName || allDevicesVideos[id]?.name || '';
  const thumbnail = mediaMetadata?.mediaMetadataThumbnail || '';

  const handleTap = () => {
    setShowTopText(!showTopText);
    setTimeout(() => {
      setShowTopText(false);
    }, 5000); // Hide the top text after 2 seconds
  };

  const toggleControl = () => {
    setShowControls(!showControls);
  };

  useEffect(() => {
    const fetchMediaMetadata = async () => {
      const metadata = await getMediaMetadata(allDevicesVideos[id]?.path);
      setMediaMetadata(metadata);
    };

    fetchMediaMetadata();
  }, [id]);

  useEffect(() => {
    Orientation.unlockAllOrientations();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsHiddenLeft(false);
      setIsHiddenRight(false);
    }, 1000);
  }, [isHiddenLeft, isHiddenRight]);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: width >= 500 ? 23 : 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      paddingVertical: 10,
      zIndex: 99,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
      color: 'white',
    },
    artist: {
      fontSize: 14,
      color: '#D3D3D3',
    },
    leftButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: width >= 500 ? 50 : 100,
      left: 10,
      width: '20%',
      height: '80%',
      opacity: !isHiddenLeft ? 0 : 1,
    },
    rightButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: width >= 500 ? 50 : 100,
      right: 10,
      width: '20%',
      height: '80%',
      opacity: !isHiddenLeft ? 0 : 1,
    },
  });

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: '#222831',
          height: height,
          marginTop: width >= 500 ? -31 : 0,
          paddingTop: width >= 500 ? 0 : 60,
        }}>
        {showTopText && (
          <View style={styles.container}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            {/* <Text numberOfLines={1} style={styles.artist}>
              {artist}
            </Text> */}
          </View>
        )}

        <VideoPlayer
          video={{
            uri: `file://${allDevicesVideos[id]?.path}`,
            type:
              'mkv' ||
              'mp4' ||
              'ogg' ||
              'avi' ||
              'mov' ||
              'mpg' ||
              'mpeg' ||
              'm4v' ||
              '3gp' ||
              'flv' ||
              'wmv',
          }}
          // playInBackground={true}
          ref={ref => onPlayerError(ref)}
          pauseOnPress={showControls}
          onShowControls={() => {
            handleDoubleTap(handleTap);
            handleDoubleTap(toggleControl);
          }}
          onProgress={({currentTime}) => setCurrentTime(currentTime)}
          disableSeek={false}
          showDuration={true}
          controlsTimeout={5000}
          autoplay={true}
          thumbnail={{uri: `data:image/png;base64,${thumbnail}`}}
          endThumbnail={{uri: `data:image/png;base64,${thumbnail}`}}
          fullScreenOnLongPress={width >= 500 ? true : false}
          customStyles={{
            wrapper: {marginTop: width >= 500 ? -25 : 230},
            controls: {
              position: 'absolute',
              width: width,
              bottom: width >= 500 ? 60 : -290,
              backgroundColor: 'transparent',
            },
            seekBarBackground: {backgroundColor: '#FFFFFF'},
            seekBarProgress: {backgroundColor: '#0898A0'},
            seekBarKnob: {backgroundColor: '#0898A0'},
            playIcon: {color: '#0898A0'},
            videoPlayer: {
              seekLine: {
                height: 0,
                backgroundColor: 'transparent',
                display: 'none',
              },
            },
          }}
        />

        <TouchableOpacity
          onPress={() => handleDoubleTap(skipBackward)}
          style={styles.leftButton}
          activeOpacity={0.8}>
          <View
            style={{
              padding: 15,
              borderRadius: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <Ionicons name="play-back-outline" color={'#0898A0'} size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDoubleTap(skipForward)}
          style={styles.rightButton}
          activeOpacity={0.8}>
          <View
            style={{
              padding: 15,
              borderRadius: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <Ionicons name="play-forward-outline" color={'#0898A0'} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoPlayerComponent;
