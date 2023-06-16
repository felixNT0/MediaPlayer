/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Animated, Dimensions, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

import TrackPlayer, {Capability, State} from 'react-native-track-player';

export const togglePlayBack = async playerBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    if (playerBackState === State.Paused || playerBackState === State.Ready) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

export const audios = [
  // {
  //   id: 0,
  //   title: '.trashed-1687898760-Iphone Notification Bell.mp3',
  //   url: 'file:///storage/emulated/0/Download/.trashed-1687898760-Iphone Notification Bell.mp3',
  // },
  {
    id: 1,
    title:
      'Nathaniel_Bassey_-_TOBECHUKWU_Praise_God_Ft_Mercy_Chinwo_Blessed_CeeNaija.com_ (2).mp3',
    url: 'file:///storage/emulated/0/Download/Nathaniel_Bassey_-_TOBECHUKWU_Praise_God_Ft_Mercy_Chinwo_Blessed_CeeNaija.com_ (2).mp3',
  },
  {
    id: 2,
    title: 'Moses_Bliss_-_Glory_CeeNaija.com_.mp3',
    url: 'file:///storage/emulated/0/Download/Moses_Bliss_-_Glory_CeeNaija.com_.mp3',
  },
  {
    id: 3,
    title: '01 I Believe.mp3',
    url: 'file:///storage/emulated/0/Download/01 I Believe.mp3',
  },
  {
    id: 4,
    title: '01 intro.mp3',
    url: 'file:///storage/emulated/0/Download/01 intro.mp3',
  },
  {
    id: 5,
    title: '1Sam-2-There-is-none-holy-as-the-Lord-11321-1.23-PM.mp3',
    url: 'file:///storage/emulated/0/Download/1Sam-2-There-is-none-holy-as-the-Lord-11321-1.23-PM.mp3',
  },
  {
    id: 6,
    title: '1 track 000-1.mp3',
    url: 'file:///storage/emulated/0/Download/1 track 000-1.mp3',
  },
  {
    id: 7,
    title: '01 YORUBA PRAISE (2).mp3',
    url: 'file:///storage/emulated/0/Download/01 YORUBA PRAISE (2).mp3',
  },
  {
    id: 8,
    title:
      '02 Financial and Material Prosperity - (Apst. Arome Osayi) - Sat. 29th Nov. 2014 (2).mp3',
    url: 'file:///storage/emulated/0/Download/02 Financial and Material Prosperity - (Apst. Arome Osayi) - Sat. 29th Nov. 2014 (2).mp3',
  },
  {
    id: 9,
    title: '03 wonderful wonder-1.mp3',
    url: 'file:///storage/emulated/0/Download/03 wonderful wonder-1.mp3',
  },
  {
    id: 10,
    title: '04. Hold On (Ft. Rick Ross).mp3',
    url: 'file:///storage/emulated/0/Download/04. Hold On (Ft. Rick Ross).mp3',
  },
  {
    id: 11,
    title: '16. PRAISE.mp3',
    url: 'file:///storage/emulated/0/Download/16. PRAISE.mp3',
  },
  {
    id: 12,
    title: '17. PRAISE.mp3',
    url: 'file:///storage/emulated/0/Download/17. PRAISE.mp3',
  },
  {
    id: 13,
    title: '22 Nigerian Worship.wma',
    url: 'file:///storage/emulated/0/Download/22 Nigerian Worship.wma',
  },
  {
    id: 14,
    title: '080. gospel praise-majesty.mp3',
    url: 'file:///storage/emulated/0/Download/080. gospel praise-majesty.mp3',
  },
  {
    id: 15,
    title: '80 yuruba worsip.mp3',
    url: 'file:///storage/emulated/0/Download/80 yuruba worsip.mp3',
  },
  {
    id: 16,
    title: 'ancient words-1.mp3',
    url: 'file:///storage/emulated/0/Download/ancient words-1.mp3',
  },
  {
    id: 17,
    title: 'busysinging-10349.mp3',
    url: 'file:///storage/emulated/0/Download/busysinging-10349.mp3',
  },
  {
    id: 18,
    title: 'busysinging-262794.mp3',
    url: 'file:///storage/emulated/0/Download/busysinging-262794.mp3',
  },
  {
    id: 19,
    title:
      'Day-1-FEBRUARY-HALLELUJAH-CHALLENGE-2023-Pastor-Nathaniel-Bassey.mp3',
    url: 'file:///storage/emulated/0/Download/Day-1-FEBRUARY-HALLELUJAH-CHALLENGE-2023-Pastor-Nathaniel-Bassey.mp3',
  },
  {
    id: 20,
    title: '[Deep Worship and Chant] MAIGIRMA by Theophilus Su(MP3_128K).mp3',
    url: 'file:///storage/emulated/0/Download/[Deep Worship and Chant] MAIGIRMA by Theophilus Su(MP3_128K).mp3',
  },
  {
    id: 21,
    title: 'Ebube.mp3',
    url: 'file:///storage/emulated/0/Download/Ebube.mp3',
  },
  {
    id: 22,
    title: 'good to be home.mp3',
    url: 'file:///storage/emulated/0/Download/good to be home.mp3',
  },
  {
    id: 23,
    title: 'H1 IMMORTAL INVISIBLE.mp3',
    url: 'file:///storage/emulated/0/Download/H1 IMMORTAL INVISIBLE.mp3',
  },
  {
    id: 24,
    title: 'i almost let go-kurt carr.mp3',
    url: 'file:///storage/emulated/0/Download/i almost let go-kurt carr.mp3',
  },
  {
    id: 25,
    title: 'marvelous God- Sammie Okposo.mp3',
    url: 'file:///storage/emulated/0/Download/marvelous God- Sammie Okposo.mp3',
  },
  {
    id: 26,
    title: 'New 1-mc.mp3',
    url: 'file:///storage/emulated/0/Download/New 1-mc.mp3',
  },
  {
    id: 27,
    title: 'New 4-mc.mp3',
    url: 'file:///storage/emulated/0/Download/New 4-mc.mp3',
  },
  {
    id: 28,
    title: 'New 5-mc.mp3',
    url: 'file:///storage/emulated/0/Download/New 5-mc.mp3',
  },
  {
    id: 29,
    title: '(POWERFUL) JESUS IS SOMEONE TO SHOUT ABOUT - Evang(MP3_128K).mp3',
    url: 'file:///storage/emulated/0/Download/(POWERFUL) JESUS IS SOMEONE TO SHOUT ABOUT - Evang(MP3_128K).mp3',
  },
  {
    id: 30,
    title: 'Victoria_Orenze_-_Covenant_Keeping_Godmp3_Castnigeria.com_ (1).mp3',
    url: 'file:///storage/emulated/0/Download/Victoria_Orenze_-_Covenant_Keeping_Godmp3_Castnigeria.com_ (1).mp3',
  },
  {
    id: 31,
    title: 'Victoria_Orenze_-_Covenant_Keeping_Godmp3_Castnigeria.com_ (2).mp3',
    url: 'file:///storage/emulated/0/Download/Victoria_Orenze_-_Covenant_Keeping_Godmp3_Castnigeria.com_ (2).mp3',
  },
];

