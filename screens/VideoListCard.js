/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MediaMeta from 'react-native-media-meta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationStrings from '../navigations/navigationStrings';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;

const VideoListCard = ({item, index, navigation}) => {
  // const navigation = useNavigation();
  const [mediaMetadata, setMediaMetadata] = useState(null);

  let mediaMetadataName = '';
  let mediaMetadataThumbnail = '';
  let mediaMetadataDuration = '';

  const getMediaMetadata = async path => {
    try {
      const metadata = await MediaMeta.get(path);

      mediaMetadataName = metadata.title;

      mediaMetadataThumbnail = metadata.thumb;

      mediaMetadataDuration = metadata.duration;
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
    return {mediaMetadataThumbnail, mediaMetadataName, mediaMetadataDuration};
  };

  const handleVideoPress = () => {
    navigation.navigate(navigationStrings.VIDEO_DETAIL, {id: index});
  };

  const title = mediaMetadata?.mediaMetadataName || 'Unknown';
  const duration = parseInt(mediaMetadata?.mediaMetadataDuration) || 0;
  const thumb = mediaMetadata?.mediaMetadataThumbnail || '';

  const seconds = parseInt((duration / 1000) % 60);
  const minutes = parseInt((duration / (1000 * 60)) % 60);
  const hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  useEffect(() => {
    const fetchMediaMetadata = async () => {
      const metadata = await getMediaMetadata(item.path);
      setMediaMetadata(metadata);
    };

    fetchMediaMetadata();
  }, [item.path]);

  return (
    <>
      {thumb && (
        <TouchableOpacity
          onPress={handleVideoPress}
          style={styles.itemContainer}>
          {thumb ? (
            <Image
              source={{uri: `data:image/png;base64,${thumb}`}}
              style={styles.thumbnail}
            />
          ) : (
            <View style={styles.thumbnail}>
              <Ionicons name="logo-youtube" size={70} color="#41BCC4" />
            </View>
          )}
          <View style={styles.card_body}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1}>{formattedDuration}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default VideoListCard;

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
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    marginTop: 5,
    // textAlign: 'left',
    fontSize: 17,
  },
  // duration: {textAlign: 'left'},
  card_body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
