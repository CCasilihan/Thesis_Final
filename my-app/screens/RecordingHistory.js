import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';

const emotionColors = {
  Happy: '#ffeb3b',           // Yellow
  Sad: '#2196f3',             // Blue
  Anger: '#f44336',           // Red
  Growling: '#4caf50',        // Green
  Aggressive: '#ff9800',      // Orange
  Pain: '#6a1b9a',            // Violet
  Alertness: '#009688',
};

const emotionImages = {
  Happy: require('../assets/dogpics/happy.png'),
  Sad: require('../assets/dogpics/sad.png'),
  Anger: require('../assets/dogpics/angry.png'),
  Growling: require('../assets/dogpics/growling.png'),
  Aggressive: require('../assets/dogpics/aggressive.png'),
  Pain: require('../assets/dogpics/pain.png'),
  Alertness: require('../assets/dogpics/alertness.png'),
};

const RecordingHistory = ({ navigation, route }) => {
  const { recordings } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObject, setSoundObject] = useState(null);

  const handlePlayRecording = async (recording) => {
    if (isPlaying) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      setIsPlaying(false);
      setSoundObject(null);
      return;
    }

    try {
      const newSoundObject = new Audio.Sound();
      await newSoundObject.loadAsync({ uri: recording.uri });
      await newSoundObject.playAsync();
      setSoundObject(newSoundObject);
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  };

  const renderRecordingItem = ({ item }) => (
    <View style={[styles.recordingItem, { backgroundColor: emotionColors[item.label] }]}>
      <View style={styles.imageContainer}>
        <Image source={emotionImages[item.label]} style={styles.emotionImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{`Emotion Results: ${item.label}`}</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.recordingName}>{item.name}</Text>
          <Pressable style={styles.playButton} onPress={() => handlePlayRecording(item)}>
            <Icon name={isPlaying ? 'stop' : 'play'} size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>The Emotion Result</Text>
      <FlatList
        data={recordings}
        renderItem={renderRecordingItem}
        keyExtractor={(item) => item.uri}
        ListEmptyComponent={<Text style={styles.emptyText}>No recordings available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  recordingItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  emotionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adds space between the name and play button
  },
  playButton: {
    // backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  recordingName: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  emptyText: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default RecordingHistory;














// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Pressable, Image, Alert } from 'react-native';
// import { Audio } from 'expo-av';
// import * as FileSystem from 'expo-file-system';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const emotionColors = {
//   Happy: '#ffeb3b',           // Yellow
//   Sad: '#2196f3',             // Blue
//   // Scared: '#4caf50',          // Green
//   Anger: '#f44336',           // Red
//   Growling: '#4caf50',        // Green
//   Aggressive: '#ff9800',      // Orange
//   Pain: '#6a1b9a',            // Violet
//   Alertness: '#009688',
// };

// const emotionImages = {
//   Happy: require('../assets/Joy.jpg'),
//   Sad: require('../assets/Sadness.jpg'),
//   // Scared: require('../assets/Scared.jpg'),
//   Anger: require('../assets/anger.jpg'),
//   Growling: require('../assets/disgust.jpg'),
//   Aggressive: require('../assets/Anxiety.jpg'),
//   Pain: require('../assets/Fear.jpeg'),
//   Alertness: require('../assets/Envy.jpg'),
// };

// const RecordingHistory = ({ navigation, route }) => {
//   const { recordings, setRecordings } = route.params;
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [soundObject, setSoundObject] = useState(null);

//   const handlePlayRecording = async (recording) => {
//     if (isPlaying) {
//       await soundObject.stopAsync();
//       await soundObject.unloadAsync();
//       setIsPlaying(false);
//       setSoundObject(null);
//       return;
//     }

//     try {
//       const newSoundObject = new Audio.Sound();
//       await newSoundObject.loadAsync({ uri: recording.uri });
//       await newSoundObject.playAsync();
//       setSoundObject(newSoundObject);
//       setIsPlaying(true);
//     } catch (error) {
//       console.error('Failed to play recording', error);
//     }
//   };

//   const handleDeleteRecording = (recording) => {
//     Alert.alert(
//       'Delete Confirmation',
//       `Are you sure you want to delete the recording "${recording.name}"?`,
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await FileSystem.deleteAsync(recording.uri, { idempotent: true });
//               setRecordings((prevRecordings) =>
//                 prevRecordings.filter((item) => item.uri !== recording.uri)
//               );
//             } catch (error) {
//               console.error('Failed to delete recording', error);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const renderRecordingItem = ({ item }) => (
//     <View style={[styles.recordingItem, { backgroundColor: emotionColors[item.label] }]}>
//       <View style={styles.imageContainer}>
//         <Image source={emotionImages[item.label]} style={styles.emotionImage} />
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.titleText}>{`Emotion Results: ${item.label}`}</Text>
//         <View style={styles.buttonContainer}>
//           <Pressable style={styles.playButton} onPress={() => handlePlayRecording(item)}>
//             <Icon name={isPlaying ? 'stop' : 'play'} size={20} color="white" />
//           </Pressable>
//           <Text style={styles.recordingName}>{item.name}</Text>
//           <Pressable style={styles.deleteButton} onPress={() => handleDeleteRecording(item)}>
//             <Icon name="trash" size={20} color="white" />
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.mainTitle}>The Emotion Result</Text>
//       <FlatList
//         data={recordings}
//         renderItem={renderRecordingItem}
//         keyExtractor={(item) => item.uri}
//         ListEmptyComponent={<Text style={styles.emptyText}>No recordings available</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   mainTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   recordingItem: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     marginRight: 20,
//   },
//   emotionImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     resizeMode: 'cover',
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   titleText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   playButton: {
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   recordingName: {
//     flex: 1,
//     fontSize: 16,
//     color: 'black',
//     marginLeft: 10,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: 'black',
//     alignSelf: 'center',
//     marginTop: 20,
//   },
// });

// export default RecordingHistory;
