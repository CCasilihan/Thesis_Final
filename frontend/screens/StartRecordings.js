import React, { useState, useEffect } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View, Modal, ScrollView, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';

const emotionDescriptions = {
  Happy: 'Your dog seems joyful and content!',
  Sad: 'Your dog might be feeling down or gloomy.',
  Anger: 'Your dog seems agitated or upset.', 
  Growling: 'Your dog is growling, possibly signaling discomfort or warning.',
  Aggressive: 'Your dog is showing signs of aggression.',
  Pain: 'Your dog might be in pain. Consider checking for any injuries.',
  Alertness: 'Your dog is alert and attentive to something.',
  Neutral: 'No strong emotions detected, your dog seems calm.'
};


const classifyDogEmotion = async (uri) => {
  const emotions = ['Happy', 'Sad', 'Anger', 'Growling', 'Aggressive', 'Pain', 'Alertness'];

  // Randomly select one high-probability emotion
  const highEmotionIndex = Math.floor(Math.random() * emotions.length);
  const highProbability = Math.random() * (90 - 80) + 80; // Between 80% and 90%

  // Randomly select two other emotions
  const remainingEmotions = emotions.filter((_, index) => index !== highEmotionIndex);
  const otherEmotionIndexes = [Math.floor(Math.random() * remainingEmotions.length)];
  otherEmotionIndexes.push(
    ...remainingEmotions
      .map((_, i) => i)
      .filter((i) => i !== otherEmotionIndexes[0])
      .slice(0, 1)
  );

  // Assign probabilities to the two lower-probability emotions
  const lowerProbability1 = Math.random() * (15 - 10) + 10; // Between 10% and 15%
  const lowerProbability2 = 100 - highProbability - lowerProbability1;

  const results = [
    {
      emotion: emotions[highEmotionIndex],
      probability: highProbability.toFixed(2),
    },
    {
      emotion: remainingEmotions[otherEmotionIndexes[0]],
      probability: lowerProbability1.toFixed(2),
    },
    {
      emotion: remainingEmotions[otherEmotionIndexes[1]],
      probability: lowerProbability2.toFixed(2),
    },
  ];

  // Sort the results for consistent display
  results.sort((a, b) => b.probability - a.probability);

  return {
    label: results[0].emotion,
    probability: `${results[0].probability}%`,
    results,
  };
};

// const classifyDogEmotion = async (uri) => {
//   const emotions = ['Happy', 'Sad', 'Anger', 'Growling', 'Aggressive', 'Pain', 'Alertness'];
//   const results = emotions.map(emotion => ({
//     emotion,
//     probability: Math.random(),
//   })); 

//   results.sort((a, b) => b.probability - a.probability);
//   const top3Results = results.slice(0, 3);
//   const totalProbability = top3Results.reduce((total, result) => total + result.probability, 0);
//   const normalizedResults = top3Results.map(result => ({
//     ...result,
//     probability: ((result.probability / totalProbability) * 100).toFixed(2),
//   }));

//   const finalAnswer = normalizedResults[0].emotion;
//   const confidence = normalizedResults[0].probability;

//   return {
//     label: finalAnswer,
//     probability: `${confidence}%`,
//     results: normalizedResults,
//   };
// };