const AppContext = createContext({
  songIndex: 0,
  scrollX: null,
  songSlider: null,
  allDevicesVideos: [],
  allDevicesAudios: [],
  width: null,
  height: null,
  returnTheIndex: () => {},
  skipToNext: () => {},
  skipToPrevious: () => {},
  setsongIndex: () => {},
});

export default function AppProvider({children}) {
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [allDevicesVideos, setAllDevicesVideos] = useState([]);

  const [allDevicesAudios, setAllDevicesAudios] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const returnTheIndex = index => {
    setsongIndex(index);
  };

  const getMediaFiles = async () => {
    try {
      const audioFiles = [];
      const videoFiles = [];

      const externalStoragePath = await RNFetchBlob.fs.dirs.SDCardDir;

      const externalStorageDirectory = await RNFS.ExternalDirectoryPath;

      const allPaths = [externalStoragePath, externalStorageDirectory];

      const allDirectory = await RNFetchBlob.fs.ls(
        RNFetchBlob.fs.dirs.SDCardDir,
      );

      await Promise.all(
        allDirectory.map(async name => {
          const path = `${RNFetchBlob.fs.dirs.SDCardDir}/${name}`;
          const stats = await RNFS.stat(path);
          if (stats || path || name) {
            allPaths.push(path);
            return {name, path, stats};
          } else {
            return null;
          }
        }),
      );

      setIsFetching(true);

      for (const path of allPaths) {
        const files = allPaths && (await RNFS.readDir(path));
        const allAudioFiles =
          files &&
          files.filter(
            file =>
              (file.isFile() || file.isDirectory()) &&
              (file.name.endsWith('.mp3') ||
                file.name.endsWith('.wav') ||
                file.name.endsWith('.flac') ||
                file.name.endsWith('.aac') ||
                file.name.endsWith('.ogg') ||
                file.name.endsWith('.wma') ||
                file.name.endsWith('.m4a') ||
                file.name.endsWith('.alac') ||
                file.name.endsWith('.aiff')),
          );

        const allVideoFiles =
          files &&
          files.filter(
            file =>
              (file.isFile() || file.isDirectory()) &&
              (file.name.endsWith('.mp4') ||
                file.name.endsWith('.avi') ||
                file.name.endsWith('.mov') ||
                file.name.endsWith('.mkv') ||
                file.name.endsWith('.flv') ||
                file.name.endsWith('.wmv') ||
                file.name.endsWith('.m4v') ||
                file.name.endsWith('.mpeg') ||
                file.name.endsWith('.mpg') ||
                file.name.endsWith('.3gp')),
          );

        videoFiles.push(...allVideoFiles);
        audioFiles.push(...allAudioFiles);
      }
      setAllDevicesVideos(videoFiles);
      setAllDevicesAudios(audioFiles);
      setIsFetching(false);
    } catch (error) {
      console.error('Error retrieving media files:', error);
      setIsFetching(false);
    }
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setupAudios = async () => {
    try {
      const newData = allDevicesAudios.map((data, index) => {
        const {path, name} = data;
        const updatedUser = {url: `file://${path}`, title: name, id: index};
        return updatedUser;
      });
      await TrackPlayer.add(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'This app needs access to your device storage to load media files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted, proceed with loading audio or video files

        getMediaFiles();
      } else {
        // Permission denied, handle accordingly (e.g., show an error message)
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onChange = ({window}) => {
      setScreenDimensions(window);
    };

    Dimensions?.addEventListener('change', onChange);
  }, [screenDimensions]);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const {width} = screenDimensions;

  useEffect(() => {
    const onChange = ({window}) => {
      setScreenDimensions(window);
    };

    Dimensions?.addEventListener('change', onChange);
  }, [screenDimensions]);

  useEffect(() => {
    setupPlayer();
    setupAudios();

    scrollX.addListener(({value}) => {
      //   console.log(`ScrollX : ${value} | Device Width : ${width} `);

      const index = Math.round(value / width);
      skipTo(index);
      setsongIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
      // TrackPlayer?.destroy();
    };
  }, [isFetching, songIndex]);

  return (
    <AppContext.Provider
      value={{
        songIndex,
        skipToPrevious,
        skipToNext,
        songSlider,
        scrollX,
        setsongIndex,
        allDevicesVideos,
        allDevicesAudios,
        returnTheIndex,
        height: screenDimensions.height,
        width: screenDimensions.width,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
