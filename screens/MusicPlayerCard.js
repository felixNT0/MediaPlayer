/* eslint-disable react-hooks/exhaustive-deps */
import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Share from 'react-native-share';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MediaMeta from 'react-native-media-meta';

const {width} = Dimensions.get('window');

const MusicPlayerCard = ({item, trackArtist, trackTitle}) => {
  const [mediaMetadata, setMediaMetadata] = useState(null);

  let mediaMetadataName = '';
  let mediaMetadataThumbnail = '';
  let mediaMetadataArtist = '';
  // let mediaMetadataDuration = '';

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

  const title = mediaMetadata?.mediaMetadataName || 'Unknown';
  const artist = mediaMetadata?.mediaMetadataArtist || 'Unknown artist';
  const uri = mediaMetadata?.mediaMetadataThumbnail || '';

  const fetchMediaMetadata = async () => {
    const metadata = await getMediaMetadata(item.path);
    setMediaMetadata(metadata);
  };

  useEffect(() => {
    fetchMediaMetadata();
  }, [item.path, trackTitle, trackArtist]);

  return (
    <Animated.View style={style.mainWrapper}>
      <View style={[style.imageWrapper, style.elevation]}>
        {uri ? (
          <Image
            source={{uri: `data:image/png;base64,${uri}`}}
            style={style.musicImage}
          />
        ) : (
          <View style={style.musicImage}>
            <MaterialCommunityIcons
              name="headphones"
              size={100}
              color="#41BCC4"
            />
          </View>
        )}
        <View style={style.songContent}>
          <Text numberOfLines={1} style={style.songTitle}>
            {title || trackTitle}
          </Text>
          <Text numberOfLines={1} style={style.songArtist}>
            {artist || trackArtist}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default MusicPlayerCard;

const style = StyleSheet.create({
  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 50,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
    alignItems: 'center',
  },
  songTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 7,
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});
