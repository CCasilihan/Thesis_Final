import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Button } from "react-native";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";

// TypingText component to create a typing effect
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

const AlertnessScreen = () => {
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
          source={require("../assets/dogpics/alertness.png")} // Adjust the path as needed
          style={styles.image}
        />
        {/* <TypingText
          text="An alert dog's bark is sharp, crisp, and attention-grabbing, 
          signaling heightened awareness and vigilance. Its higher pitch and 
          quick, precise barks indicate unusual or noteworthy detection. This
          less aggressive bark is accompanied by an attentive posture, 
          indicating the dog's high alertness and monitoring of its environment."
          style={styles.imageDescription}
        /> */}
      </View>
      <Text style={styles.title}>Alertness</Text>
      <TypingText
        text="This screen shows details about the Alertness emotion in dogs."
        style={styles.description}
      />
      <View style={styles.buttonContainer}>
        {/* Buttons for different sound types */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/Warning1.wav"), "Alertness Type 1")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/Warning2.wav"), "Alertness Type 2")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/Warning3.wav"), "Alertness Type 3")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/Warning4.wav"), "Alertness Type 4")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness.wav"), "Alertness Type 5")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness1.wav"), "Alertness Type 6")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 6</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness2.wav"), "Alertness Type 7")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 7</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness3.wav"), "Alertness Type 8")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 8</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness4.wav"), "Alertness Type 9")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 9</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness5.wav"), "Alertness Type 10")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 10</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness6.wav"), "Alertness Type 11")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 11</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness7.wav"), "Alertness Type 12")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 12</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness8.wav"), "Alertness Type 13")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 13</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness9.wav"), "Alertness Type 14")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 14</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/2alertness10.wav"), "Alertness Type 15")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Alertness Type 15</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004d40", // Dark green background color
    padding: 20, // Add padding to avoid edges
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20, // Space between image and text
  },
  image: {
    width: 400, // Adjust width as needed
    height: 400, // Adjust height as needed
    resizeMode: "contain", // Keep the image's aspect ratio
  },
  imageDescription: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%", // Adjust as needed
    paddingBottom: 20, // Add padding at the bottom to ensure the last buttons are visible
  },
  button: {
    backgroundColor: "#4db6ac", // Light blue-green color
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
    color: "#004d40", // Match the text color to the screen background
    marginBottom: 20,
  },
  soundWave: {
    width: 200,
    height: 10,
    backgroundColor: "#4db6ac", // Light blue-green color for the sound wave
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AlertnessScreen;
