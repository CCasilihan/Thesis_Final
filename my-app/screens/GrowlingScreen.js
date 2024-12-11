import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Button } from "react-native";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";

const TypingText = ({ text, style }) => {
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 100; // Adjust typing speed in milliseconds

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index >= text.length) clearInterval(timer);
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text]);

  return <Text style={style}>{displayedText}</Text>;
};

const GrowlingScreen = () => {
  const [sound, setSound] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSound, setSelectedSound] = useState("");

  async function playSound(file, soundName) {
    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true });
    setSound(sound);
    setSelectedSound(soundName);
    setModalVisible(true);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setModalVisible(false);
        sound.unloadAsync(); // Clean up sound
      }
    });

    await sound.playAsync();
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/dogpics/growling.png")} // Replace with your image path
        />
        {/* <TypingText
          text="A dog's growling sound, characterized by a throaty, 
          resonant tone, conveys a deep sense of agitation or unease. 
          It can escalate into a more intense growl if the situation persists, 
          serving as an instinctive communication of discomfort or displeasure."
          style={styles.imageDescription}
        /> */}
      </View>
      <Text style={styles.title}>Growling</Text>
      <Text style={styles.description}>
        This screen shows details about the Growling behavior in dogs.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/Growling1.wav"), "Growling Type 1")}
        >
          <Text style={styles.buttonText}>Growling Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/Growling2.wav"), "Growling Type 2")}
        >
          <Text style={styles.buttonText}>Growling Type 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/Growling3.wav"), "Growling Type 3")}
        >
          <Text style={styles.buttonText}>Growling Type 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/Growling4.wav"), "Growling Type 4")}
        >
          <Text style={styles.buttonText}>Growling Type 4</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/Growling5.wav"), "Growling Type 5")}
        >
          <Text style={styles.buttonText}>Growling Type 5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/2growling.wav"), "Growling Type 6")}
        >
          <Text style={styles.buttonText}>Growling Type 6</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/2growling1.wav"), "Growling Type 7")}
        >
          <Text style={styles.buttonText}>Growling Type 7</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/2growling2.wav"), "Growling Type 8")}
        >
          <Text style={styles.buttonText}>Growling Type 8</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/2growling3.wav"), "Growling Type 9")}
        >
          <Text style={styles.buttonText}>Growling Type 9</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#a5d6a7" }]} // Light green color
          onPress={() => playSound(require("../dataset/2growling4.wav"), "Growling Type 10")}
        >
          <Text style={styles.buttonText}>Growling Type 10</Text>
        </TouchableOpacity>



        {/* Add more buttons for additional sounds as needed */}
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedSound} is playing.</Text>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={styles.soundWave}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#4caf50", // Green background color
    paddingVertical: 20, // Add vertical padding to prevent content from touching edges
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 10,
  },
  imageDescription: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    paddingBottom: 20, // Add padding at the bottom to ensure the last buttons are not cut off
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "black", // Text color for visibility
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#4caf50", // Match the text color in buttons
    marginBottom: 20,
  },
  soundWave: {
    width: 200,
    height: 10,
    backgroundColor: "#a5d6a7", // Light green color for the sound wave
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default GrowlingScreen;
