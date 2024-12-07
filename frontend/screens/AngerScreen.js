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

const AngerScreen = () => {
  const [sound, setSound] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSound, setSelectedSound] = useState("");

  async function playSound(file, soundName) {
    const { sound } = await Audio.Sound.createAsync(file);
    setSound(sound);
    setSelectedSound(soundName);
    setModalVisible(true);
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
          source={require("../assets/dogpics/angry.png")} // Replace with your image path
        />
        {/* <TypingText
          text="An angry dog's bark is intense, deep, and forceful, 
          often accompanied by rapid bursts and growling or snarling undertones. 
          This aggressive signal indicates frustration or territorial defense."
          style={styles.imageDescription}
        /> */}
      </View>
      <Text style={styles.title}>Anger</Text>
      <Text style={styles.description}>
        This screen shows details about the Anger emotion in dogs.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger1.wav"), "Anger Type 1")}
        >
          <Text style={styles.buttonText}>Anger Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger2.wav"), "Anger Type 2")}
        >
          <Text style={styles.buttonText}>Anger Type 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger3.wav"), "Anger Type 3")}
        >
          <Text style={styles.buttonText}>Anger Type 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger4.wav"), "Anger Type 4")}
        >
          <Text style={styles.buttonText}>Anger Type 4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger5.wav"), "Anger Type 5")}
        >
          <Text style={styles.buttonText}>Anger Type 5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger6.wav"), "Anger Type 6")}
        >
          <Text style={styles.buttonText}>Anger Type 6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger7.wav"), "Anger Type 7")}
        >
          <Text style={styles.buttonText}>Anger Type 7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger8.wav"), "Anger Type 8")}
        >
          <Text style={styles.buttonText}>Anger Type 8</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/Anger9.wav"), "Anger Type 9")}
        >
          <Text style={styles.buttonText}>Anger Type 9</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry.wav"), "Anger Type 10")}
        >
          <Text style={styles.buttonText}>Anger Type 10</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry1.wav"), "Anger Type 11")}
        >
          <Text style={styles.buttonText}>Anger Type 11</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry2.wav"), "Anger Type 12")}
        >
          <Text style={styles.buttonText}>Anger Type 12</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry3.wav"), "Anger Type 13")}
        >
          <Text style={styles.buttonText}>Anger Type 13</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry4.wav"), "Anger Type 14")}
        >
          <Text style={styles.buttonText}>Anger Type 14</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry5.wav"), "Anger Type 15")}
        >
          <Text style={styles.buttonText}>Anger Type 15</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry6.wav"), "Anger Type 16")}
        >
          <Text style={styles.buttonText}>Anger Type 16</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry7.wav"), "Anger Type 17")}
        >
          <Text style={styles.buttonText}>Anger Type 17</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry8.wav"), "Anger Type 18")}
        >
          <Text style={styles.buttonText}>Anger Type 18</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry9.wav"), "Anger Type 19")}
        >
          <Text style={styles.buttonText}>Anger Type 19</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry10.wav"), "Anger Type 20")}
        >
          <Text style={styles.buttonText}>Anger Type 20</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry11.wav"), "Anger Type 21")}
        >
          <Text style={styles.buttonText}>Anger Type 21</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry12.wav"), "Anger Type 22")}
        >
          <Text style={styles.buttonText}>Anger Type 22</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ffcccc" }]} // Light red color
          onPress={() => playSound(require("../dataset/2angry13.wav"), "Anger Type 23")}
        >
          <Text style={styles.buttonText}>Anger Type 23 </Text>
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
    backgroundColor: "#f44336", // Background color
    paddingVertical: 20, // Add vertical padding to prevent content from touching edges
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 500, // Adjust the width as needed
    height: 400, // Adjust the height as needed
    resizeMode: "contain",
  },
  imageDescription: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginTop: 2,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    justifyContent: "space-between",
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
    color: "#8b0000", // Dark red text color for contrast
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
    color: "#8b0000", // Match the text color in buttons
    marginBottom: 20,
  },
  soundWave: {
    width: 200,
    height: 10,
    backgroundColor: "#ffcccc", // Light red color for the sound wave
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AngerScreen;
