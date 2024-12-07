import React from "react";
import { Image, StyleSheet, ScrollView, View, Text, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const angerImage = require("../assets/dogpics/angry.png");
const sadImage = require("../assets/dogpics/sad.png");
const aggressiveImage = require("../assets/dogpics/aggressive.png");
const hungryImage = require("../assets/dogpics/growling.png");
const painImage = require("../assets/dogpics/pain.png");
const alertnessImage = require("../assets/dogpics/alertness.png");
const happyImage = require("../assets/dogpics/happy.png");

const { width } = Dimensions.get('window');

const Sound = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sound}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Different Emotions Barks of DOGS</Text>
      </View>
      
      {/* Add a background container for the description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Explore various emotional states of dogs through their barking patterns.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.emotionContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Each emotion block */}
        <View style={styles.emotionWrapper}>
          <Pressable
            style={[styles.emotionRectangle, { backgroundColor: '#f44336' }]}
            onPress={() => navigation.navigate("AngerScreen")}
          >
            <Image source={angerImage} style={styles.emotionImage} />
            <Text style={styles.emotionLabel}>Anger</Text>
          </Pressable>
          <Text style={styles.emotionDescription}>This represents angry barking.</Text>
        </View>

        <View style={styles.emotionWrapper}>
          <Pressable
            style={[styles.emotionRectangle, { backgroundColor: '#2196f3' }]}
            onPress={() => navigation.navigate("SadScreen")}
          >
            <Image source={sadImage} style={styles.emotionImage} />
            <Text style={styles.emotionLabel}>Sad</Text>
          </Pressable>
          <Text style={styles.emotionDescription}>This represents sad barking.</Text>
        </View>

        <View style={styles.emotionWrapper}>
          <Pressable
            style={[styles.emotionRectangle, { backgroundColor: '#FFA500' }]}
            onPress={() => navigation.navigate("AggressiveScreen")}
          >
            <Image source={aggressiveImage} style={styles.emotionImage} />
            <Text style={styles.emotionLabel}>Aggressive</Text>
          </Pressable>
          <Text style={styles.emotionDescription}>This represents aggressive barking.</Text>
        </View>

        <View style={styles.emotionWrapper}>
          <Pressable
            style={[styles.emotionRectangle, { backgroundColor: '#008000' }]}
            onPress={() => navigation.navigate("GrowlingScreen")}
          >
            <Image source={hungryImage} style={styles.emotionImage} />
            <Text style={styles.emotionLabel}>Growling</Text>
          </Pressable>
          <Text style={styles.emotionDescription}>This represents growling barking.</Text>
        </View>

        <View style={styles.emotionWrapper}>
          <Pressable
            style={[styles.emotionRectangle, { backgroundColor: '#7D137D' }]}
            onPress={() => navigation.navigate("PainScreen")}
          >
            <Image source={painImage} style={styles.emotionImage} />
            <Text style={styles.emotionLabel}>Pain</Text>
          </Pressable>
          <Text style={styles.emotionDescription}>This represents barking due to pain.</Text>
        </View>

        <View style={styles.emotionWrapper}>
          <Pressable
            style={[styles.emotionRectangle, { backgroundColor: '#1C753A' }]}
            onPress={() => navigation.navigate("AlertnessScreen")}
          >
            <Image source={alertnessImage} style={styles.emotionImage} />
            <Text style={styles.emotionLabel}>Alertness</Text>
          </Pressable>
          <Text style={styles.emotionDescription}>This represents alert barking.</Text>
        </View>

        <View style={styles.emotionWrapper}>
          <Pressable
            style={[styles.emotionRectangle, { backgroundColor: '#FFFF00' }]}
            onPress={() => navigation.navigate("HappyScreen")}
          >
            <Image source={happyImage} style={styles.emotionImage} />
            <Text style={styles.emotionLabel}>Happy</Text>
          </Pressable>
          <Text style={styles.emotionDescription}>This represents happy barking.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sound: {
    backgroundColor: Color.colorDodgerblue,
    flex: 1,
  },
  titleContainer: {
    // backgroundColor: Color.colorWhite,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    borderRadius: Border.br_21xl,
  },
  title: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "500",
    color: Color.colorBlack,
    textAlign: "center",
  },
  descriptionContainer: {
    // backgroundColor: Color.colorWhite,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: Border.br_21xl,
    marginBottom: 10,
  },
  description: {
    fontSize: FontSize.size_small,
    fontFamily: FontFamily.quicksandRegular,
    color: Color.colorGray,
    textAlign: "center",
  },
  emotionContainer: {
    paddingVertical: 5,
    paddingBottom: 20,
    alignItems: "center",
  },
  emotionWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  emotionRectangle: {
    width: width * 0.8,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Border.br_21xl,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  emotionImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  emotionLabel: {
    position: "absolute",
    bottom: 10,
    textAlign: "center",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    color: Color.colorWhite,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: Border.br_8xl,
  },
  emotionDescription: {
    marginTop: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
    // backgroundColor: "#2196F3",
    color: Color.colorWhite,
    fontSize: FontSize.size_small,
    fontFamily: FontFamily.quicksandRegular,
    borderRadius: Border.br_8xl,
    textAlign: "center",
  },
});

