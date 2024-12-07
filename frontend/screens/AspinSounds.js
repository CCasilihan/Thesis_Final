// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontSize, FontFamily, Color } from "../GlobalStyles";
// import WaveForm from 'react-native-audiowaveform'; // Importing the WaveForm component

// const AspinSounds = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.aspinSounds}>
//       <Pressable
//         style={styles.wrapper}
//         onPress={() => navigation.navigate("Sound")}
//       >
//         <Image
//           style={styles.icon}
//           contentFit="cover"
//           source={require("../assets/ellipse-121.png")}
//         />
//       </Pressable>
//       <Image
//         style={styles.aspinSoundsChild}
//         contentFit="cover"
//         source={require("../assets/ellipse-15.png")}
//       />
//       <Image
//         style={styles.dogBreedsRemovebgPreview2Icon}
//         contentFit="cover"
//         source={require("../assets/dogbreedsremovebgpreview-2.png")}
//       />
//       <Text style={styles.aspin}>ASPIN</Text>

//       {/* Integrating the WaveForm component */}
//       <WaveForm 
//         source={require('./path/to/your/file.mp3')}  
//         waveFormStyle={{ waveColor:'red', scrubColor:'white' }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   icon: {
//     height: "100%",
//     width: "100%",
//   },
//   wrapper: {
//     left: 10,
//     top: 38,
//     width: 27,
//     height: 27,
//     position: "absolute",
//   },
//   aspinSoundsChild: {
//     top: 265,
//     left: -14,
//     width: 387,
//     height: 393,
//     opacity: 0.8,
//     position: "absolute",
//   },
//   dogBreedsRemovebgPreview2Icon: {
//     top: 65,
//     left: 0,
//     width: 377,
//     height: 188,
//     position: "absolute",
//   },
//   aspin: {
//     top: 134,
//     left: 116,
//     fontSize: FontSize.size_21xl,
//     fontWeight: "700",
//     fontFamily: FontFamily.quicksandBold,
//     color: Color.colorWhite,
//     textAlign: "center",
//     position: "absolute",
//   },
//   aspinSounds: {
//     backgroundColor: Color.colorDodgerblue,
//     flex: 1,
//     height: 800,
//     overflow: "hidden",
//     width: "100%",
//   },
// });

// export default AspinSounds;




import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const AspinSounds = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.aspinSounds}>
      <Pressable
        style={styles.wrapper}
        onPress={() => navigation.navigate("Sound")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-121.png")}
        />
      </Pressable>
      <Image
        style={styles.aspinSoundsChild}
        contentFit="cover"
        source={require("../assets/ellipse-15.png")}
      />
      <Image
        style={styles.dogBreedsRemovebgPreview2Icon}
        contentFit="cover"
        source={require("../assets/dogbreedsremovebgpreview-2.png")}
      />
      <Text style={styles.aspin}>ASPIN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: 10,
    top: 38,
    width: 27,
    height: 27,
    position: "absolute",
  },
  aspinSoundsChild: {
    top: 265,
    left: -14,
    width: 387,
    height: 393,
    opacity: 0.8,
    position: "absolute",
  },
  dogBreedsRemovebgPreview2Icon: {
    top: 65,
    left: 0,
    width: 377,
    height: 188,
    position: "absolute",
  },
  aspin: {
    top: 134,
    left: 116,
    fontSize: FontSize.size_21xl,
    fontWeight: "700",
    fontFamily: FontFamily.quicksandBold,
    color: Color.colorWhite,
    textAlign: "center",
    position: "absolute",
  },
  aspinSounds: {
    backgroundColor: Color.colorDodgerblue,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default AspinSounds;
