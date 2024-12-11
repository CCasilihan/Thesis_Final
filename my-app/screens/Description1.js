import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your local image
const localImage = require('../assets/dis1.png'); // Update the path to your image

const Description1 = () => {
  const navigation = useNavigation();
  const fullDescription = 
    "Bark Sound Recognition helps you understand your dog’s feelings by analyzing their barks. " +
    "Whether they’re happy, sad, or alert, this tool listens and tells you what emotion your dog is expressing, " +
    "making it easier to care for and connect with your furry friend.";

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullDescription.length) {
        setDisplayedText(prev => prev + fullDescription[currentIndex]);
        currentIndex += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust the speed of typing by changing this value (in milliseconds)

    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Add the Image component */}
      <Image source={localImage} style={styles.image} />

      <Text style={styles.tagline}>Unlock your dog’s emotions through their barks!</Text>
      
      {/* Container for the description with background color */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {displayedText}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Description2')} // Navigate to Description2
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285F4', // Set background color here
    padding: 20, // Add some padding for better layout
  },
  image: {
    width: '100%', // Adjust the width to fit the screen
    height: 250, // Set a fixed height for the image
    marginBottom: 20, // Space below the image
  },
  tagline: {
    fontSize: 24, // Font size for the tagline
    color: 'white', // Color of the tagline
    marginBottom: 20, // Space below the tagline
    textAlign: 'left', // Align the tagline text
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: '#D9D9D9', // Background color for the description
    borderRadius: 10, // Rounded corners for the container
    padding: 20, // Padding inside the container
    marginBottom: 100, // Space below the description container
    width: '100%', // Set width to fill available space
  },
  description: {
    fontSize: 16, // Font size for the description
    color: 'black', // Change text color to black for better readability
    textAlign: 'left', // Align the description text
  },
  button: {
    position: 'absolute',
    right: 20, // Distance from the right edge
    bottom: 50, // Distance from the bottom edge
    backgroundColor: 'white', // Button background color
    borderRadius: 5, // Rounded corners for the button
    padding: 10, // Button padding
  },
  buttonText: {
    color: '#4285F4', // Text color for the button
    fontSize: 16, // Font size for the button text
  },
});

export default Description1;