export default Sound;



















// import * as React from "react";
// import { Image, StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

// // Assuming you have imported images for each emotion
// const angerImage = require("../assets/Angry.jpg");
// const sadImage = require("../assets/sad.jpeg");
// const aggressiveImage = require("../assets/Aggression.jpeg");
// const hungryImage = require("../assets/Hungry.jpeg");
// const painImage = require("../assets/pain.jpg");
// const alertnessImage = require("../assets/Angry.jpg");
// const happyImage = require("../assets/happy.jpg");

// const { width } = Dimensions.get('window');

// const Sound = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.sound}>
//       <Text style={styles.title}>Different Emotions Barks of DOGS</Text>
//       <ScrollView contentContainerStyle={styles.emotionContainer}>
//         <View style={[styles.emotionRectangle, { backgroundColor: '#f44336' }]}>
//           <Image source={angerImage} style={styles.emotionImage} />
//           <Text style={styles.emotionLabel}>Anger</Text>
//         </View>
//         <View style={[styles.emotionRectangle, { backgroundColor: '#2196f3' }]}>
//           <Image source={sadImage} style={styles.emotionImage} />
//           <Text style={styles.emotionLabel}>Sad</Text>
//         </View>
//         <View style={[styles.emotionRectangle, { backgroundColor: '#009688' }]}>
//           <Image source={aggressiveImage} style={styles.emotionImage} />
//           <Text style={styles.emotionLabel}>Aggressive</Text>
//         </View>
//         <View style={[styles.emotionRectangle, { backgroundColor: '#ffc107' }]}>
//           <Image source={hungryImage} style={styles.emotionImage} />
//           <Text style={styles.emotionLabel}>Hungry</Text>
//         </View>
//         <View style={[styles.emotionRectangle, { backgroundColor: '#e91e63' }]}>
//           <Image source={painImage} style={styles.emotionImage} />
//           <Text style={styles.emotionLabel}>Pain</Text>
//         </View>
//         <View style={[styles.emotionRectangle, { backgroundColor: '#ff9800' }]}>
//           <Image source={alertnessImage} style={styles.emotionImage} />
//           <Text style={styles.emotionLabel}>Growling</Text>
//         </View>
//         <View style={[styles.emotionRectangle, { backgroundColor: '#ffeb3b' }]}>
//           <Image source={happyImage} style={styles.emotionImage} />
//           <Text style={styles.emotionLabel}>Happy</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   sound: {
//     backgroundColor: Color.colorWhite,
//     flex: 1,
//   },
//   title: {
//     fontSize: FontSize.size_xl,
//     fontFamily: FontFamily.quicksandBold,
//     fontWeight: "700",
//     color: Color.colorBlack,
//     marginTop: 40, // Add some top margin for better title visibility
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   emotionContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingBottom: 20,
//   },
//   emotionRectangle: {
//     width: width * 0.9, // Adjusted width to be responsive
//     height: 200, // Increased height for better image fit
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 10,
//     borderRadius: Border.br_21xl,
//     overflow: "hidden", // Ensure images don't overflow the rectangle
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5, // Added elevation for better card appearance on Android
//   },
//   emotionImage: {
//     width: "100%",
//     height: "100%", // Adjusted to fill the card
//     resizeMode: "cover",
//   },
//   emotionLabel: {
//     position: "absolute",
//     bottom: 10,
//     textAlign: "center",
//     fontSize: FontSize.size_mini,
//     fontFamily: FontFamily.quicksandBold,
//     fontWeight: "700",
//     color: Color.colorWhite, // Changed to white for better contrast
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Added background for label visibility
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     borderRadius: Border.br_8xl,
//   },
// });

// export default Sound;
