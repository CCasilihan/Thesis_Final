import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Button } from "react-native";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";

const HappyScreen = () => {
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
          source={require("../assets/dogpics/happy.png")} // Replace with your image path
          style={styles.image}
        />
        {/* <Text style={styles.imageDescription}>
          A happy dog's bark is lively, enthusiastic, and cheerful. It has a 
          higher pitch, rhythmic and playful quality, accompanied by a wagging tail,
           relaxed posture, and friendly demeanor, indicating pleasure and eagerness to interact.
        </Text> */}
      </View>
      <Text style={styles.title}>Happy</Text> 
      <Text style={styles.description}>
        This screen shows details about the Happy emotion in dogs.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/Happy1.wav"), "Happy Type 1")}
        >
          <Text style={styles.buttonText}>Happy Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(require("../dataset/Happy2.wav"), "Happy Type 2")}
        >
          <Text style={styles.buttonText}>Happy Type 2</Text>
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
    backgroundColor: "#ffeb3b", // Yellow background color
    padding: 20, // Add padding to avoid content touching edges
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20, // Space between image and text
  },
  image: {
    width: 400, // Adjust the width as needed
    height: 400, // Adjust the height as needed
    resizeMode: "contain",
  },
  imageDescription: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: "black",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%", // Adjust as needed
    paddingBottom: 20, // Add padding at the bottom to ensure last buttons are visible
  },
  button: {
    backgroundColor: "#ffffe0", // Light yellow color
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "black", // Ensure text is readable on light yellow background
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
    color: "#ffeb3b", // Match the text color to the screen background
    marginBottom: 20,
  },
  soundWave: {
    width: 200,
    height: 10,
    backgroundColor: "#ffffe0", // Light yellow color for the sound wave
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default HappyScreen;
