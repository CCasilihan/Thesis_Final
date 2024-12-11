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

const SadScreen = () => {
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
          source={require("../assets/dogpics/sad.png")} // Replace with your image path
        />
        {/* <TypingText
          text="A sad dog's bark is typically subdued, mournful, and 
          slower, expressing feelings of loneliness, distress, and longing. 
          Its whimpering undertone highlights the dog's emotional need for comfort and companionship."
          style={styles.imageDescription}
        /> */}
      </View>
      <Text style={styles.title}>Sad</Text>
      <Text style={styles.description}>
        {/* This screen shows details about the Sad emotion in dogs. */}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#add8e6" }]} // Light blue color
          onPress={() => playSound(require("../dataset/Sad1.wav"), "Sad Type 1")}
        >
          <Text style={styles.buttonText}>Sad Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#add8e6" }]} // Light blue color
          onPress={() => playSound(require("../dataset/Sad2.wav"), "Sad Type 2")}
        >
          <Text style={styles.buttonText}>Sad Type 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#add8e6" }]} // Light blue color
          onPress={() => playSound(require("../dataset/Sad3.wav"), "Sad Type 3")}
        >
          <Text style={styles.buttonText}>Sad Type 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#add8e6" }]} // Light blue color
          onPress={() => playSound(require("../dataset/Sad4.wav"), "Sad Type 4")}
        >
          <Text style={styles.buttonText}>Sad Type 4</Text>
        </TouchableOpacity>
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
    backgroundColor: "#2196f3", // Blue background color
    paddingVertical: 20, // Add vertical padding to prevent content from touching edges
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 400, // Adjust the width as needed
    height: 400, // Adjust the height as needed
    resizeMode: "contain",
  },
  imageDescription: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 10,
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
    color: "#2196f3", // Match the text color in buttons
    marginBottom: 20,
  },
  soundWave: {
    width: 200,
    height: 10,
    backgroundColor: "#add8e6", // Light blue color for the sound wave
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default SadScreen;