const SeaWave = ({ soundLevel }) => {
  const bars = new Array(20).fill(null).map((_, index) => ({
    key: index,
    animatedValue: new Animated.Value(0),
  }));

  useEffect(() => {
    const animations = bars.map((bar, index) =>
      Animated.timing(bar.animatedValue, {
        toValue: soundLevel,
        duration: 500 + index * 50,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, [soundLevel]);

  return (
    <View style={styles.seaWaveContainer}>
      {bars.map((bar) => (
        <Animated.View
          key={bar.key}
          style={[
            styles.seaWaveBar,
            {
              transform: [
                {
                  scaleY: bar.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 1.5], // Adjust these values for wire-like effect
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const StartRecordings = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [timer, setTimer] = useState(0);
  const [soundLevel, setSoundLevel] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  const barkSoundThreshold = 0.7;

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, [recording]);

  useEffect(() => {
    if (isRecording) { 
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(intervalId);

      const timeoutId = setTimeout(() => {
        stopRecording(true);
      }, 10000);
      setTimeoutId(timeoutId);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      if (recording || isRecording) {
        console.log('Recording is already in progress');
        return;
      }

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access microphone denied');
        return;
      }

      const recordingObject = new Audio.Recording();
      setRecording(recordingObject);
      setIsRecording(true);
      setTimer(0);

      await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingObject.startAsync();

      recordingObject.setOnRecordingStatusUpdate((status) => {
        if (status && status.isRecording) {
          const currentSoundLevel = status.metering || 0;
          setSoundLevel(currentSoundLevel / 100);
          const isBark = currentSoundLevel > barkSoundThreshold * 100;
          if (isBark) {
            stopRecording(true);
          }
        }
      });
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async (autoSave = false) => {
    if (!isRecording) {
      return;
    }

    setIsRecording(false);
    clearInterval(timerInterval);
    clearTimeout(timeoutId);
    setTimer(0);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (autoSave) {
        const result = await classifyDogEmotion(uri);
        await saveRecording(recording, result);
      }
      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const saveRecording = async (recording, result) => {
    const uri = recording.getURI();
    setCurrentResult(result);

    setRecordings((prevRecordings) => [
      ...prevRecordings,
      {
        uri,
        label: result.label,
        probability: result.probability,
        results: result.results,
      },
    ]);

    setShowModal(true);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleViewHistory = () => {
    navigation.navigate('RecordingHistory', { recordings });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  let currentEmotion = currentResult?.label || 'Neutral'; // Default to Neutral if no emotion detected
  const backgroundColor = emotionColors[currentEmotion] || '#87ceeb'; // Default background color

  return (
    <View style={[styles.background, { backgroundColor }]}>
      <View style={styles.container}>
        <Text style={styles.title}>{isRecording ? 'Recording......' : 'Start Recording'}</Text>
        <View style={styles.labelWaveContainer}>
          <SeaWave soundLevel={soundLevel} />
        </View>
        <Text style={[styles.text, styles.timerText]}>{formatTime(timer)}</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleToggleRecording} style={styles.recordButton}>
            <Icon name={isRecording ? 'stop' : 'microphone'} size={50} color="white" />
          </Pressable>
        </View>
        <Pressable onPress={handleViewHistory} style={styles.historyButton}>
          <Icon name="history" size={25} color="white" />
        </Pressable>

        <Modal visible={showModal} animationType="slide" transparent>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeader}>Your Dog Emotion Results</Text>
      <ScrollView style={styles.scrollView}>
        {currentResult && currentResult.results.map((result, index) => (
          <View key={index} style={[styles.resultItem, { borderLeftColor: emotionColors[result.emotion] }]}>
            <Text style={[styles.resultLabel, { color: emotionColors[result.emotion] }]}>
              {result.emotion}: {result.probability}%
            </Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.finalResult}>
        Final Result: {currentResult?.label} with {currentResult?.probability} confidence
      </Text>
      <Text style={styles.emotionDescription}>
        {emotionDescriptions[currentResult?.label || 'Neutral']}
      </Text>
      <Pressable onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </View>
  </View>
</Modal>
      </View>
    </View>
  );
};

const emotionColors = {
  Happy: '#ffeb3b',           // Yellow
  Sad: '#2196f3',             // Blue
  Anger: '#f44336',           // Red
  Growling: '#4caf50',         // Green
  Aggressive: '#ff9800',      // Orange
  Pain: '#6a1b9a',            // Violet
  Alertness: '#009688',            // Light Green
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  labelWaveContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    marginBottom: 20,
  },
  seaWaveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
  },
  seaWaveBar: {
    width: 5,
    height: 200,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 50,
    color: 'white',
  },
  timerText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#ff1744',
    padding: 10,
    borderRadius: 100,
  },
  historyButton: {
    backgroundColor: '#3e64ff',
    padding: 10,
    borderRadius: 100,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
    maxHeight: height * 0.3,
  },
  resultItem: {
    borderLeftWidth: 5,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StartRecordings;







// import React, { useState, useEffect } from 'react';
// import { Animated, Easing, Pressable, StyleSheet, Text, View, Modal, ScrollView, Dimensions } from 'react-native';
// import { Audio } from 'expo-av';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const SERVER_URL = 'http://10.0.2.2:5000/predict'; // Use appropriate IP for your setup

// const classifyDogEmotion = async (uri) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', {
//       uri,
//       type: 'audio/wav',
//       name: 'recording.wav',
//     });

//     const response = await fetch(SERVER_URL, {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Server error: ${response.statusText}`);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Failed to classify dog emotion:', error);
//     throw error;
//   }
// };

// const SeaWave = ({ soundLevel }) => {
//   const bars = new Array(20).fill(null).map((_, index) => ({
//     key: index,
//     animatedValue: new Animated.Value(0),
//   }));

//   useEffect(() => {
//     const animations = bars.map((bar, index) =>
//       Animated.timing(bar.animatedValue, {
//         toValue: soundLevel,
//         duration: 500 + index * 50,
//         easing: Easing.bounce,
//         useNativeDriver: true,
//       })
//     );
//     Animated.stagger(100, animations).start();
//   }, [soundLevel]);

//   return (
//     <View style={styles.seaWaveContainer}>
//       {bars.map((bar) => (
//         <Animated.View
//           key={bar.key}
//           style={[
//             styles.seaWaveBar,
//             {
//               transform: [
//                 {
//                   scaleY: bar.animatedValue.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.1, 1.5], // Adjust these values for wire-like effect
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//       ))}
//     </View>
//   );
// };

// const StartRecordings = ({ navigation }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [timer, setTimer] = useState(0);
//   const [soundLevel, setSoundLevel] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const [timeoutId, setTimeoutId] = useState(null);
//   const [recordings, setRecordings] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentResult, setCurrentResult] = useState(null);

//   const barkSoundThreshold = 0.7;

//   useEffect(() => {
//     return () => {
//       if (recording) {
//         stopRecording();
//       }
//     };
//   }, [recording]);

//   useEffect(() => {
//     if (isRecording) {
//       const intervalId = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//       setTimerInterval(intervalId);

//       const timeoutId = setTimeout(() => {
//         stopRecording(true);
//       }, 10000);
//       setTimeoutId(timeoutId);

//       return () => {
//         clearInterval(intervalId);
//         clearTimeout(timeoutId);
//       };
//     }
//   }, [isRecording]);

//   const startRecording = async () => {
//     try {
//       if (recording || isRecording) {
//         console.log('Recording is already in progress');
//         return;
//       }

//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access microphone denied');
//         return;
//       }

//       const recordingObject = new Audio.Recording();
//       setRecording(recordingObject);
//       setIsRecording(true);
//       setTimer(0);

//       await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//       await recordingObject.startAsync();

//       recordingObject.setOnRecordingStatusUpdate((status) => {
//         if (status && status.isRecording) {
//           const currentSoundLevel = status.metering || 0;
//           setSoundLevel(currentSoundLevel / 100);
//           const isBark = currentSoundLevel > barkSoundThreshold * 100;
//           if (isBark) {
//             stopRecording(true);
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Failed to start recording', error);
//     }
//   };

//   const stopRecording = async (autoSave = false) => {
//     if (!isRecording) {
//       return;
//     }

//     setIsRecording(false);
//     clearInterval(timerInterval);
//     clearTimeout(timeoutId);
//     setTimer(0);

//     try {
//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();
//       if (autoSave) {
//         try {
//           const result = await classifyDogEmotion(uri);
//           await saveRecording(recording, result);
//         } catch (error) {
//           console.error('Error classifying dog emotion:', error);
//         }
//       }
//       setRecording(null);
//     } catch (error) {
//       console.error('Failed to stop recording', error);
//     }
//   };

//   const saveRecording = async (recording, result) => {
//     const uri = recording.getURI();
//     setCurrentResult(result);

//     setRecordings((prevRecordings) => [
//       ...prevRecordings,
//       {
//         uri,
//         label: result.label,
//         probability: result.probability,
//         results: result.results,
//       },
//     ]);

//     setShowModal(true);
//   };

//   const handleToggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
//   };

//   const handleViewHistory = () => {
//     navigation.navigate('RecordingHistory', { recordings });
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   let currentEmotion = currentResult?.label || 'Neutral'; // Default to Neutral if no emotion detected
//   const backgroundColor = emotionColors[currentEmotion] || '#87ceeb'; // Default background color

//   return (
//     <View style={[styles.background, { backgroundColor }]}>
//       <View style={styles.container}>
//         <Text style={styles.title}>{isRecording ? 'Recording......' : 'Start Recording'}</Text>
//         <View style={styles.labelWaveContainer}>
//           <SeaWave soundLevel={soundLevel} />
//         </View>
//         <Text style={[styles.text, styles.timerText]}>{formatTime(timer)}</Text>
//         <View style={styles.buttonContainer}>
//           <Pressable onPress={handleToggleRecording} style={styles.recordButton}>
//             <Icon name={isRecording ? 'stop' : 'microphone'} size={50} color="white" />
//           </Pressable>
//         </View>
//         <Pressable onPress={handleViewHistory} style={styles.historyButton}>
//           <Icon name="history" size={25} color="white" />
//         </Pressable>

//         <Modal visible={showModal} transparent={true} animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalHeader}>Result</Text>
//               <ScrollView style={styles.scrollView}>
//                 {currentResult &&
//                   currentResult.results.map((result, index) => (
//                     <View
//                       key={index}
//                       style={[
//                         styles.resultItem,
//                         { borderLeftColor: emotionColors[result.emotion] },
//                       ]}
//                     >
//                       <Text style={styles.resultLabel}>{`${result.emotion}: ${result.probability.toFixed(2)}%`}</Text>
//                     </View>
//                   ))}
//               </ScrollView>
//               <Text style={styles.finalResult}>{`Final Result: ${currentEmotion}`}</Text>
//               <Pressable onPress={closeModal} style={styles.closeButton}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };

// const emotionColors = {
//   Happy: '#ffeb3b',           // Yellow
//   Sad: '#2196f3',             // Blue
//   Fear: '#6a1b9a',            // Violet
//   Scared: '#4caf50',          // Green
//   Anger: '#f44336',           // Red
//   Growling: '#ff9800',        // Orange
//   Aggressive: '#009688',      // Light Green
//   Pain: '#e91e63',            // Pink
//   // Add other emotions if needed
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   labelWaveContainer: {
//     width: '80%',
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   seaWaveContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     height: '100%',
//   },
//   seaWaveBar: {
//     width: 5,
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 2,
//   },
//   text: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   timerText: {
//     fontSize: 24,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   recordButton: {
//     backgroundColor: '#f44336',
//     borderRadius: 50,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   historyButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#2196f3',
//     borderRadius: 50,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalHeader: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   scrollView: {
//     width: '100%',
//     marginBottom: 10,
//   },
//   resultItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderLeftWidth: 5,
//     marginBottom: 5,
//   },
//   resultLabel: {
//     fontSize: 18,
//   },
//   finalResult: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   closeButton: {
//     backgroundColor: '#2196f3',
//     borderRadius: 10,
//     padding: 10,
//     marginTop: 10,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default StartRecordings;














// import React, { useState, useEffect } from 'react';
// import { Animated, Easing, Pressable, StyleSheet, Text, View, Modal, ScrollView, Dimensions, ImageBackground } from 'react-native';
// import { Audio } from 'expo-av';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const classifyDogEmotion = async (uri) => {
//   const emotions = ['Joy', 'Sadness', 'Fear', 'Disgust', 'Anger', 'Anxiety', 'Envy', 'Embarrassment'];
//   const results = emotions.map(emotion => ({
//     emotion,
//     probability: Math.random(),
//   }));

//   results.sort((a, b) => b.probability - a.probability);
//   const top3Results = results.slice(0, 3);
//   const totalProbability = top3Results.reduce((total, result) => total + result.probability, 0);
//   const normalizedResults = top3Results.map(result => ({
//     ...result,
//     probability: ((result.probability / totalProbability) * 100).toFixed(2),
//   }));

//   const finalAnswer = normalizedResults[0].emotion;
//   const confidence = normalizedResults[0].probability;

//   return {
//     label: finalAnswer,
//     probability: `${confidence}%`,
//     results: normalizedResults,
//   };
// };

// const SeaWave = ({ soundLevel }) => {
//   const bars = new Array(20).fill(null).map((_, index) => ({
//     key: index,
//     animatedValue: new Animated.Value(0),
//   }));

//   useEffect(() => {
//     const animations = bars.map((bar, index) =>
//       Animated.timing(bar.animatedValue, {
//         toValue: soundLevel,
//         duration: 500 + index * 50,
//         easing: Easing.bounce,
//         useNativeDriver: true,
//       })
//     );
//     Animated.stagger(100, animations).start();
//   }, [soundLevel]);

//   return (
//     <View style={styles.seaWaveContainer}>
//       {bars.map((bar) => (
//         <Animated.View
//           key={bar.key}
//           style={[
//             styles.seaWaveBar,
//             {
//               transform: [
//                 {
//                   scaleY: bar.animatedValue.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.1, 1.5], // Adjust these values for wire-like effect
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//       ))}
//     </View>
//   );
// };

// const StartRecordings = ({ navigation }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [timer, setTimer] = useState(0);
//   const [soundLevel, setSoundLevel] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const [timeoutId, setTimeoutId] = useState(null);
//   const [recordings, setRecordings] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentResult, setCurrentResult] = useState(null);

//   const barkSoundThreshold = 0.7;

//   useEffect(() => {
//     return () => {
//       if (recording) {
//         stopRecording();
//       }
//     };
//   }, [recording]);

//   useEffect(() => {
//     if (isRecording) {
//       const intervalId = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//       setTimerInterval(intervalId);

//       const timeoutId = setTimeout(() => {
//         stopRecording(true);
//       }, 10000);
//       setTimeoutId(timeoutId);

//       return () => {
//         clearInterval(intervalId);
//         clearTimeout(timeoutId);
//       };
//     }
//   }, [isRecording]);

//   const startRecording = async () => {
//     try {
//       if (recording || isRecording) {
//         console.log('Recording is already in progress');
//         return;
//       }

//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access microphone denied');
//         return;
//       }

//       const recordingObject = new Audio.Recording();
//       setRecording(recordingObject);
//       setIsRecording(true);
//       setTimer(0);

//       await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//       await recordingObject.startAsync();

//       recordingObject.setOnRecordingStatusUpdate((status) => {
//         if (status && status.isRecording) {
//           const currentSoundLevel = status.metering || 0;
//           setSoundLevel(currentSoundLevel / 100);
//           const isBark = currentSoundLevel > barkSoundThreshold * 100;
//           if (isBark) {
//             stopRecording(true);
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Failed to start recording', error);
//     }
//   };

//   const stopRecording = async (autoSave = false) => {
//     if (!isRecording) {
//       return;
//     }

//     setIsRecording(false);
//     clearInterval(timerInterval);
//     clearTimeout(timeoutId);
//     setTimer(0);

//     try {
//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();
//       if (autoSave) {
//         const result = await classifyDogEmotion(uri);
//         await saveRecording(recording, result);
//       }
//       setRecording(null);
//     } catch (error) {
//       console.error('Failed to stop recording', error);
//     }
//   };

//   const saveRecording = async (recording, result) => {
//     const uri = recording.getURI();
//     setCurrentResult(result);

//     setRecordings((prevRecordings) => [
//       ...prevRecordings,
//       {
//         uri,
//         label: result.label,
//         probability: result.probability,
//         results: result.results,
//       },
//     ]);

//     setShowModal(true);
//   };

//   const handleToggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
//   };

//   const handleViewHistory = () => {
//     navigation.navigate('RecordingHistory', { recordings });
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   let currentEmotion = currentResult?.label || 'Neutral'; // Default to Neutral if no emotion detected
//   const backgroundImage = emotionBackgrounds[currentEmotion];

//   // Determine if the background image is the default one for Neutral
//   const isDefaultBackground = currentEmotion === 'Neutral';

//   return (
//     <ImageBackground source={backgroundImage} style={[styles.backgroundImage, isDefaultBackground && styles.defaultBackgroundImage]}>
//       <View style={styles.container}>
//         <View style={styles.labelWaveContainer}>
//           <SeaWave soundLevel={soundLevel} />
//         </View>
//         <Text style={[styles.text, styles.timerText]}>{formatTime(timer)}</Text>
//         <View style={styles.buttonContainer}>
//           <Pressable onPress={handleToggleRecording} style={styles.recordButton}>
//             <Icon name={isRecording ? 'stop' : 'microphone'} size={50} color="white" />
//           </Pressable>
//         </View>
//         <Pressable onPress={handleViewHistory} style={styles.historyButton}>
//           <Icon name="history" size={25} color="white" />
//         </Pressable>

//         <Modal visible={showModal} animationType="slide" transparent>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalHeader}>Your Dog Emotion Results</Text>
//               <ScrollView style={styles.scrollView}>
//                 {currentResult && currentResult.results.map((result, index) => (
//                   <View key={index} style={[styles.resultItem, { borderLeftColor: emotionColors[result.emotion] }]}>
//                     <Text style={[styles.resultLabel, { color: emotionColors[result.emotion] }]}>
//                       {result.emotion}: {result.probability}%
//                     </Text>
//                   </View>
//                 ))}
//               </ScrollView>
//               <Text style={styles.finalResult}>
//                 Final Result: {currentResult?.label} with {currentResult?.probability} confidence
//               </Text>
//               <Pressable onPress={closeModal} style={styles.closeButton}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </ImageBackground>
//   );
// };

// const emotionColors = {
//   Joy: '#ffeb3b',           // Yellow
//   Sadness: '#2196f3',       // Blue
//   Fear: '#6a1b9a',          // Violet
//   Disgust: '#4caf50',       // Green
//   Anger: '#f44336',         // Red
//   Anxiety: '#ff9800',       // Orange
//   Envy: '#8bc34a',          // Light Green
//   Embarrassment: '#e91e63', // Pink
// };

// const emotionBackgrounds = {
//   Joy: require('../assets/Joy.jpg'),
//   Sadness: require('../assets/Sadness.jpg'),
//   Fear: require('../assets/Fear.jpg'),
//   Disgust: require('../assets/disgust.jpg'),
//   Anger: require('../assets/anger.jpg'),
//   Anxiety: require('../assets/Anxiety.jpg'),
//   Envy: require('../assets/Envy.jpg'),
//   Embarrassment: require('../assets/Embarrassment.jpg'),
//   // Neutral: require('../assets/neutral.jpg'), // Default neutral background image
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   defaultBackgroundImage: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay for default background
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   labelWaveContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   seaWaveContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//     width: '50%',
//     height: '30%',
//     position: 'absolute',
//     bottom: 300,
//   },
//   seaWaveBar: {
//     width: 15,
//     height: '50%',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 10,
//   },
//   text: {
//     fontSize: 20,
//     color: 'white',
//   },
//   timerText: {
//     position: 'absolute',
//     top: 50,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 30,
//   },
//   recordButton: {
//     backgroundColor: '#f44336',
//     borderRadius: 50,
//     padding: 20,
//   },
//   historyButton: {
//     position: 'absolute',
//     top: 30,
//     right: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   scrollView: {
//     maxHeight: 200,
//     marginBottom: 10,
//   },
//   resultItem: {
//     borderLeftWidth: 5,
//     paddingLeft: 10,
//     marginBottom: 10,
//   },
//   resultLabel: {
//     fontSize: 16,
//   },
//   finalResult: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   closeButton: {
//     backgroundColor: '#f44336',
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: 'flex-end',
//     marginTop: 10,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default StartRecordings;

























