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

const PainScreen = () => {
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
          source={require("../assets/dogpics/pain.png")} // Adjust the path as needed
          style={styles.image}
        />
        {/* <TypingText
          text="A dog's bark in pain is high-pitched, sharp, and distressed, 
          indicating discomfort and suffering. It may come in short bursts or a 
          continuous tone, accompanied by whimpering or yelping, indicating urgent 
          attention or medical care."
          style={styles.imageDescription}
        /> */}
      </View>
      <Text style={styles.title}>Pain/Scared</Text>
      <Text style={styles.description}>
        This screen shows details about the Pain emotion in dogs.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/Pain1.wav"), "Pain Type 1")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/Pain2.wav"), "Pain Type 2")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/Pain3.wav"), "Pain Type 3")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/Pain4.wav"), "Pain Type 4")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/Pain5.wav"), "Pain Type 5")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain.wav"), "Pain Type 6")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 6</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain1.wav"), "Pain Type 7")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 7</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain2.wav"), "Pain Type 8")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 8</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain3.wav"), "Pain Type 9")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 9</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain4.wav"), "Pain Type 10")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 10</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain5.wav"), "Pain Type 11")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 11</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain6.wav"), "Pain Type 12")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 12</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain7.wav"), "Pain Type 13")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 13</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain8.wav"), "Pain Type 14")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 14</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e1bee7" }]} // Light violet color
          onPress={() => playSound(require("../dataset/2pain9.wav"), "Pain Type 15")} // Adjust the path as needed
        >
          <Text style={styles.buttonText}>Pain Type 15</Text>
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
    backgroundColor: "#9c27b0", // Violet background color
    paddingVertical: 20, // Add vertical padding
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 400, // Adjust width as needed
    height: 400, // Adjust height as needed
    resizeMode: "contain",
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
    color: "#9c27b0", // Match the text color in buttons
    marginBottom: 20,
  },
  soundWave: {
    width: 200,
    height: 10,
    backgroundColor: "#e1bee7", // Light violet color for the sound wave
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default PainScreen;
