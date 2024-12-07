import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";
 
const FlashScreen = () => {
  const navigation = useNavigation();

  // Use useEffect to navigate after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("FlashScreen1");
    }, 3000); // 3000 ms = 3 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.flashscreen1}>
      {/* Centered Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={require("../assets/newlogo.png")} // Update to your image path
          style={styles.image} 
        />
      </View>

      {/* Text elements */}
      {/* <View style={styles.textContainer}>
        <Text style={[styles.barkSoundRecognition, styles.listenToYourTypo]}>
          BARK SOUND RECOGNITION
        </Text>
        <Text style={[styles.listenToYour, styles.listenToYourTypo]}>
          DOG INSIDE OUT
        </Text> 
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  listenToYourTypo: {
    textAlign: "center",
    color: Color.colorBlack,
    fontWeight: "700",
    position: "absolute",
  },
  barkSoundRecognition: {
    top: 264,
    left: 0,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.oswaldBold,
    height: 98,
    width: 403,
  },
  listenToYour: {
    top: 321,
    left: 45,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.comicSansMS,
    width: 322,
    height: 41,
  },
  textContainer: {
    top: 239,
    left: -9,
    height: 362,
    width: 403,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  flashscreen1: {
    backgroundColor: Color.colorDodgerblue,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center the image horizontally
  },
  image: {
    width: 300, // Adjust the width of the image
    height: 300, // Adjust the height of the image
    resizeMode: "contain", // Ensures the image fits within the dimensions
  },
});

export default FlashScreen;









// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Text, View, Pressable } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Color, FontSize, FontFamily } from "../GlobalStyles";

// const FlashScreen = () => {
//   const navigation = useNavigation();

//   // Use useEffect to navigate after 3 seconds
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate("FlashScreen1");
//     }, 3000); // 3000 ms = 3 seconds

//     // Cleanup the timer if the component unmounts
//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.flashscreen1}>
//       <Image
//         style={styles.flashscreen1Child}
//         contentFit="cover"
//         source={require("../assets/ellipse-9.png")}
//       />
//       <View style={styles.ellipseParent}>
//         <Image
//           style={styles.groupChild}
//           contentFit="cover"
//           source={require("../assets/ellipse-2.png")}
//         />
//         <Text style={[styles.barkSoundRecognition, styles.listenToYourTypo]}>
//           BARK SOUND RECOGNITION
//         </Text>
//         <Text style={[styles.listenToYour, styles.listenToYourTypo]}>
//           DOG INSIDE OUT
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   listenToYourTypo: {
//     textAlign: "center",
//     color: Color.colorBlack,
//     fontWeight: "700",
//     position: "absolute",
//   },
//   flashscreen1Child: {
//     top: 157,
//     left: -99,
//     width: 557,
//     height: 485,
//     position: "absolute",
//   },
//   groupChild: {
//     top: 0,
//     left: 34,
//     width: 318,
//     height: 264,
//     position: "absolute",
//   },
//   barkSoundRecognition: {
//     top: 264,
//     left: 0,
//     fontSize: FontSize.size_5xl,
//     fontFamily: FontFamily.oswaldBold,
//     height: 98,
//     width: 403,
//   },
//   listenToYour: {
//     top: 321,
//     left: 45,
//     fontSize: FontSize.size_mini,
//     fontFamily: FontFamily.comicSansMS,
//     width: 322,
//     height: 41,
//   },
//   ellipseParent: {
//     top: 239,
//     left: -9,
//     height: 362,
//     width: 403,
//     position: "absolute",
//   },
//   flashscreen1: {
//     backgroundColor: Color.colorDodgerblue,
//     flex: 1,
//     width: "100%",
//     height: 800,
//     overflow: "hidden",
//   },
// });

// export default FlashScreen;
