import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const FlashScreen1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.flashscreen2}>
      <View style={[styles.ellipseParent, styles.ellipseParentLayout]}>
        <Image
          style={styles.groupChild}
          contentFit="cover"
          source={require("../assets/newlogo.png")}
        />
        <Text style={[styles.barkSoundRecognition, styles.getStartedTypo]}>
          BARK SOUND RECOGNITION
        </Text>
        <Text style={[styles.listenToYour, styles.yourTypo]}>
          Listen to Your Dog's Voice
        </Text>
      </View>
      <Image
        style={[styles.flashscreen2Child, styles.wrapperLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-5.png")}
      />
      <Pressable
        style={[styles.wrapper, styles.wrapperLayout]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-5.png")}
        />
      </Pressable>
      <View
        style={[
          styles.soundWaveIconSymbolSpeakerParent,
          styles.soundIconLayout,
        ]}
      >
        <Image
          style={[styles.soundWaveIconSymbolSpeaker, styles.soundIconLayout]}
          contentFit="cover"
          source={require("../assets/soundwaveiconsymbolspeaker260nw2195671857removebgpreview-2.png")}
        />
        <Pressable
          style={[styles.rectangleParent, styles.groupItemLayout]}
          onPress={() => navigation.navigate("Description1")} // Navigating to Description1 screen
        >
          <View style={[styles.groupItem, styles.groupItemLayout]} />
          <Text style={[styles.getStarted, styles.getStartedTypo]}>
            Get Started
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.understandingYourDogs, styles.yourTypo]}>
        Understanding Your Dog's Feelings
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ellipseParentLayout: {
    width: 368,
    left: 0,
  },
  getStartedTypo: {
    textAlign: "center",
    color: Color.colorBlack,
    fontWeight: "200",
    position: "absolute",
  },
  yourTypo: {
    fontFamily: FontFamily.comicSansMS,
    textAlign: "center",
    color: Color.colorBlack,
    fontWeight: "700",
    position: "absolute",
  },
  wrapperLayout: {
    height: 477,
    width: 530,
    top: 381,
    position: "absolute",
  },
  soundIconLayout: {
    width: 397,
    position: "absolute",
  },
  groupItemLayout: {
    height: 45,
    width: 152,
    position: "absolute",
  },
  groupChild: {
    width: 290,
    height: 242,
    left: 31,
    top: 0,
    position: "absolute",
  },
  barkSoundRecognition: {
    top: 242,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.oswaldBold,
    height: 90,
    width: 368,
    left: 0,
  },
  listenToYour: {
    top: 294,
    left: 41,
    width: 294,
    height: 38,
    fontSize: FontSize.size_mini,
  },
  ellipseParent: {
    top: 49,
    height: 332,
    position: "absolute",
  },
  flashscreen2Child: {
    left: -85,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: -70,
  },
  soundWaveIconSymbolSpeaker: {
    height: 164,
    top: 0,
    left: 0,
  },
  groupItem: {
    backgroundColor: "#008000",
    top: 0,
    left: 0,
  },
  getStarted: {
    top: 12,
    left: 13,
    fontFamily: FontFamily.sourceSansPro,
    width: 126,
    height: 21,
    fontSize: FontSize.size_mini,
  },
  rectangleParent: {
    top: 273,
    left: 123,
  },
  soundWaveIconSymbolSpeakerParent: {
    top: 408,
    left: -13,
    height: 318,
  },
  understandingYourDogs: {
    top: 597,
    fontSize: FontSize.size_xl,
    width: 328,
    height: 55,
    left: 31,
  },
  flashscreen2: {
    backgroundColor: Color.colorDodgerblue,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default FlashScreen1;





// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Text, View, Pressable } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Color, FontFamily, FontSize } from "../GlobalStyles";

// const FlashScreen1 = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.flashscreen2}>
//       <View style={[styles.ellipseParent, styles.ellipseParentLayout]}>
//         <Image
//           style={styles.groupChild}
//           contentFit="cover"
//           source={require("../assets/ellipse-21.png")}
//         />
//         <Text style={[styles.barkSoundRecognition, styles.getStartedTypo]}>
//           BARK SOUND RECOGNITION
//         </Text>
//         <Text style={[styles.listenToYour, styles.yourTypo]}>
//           Listen to Your Dog's Voice
//         </Text>
//       </View>
//       <Image
//         style={[styles.flashscreen2Child, styles.wrapperLayout]}
//         contentFit="cover"
//         source={require("../assets/ellipse-5.png")}
//       />
//       <Pressable
//         style={[styles.wrapper, styles.wrapperLayout]}
//         onPress={() => navigation.goBack()}
//       >
//         <Image
//           style={styles.icon}
//           contentFit="cover"
//           source={require("../assets/ellipse-5.png")}
//         />
//       </Pressable>
//       <View
//         style={[
//           styles.soundWaveIconSymbolSpeakerParent,
//           styles.soundIconLayout,
//         ]}
//       >
//         <Image
//           style={[styles.soundWaveIconSymbolSpeaker, styles.soundIconLayout]}
//           contentFit="cover"
//           source={require("../assets/soundwaveiconsymbolspeaker260nw2195671857removebgpreview-2.png")}
//         />
//         <Pressable
//           style={[styles.rectangleParent, styles.groupItemLayout]}
//           onPress={() => navigation.navigate("DashBoard")}
//         >
//           <View style={[styles.groupItem, styles.groupItemLayout]} />
//           <Text style={[styles.getStarted, styles.getStartedTypo]}>
//             Get Started
//           </Text>
//         </Pressable>
//       </View>
//       <Text style={[styles.understandingYourDogs, styles.yourTypo]}>
//         Understanding Your Dog's Feelings
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   ellipseParentLayout: {
//     width: 368,
//     left: 0,
//   },
//   getStartedTypo: {
//     textAlign: "center",
//     color: Color.colorBlack,
//     fontWeight: "700",
//     position: "absolute",
//   },
//   yourTypo: {
//     fontFamily: FontFamily.comicSansMS,
//     textAlign: "center",
//     color: Color.colorBlack,
//     fontWeight: "700",
//     position: "absolute",
//   },
//   wrapperLayout: {
//     height: 477,
//     width: 530,
//     top: 381,
//     position: "absolute",
//   },
//   soundIconLayout: {
//     width: 397,
//     position: "absolute",
//   },
//   groupItemLayout: {
//     height: 45,
//     width: 152,
//     position: "absolute",
//   },
//   groupChild: {
//     width: 290,
//     height: 242,
//     left: 31,
//     top: 0,
//     position: "absolute",
//   },
//   barkSoundRecognition: {
//     top: 242,
//     fontSize: FontSize.size_5xl,
//     fontFamily: FontFamily.oswaldBold,
//     height: 90,
//     width: 368,
//     left: 0,
//   },
//   listenToYour: {
//     top: 294,
//     left: 41,
//     width: 294,
//     height: 38,
//     fontSize: FontSize.size_mini,
//   },
//   ellipseParent: {
//     top: 49,
//     height: 332,
//     position: "absolute",
//   },
//   flashscreen2Child: {
//     left: -85,
//   },
//   icon: {
//     height: "100%",
//     width: "100%",
//   },
//   wrapper: {
//     left: -70,
//   },
//   soundWaveIconSymbolSpeaker: {
//     height: 164,
//     top: 0,
//     left: 0,
//   },
//   groupItem: {
//     backgroundColor: "#008000",
//     top: 0,
//     left: 0,
//   },
//   getStarted: {
//     top: 12,
//     left: 13,
//     fontFamily: FontFamily.sourceSansPro,
//     width: 126,
//     height: 21,
//     fontSize: FontSize.size_mini,
//   },
//   rectangleParent: {
//     top: 273,
//     left: 123,
//   },
//   soundWaveIconSymbolSpeakerParent: {
//     top: 408,
//     left: -13,
//     height: 318,
//   },
//   understandingYourDogs: {
//     top: 597,
//     fontSize: FontSize.size_xl,
//     width: 328,
//     height: 55,
//     left: 31,
//   },
//   flashscreen2: {
//     backgroundColor: Color.colorDodgerblue,
//     flex: 1,
//     height: 800,
//     overflow: "hidden",
//     width: "100%",
//   },
// });

// export default FlashScreen1;
