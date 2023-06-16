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
import {audios, togglePlayBack, useAppContext} from '../contexts/AppContext';
// import songs from '../model/data';
import {useRoute} from '@react-navigation/native';
import PlayList from './PlayList';
import MusicPlayerCard from './MusicPlayerCard';

const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();

  const {position, duration} = progress;

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const route = useRoute();

  const {id} = route.params;

  //   custom states
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackUrl, setTrackUrl] = useState();
  const [trackId, setTrackId] = useState();

  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const {
    songIndex,
    skipToPrevious,
    skipToNext,
    songSlider,
    scrollX,
    width,
    allDevicesAudios,
    returnTheIndex,
    // mediaMetaData,
    // getMediaMetadata,
  } = useAppContext();
  // custom referecnces

  //   changing the track on complete
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist, url, id} = track;
      setTrackId(id);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      setTrackUrl(url);
    }
  });

  const repeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    }

    if (repeatMode === 'track') {
      return 'repeat-once';
    }

    if (repeatMode === 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode === 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const title = trackTitle ? trackTitle : allDevicesAudios[id]?.name;
  const url = trackUrl ? trackUrl : `file://${allDevicesAudios[id]?.path}`;

  const handleShare = async () => {
    const options = {
      message: String(title),
      url: String(url),
      type:
        'audio/mp3' || 'audio/wav' || 'audio/aac' || 'audio/m4a' || 'audio/ogg',
    };
    try {
      const res = await Share.open(options);
      console.log(JSON.stringify(res));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      returnTheIndex(id);
    }
  }, [id]);

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222831',
    },
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomSection: {
      borderTopColor: '#393E46',
      borderBottomColor: '#222831',
      borderWidth: 1,
      width: width,
      alignItems: 'center',
      paddingVertical: 15,
      marginTop: 30,
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

  const renderSongs = ({item}) => {
    return (
      <MusicPlayerCard
        item={item}
        trackArtist={trackArtist}
        trackTitle={trackTitle}
      />
    );
  };

  useEffect(() => {
    Orientation.lockToPortrait(); // Replace 'Portrait' with 'Landscape' if you want to lock to landscape orientation.
  }, []);

  return (
    <View style={style.container}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        {/* music player section */}
        <>
          <View style={style.mainContainer}>
            {/* Image */}

            <Animated.FlatList
              ref={songSlider}
              renderItem={renderSongs}
              data={allDevicesAudios}
              keyExtractor={(item, index) => index}
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

            <View>
              <Slider
                style={style.progressBar}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="#41BCC4"
                minimumTrackTintColor="#41BCC4"
                maximumTrackTintColor="#fff"
                onSlidingComplete={async value => {
                  await TrackPlayer.seekTo(value);
                }}
              />

              {/* Progress Durations */}
              <View style={style.progressLevelDuraiton}>
                <Text style={style.progressLabelText}>
                  {new Date(position * 1000)
                    .toLocaleTimeString('en-US', {hour12: false})
                    .substring(3)}
                </Text>
                <Text style={style.progressLabelText}>
                  {new Date((duration - position) * 1000)
                    .toLocaleTimeString('en-US', {hour12: false})
                    .substring(3)}
                </Text>
              </View>
            </View>

            {/* music control */}
            <View style={style.musicControlsContainer}>
              <TouchableOpacity onPress={skipToPrevious}>
                <Ionicons
                  name="play-skip-back-outline"
                  size={35}
                  color="#41BCC4"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
                <Ionicons
                  name={
                    playBackState === State.Playing
                      ? 'ios-pause-circle'
                      : 'ios-play-circle'
                  }
                  size={75}
                  color="#41BCC4"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNext}>
                <Ionicons
                  name="play-skip-forward-outline"
                  size={35}
                  color="#41BCC4"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* bottom section */}
          <View style={style.bottomSection}>
            <View style={style.bottomIconContainer}>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="heart-outline" size={30} color="#41BCC4" />
              </TouchableOpacity>

              <TouchableOpacity onPress={changeRepeatMode}>
                <MaterialCommunityIcons
                  name={`${repeatIcon()}`}
                  size={30}
                  color={repeatMode !== 'off' ? '#FFD369' : '#41BCC4'}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShare()}>
                <Ionicons name="share-outline" size={30} color="#41BCC4" />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleModal}>
                <MaterialCommunityIcons
                  name={'playlist-music'}
                  size={33}
                  color={'#41BCC4'}
                />
              </TouchableOpacity>
            </View>
            <PlayList modalVisible={false} closeModal={toggleModal} />
          </View>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MusicPlayer;
