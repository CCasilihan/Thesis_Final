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

const AggressiveScreen = () => {
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
          source={require("../assets/dogpics/aggressive.png")} // Replace with your image path
          style={styles.image}
        />
        {/* <TypingText
          text="An aggressive dog's bark is loud, forceful, and forceful, 
          often with growling or snarling undertones. It's designed to intimidate 
          or assert control, signaling the dog's threat, defensiveness, or guarding its territory."
          style={styles.imageDescription}
        /> */}
      </View>
      <Text style={styles.title}>Aggressive</Text>
      <Text style={styles.description}>
        This screen shows details about the Aggressive emotion in dogs.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive2.wav"), "Aggressive Type 1")}
        >
          <Text style={styles.buttonText}>Aggressive Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive3.wav"), "Aggressive Type 2")}
        >
          <Text style={styles.buttonText}>Aggressive Type 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive4.wav"), "Aggressive Type 3")}
        >
          <Text style={styles.buttonText}>Aggressive Type 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive5.wav"), "Aggressive Type 4")}
        >
          <Text style={styles.buttonText}>Aggressive Type 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive6.wav"), "Aggressive Type 5")}
        >
          <Text style={styles.buttonText}>Aggressive Type 5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive7.wav"), "Aggressive Type 6")}
        >
          <Text style={styles.buttonText}>Aggressive Type 6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive8.wav"), "Aggressive Type 7")}
        >
          <Text style={styles.buttonText}>Aggressive Type 7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive9.wav"), "Aggressive Type 8")}
        >
          <Text style={styles.buttonText}>Aggressive Type 8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/Aggressive10.wav"), "Aggressive Type 9")}
        >
          <Text style={styles.buttonText}>Aggressive Type 9</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/2aggressive2.wav"), "Aggressive Type 11")}
        >
          <Text style={styles.buttonText}>Aggressive Type 11</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcc80" }]} // Light orange color
          onPress={() => playSound(require("../dataset/2aggressive3.wav"), "Aggressive Type 12")}
        >
          <Text style={styles.buttonText}>Aggressive Type 12</Text>
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
    backgroundColor: "#ff9800", // Orange background color
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20, // Add some padding at the bottom to ensure content isn't cut off
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 600,
    height: 300,
    resizeMode: "contain",
  },
  imageDescription: {
    fontSize: 14,
    color: "white",
    marginTop: 10,
    textAlign: "center",
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
    width: "80%",
    paddingBottom: 20, // Add some padding at the bottom of the button container
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
    color: "#ff9800", // Match the text color in buttons
    marginBottom: 20,
  },
  soundWave: {
    width: 200,
    height: 10,
    backgroundColor: "#ffcc80", // Light orange color for the sound wave
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AggressiveScreen;
