/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MediaMeta from 'react-native-media-meta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationStrings from '../navigations/navigationStrings';

const MusicListCard = ({item, id, navigation}) => {
  // const navigation = useNavigation();
  const [mediaMetadata, setMediaMetadata] = useState(null);

  let mediaMetadataName = '';
  let mediaMetadataThumbnail = '';
  let mediaMetadataArtist = '';
  // let mediaMetadataDuration = '';

  const getMediaMetadata = async path => {
    try {
      const metadata = await MediaMeta.get(path);
      // const {thumb, ...rest} = metadata;

      mediaMetadataName = metadata.title;

      mediaMetadataThumbnail = metadata.thumb;

      mediaMetadataArtist = metadata.artist;
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
    return {mediaMetadataThumbnail, mediaMetadataName, mediaMetadataArtist};
  };

  const handleVideoPress = () => {
    navigation.navigate(navigationStrings.AUDIO_DETAIL, {id: id});
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
  }, [item.path]);
  return (
    <TouchableOpacity onPress={handleVideoPress}>
      <View style={styles.musicItem}>
        {uri ? (
          <Image
            source={{uri: `data:image/png;base64,${uri}`}}
            style={styles.image}
          />
        ) : (
          <View style={styles.image}>
            <Ionicons name="musical-note-outline" size={30} color="#41BCC4" />
          </View>
        )}
        <View style={styles.musicInfo}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {artist}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MusicListCard;

const styles = StyleSheet.create({
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 30,
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicInfo: {
    flex: 1,
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
});
