import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const DashBoard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.dashboard}>
      {/* Static Transparent Box with Description */}
      <View style={styles.textContainer}>
        <Text style={styles.tagline}>Unlock Every Bark’s Meaning!</Text>
        <Text style={styles.description}>
          Explore your dog's emotions through various bark sounds, and record
          them for analysis. This feature helps you understand their feelings
          and respond accordingly.
        </Text>
      </View>

      <View style={styles.vectorParent}>
        <Pressable
          style={[styles.wrapper, styles.frameLayout]}
          onPress={() => navigation.navigate("Sound")}
        />
        <Pressable
          style={[styles.container, styles.frameLayout]}
          onPress={() => navigation.navigate("StartRecordings")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-15.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.frame, styles.frameLayout]}
          onPress={() => navigation.navigate("SoundMeans")}
        >
          <Image
            style={[styles.icon2, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-14.png")}
          />
        </Pressable>
        <Text style={[styles.recordEmotion, styles.barkSoundTypo]}>
          Record Emotion
        </Text>
        <Text style={[styles.soundsDefinition, styles.barkSoundTypo]}>
          Different Sounds
        </Text>
        <Text style={[styles.chooseOption, styles.barkSoundTypo]}>
          Choose Option
        </Text>
      </View>

      {/* Transparent Picture with 10% Opacity */}
      <Image
        style={[styles.dashboardItem, { opacity: 0.10 }]}
        contentFit="cover"
        source={require("../assets/rectangle-23.png")}
      />

      <View style={styles.dashboardInner} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: FontSize.size_xl,
    color: "teal",
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 90,
  },
  tagline: {
    fontSize: FontSize.size_xl,
    color: "teal",
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },
  description: {
    fontSize: FontSize.size_mini,
    color: "black",
    textAlign: "center",
    maxWidth: 250,
  },
  frameLayout: {
    height: 147,
    width: 146,
    left: "50%",
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    borderRadius: Border.br_36xl,
    width: "100%",
  },
  barkSoundTypo: {
    height: 24,
    width: 153,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.quicksandBold,
    fontWeight: "700",
    left: "50%",
    position: "absolute",
  },
  wrapper: {
    top: 43,
    backgroundColor: Color.colorOrange,
    borderRadius: Border.br_36xl,
  },
  icon1: {
    marginLeft: -75.5,
    backgroundColor: Color.colorTeal,
  },
  container: {
    top: 239,
    backgroundColor: Color.colorRed,
    borderRadius: Border.br_36xl,
  },
  icon2: {
    marginLeft: -75.5,
    backgroundColor: Color.colorYellow,
  },
  frame: {
    top: 44,
    backgroundColor: Color.colorPurple,
    borderRadius: Border.br_36xl,
  },
  recordEmotion: {
    marginLeft: -75.5,
    top: 399,
    fontSize: FontSize.size_mini,
  },
  soundsDefinition: {
    marginLeft: -75.5,
    top: 198,
    fontSize: FontSize.size_mini,
  },
  chooseOption: {
    marginLeft: -81.5,
    top: 0,
    fontSize: FontSize.size_xl,
  },
  vectorParent: {
    marginLeft: -163,
    top: 325,
    width: 331,
    height: 423,
    left: "50%",
    position: "absolute",
  },
  dashboardItem: {
    top: 18,
    left: -4,
    width: 364,
    height: 288,
    position: "absolute",
  },
  dashboardInner: {
    top: 155,
    left: 0,
    backgroundColor: Color.lightBlue,
    width: 360,
    height: 61,
    position: "absolute",
  },
  dashboard: {
    backgroundColor: Color.lightBlue,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default DashBoard;










// import * as React from "react";
// import { Image } from "expo-image";
// import { StyleSheet, Pressable, Text, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

// const DashBoard = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.dashboard}>
//       <Image
//         style={styles.dashboardChild}
//         contentFit="cover"
//         source={require("../assets/ellipse-12.png")}
//       />
//       <View style={styles.vectorParent}>
//         <Pressable
//           style={[styles.wrapper, styles.frameLayout]}
//           onPress={() => navigation.navigate("Sound")}
//         >
//           {/* <Image
//             style={[styles.icon, styles.iconLayout]}
//             contentFit="cover"
//             source={require("../assets/rectangle-14.png")}
//           /> */}
//         </Pressable>
//         <Pressable
//           style={[styles.container, styles.frameLayout]}
//           onPress={() => navigation.navigate("StartRecordings")}
//         >
//           <Image
//             style={[styles.icon1, styles.iconLayout]}
//             contentFit="cover"
//             source={require("../assets/rectangle-15.png")}
//           />
//         </Pressable>
//         <Pressable
//           style={[styles.frame, styles.frameLayout]}
//           onPress={() => navigation.navigate("SoundMeans")}
//         >
//           <Image
//             style={[styles.icon2, styles.iconLayout]}
//             contentFit="cover"
//             source={require("../assets/rectangle-14.png")}
//           />
//         </Pressable>
//         <Text style={[styles.recordEmotion, styles.barkSoundTypo]}>
//           Record Emotion
//         </Text>
//         {/* <Text style={[styles.barkSound, styles.barkSoundTypo]}>
//           {" "}
//        Manual 
//         </Text> */}
//         <Text style={[styles.soundsDefinition, styles.barkSoundTypo]}>
//          Different Sounds
//         </Text>
//         <Text style={[styles.chooseOption, styles.barkSoundTypo]}>
//           Choose Option
//         </Text>
//       </View>
//       <Image
//         style={styles.dashboardItem}
//         contentFit="cover"
//         source={require("../assets/rectangle-23.png")}
//       />
//       <View style={styles.dashboardInner} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   frameLayout: {
//     height: 147,
//     width: 146,
//     left: "50%",
//     position: "absolute",
//   },
//   iconLayout: {
//     height: "100%",
//     borderRadius: Border.br_36xl,
//     width: "100%",
//   },
//   barkSoundTypo: {
//     height: 24,
//     width: 153,
//     textAlign: "center",
//     color: Color.colorBlack,
//     fontFamily: FontFamily.quicksandBold,
//     fontWeight: "700",
//     left: "50%",
//     position: "absolute",
//   },
//   dashboardChild: {
//     top: 306,
//     left: -105,
//     width: 565,
//     height: 691,
//     position: "absolute",
//   },
//   icon: {
//     marginLeft: 12.5,
//   },
//   wrapper: {
//     top: 43,
//   },
//   icon1: {
//     marginLeft: -75.5,
//   },
//   container: {
//     top: 239,
//   },
//   icon2: {
//     marginLeft: -75.5,
//   },
//   frame: {
//     top: 44,
//   },
//   recordEmotion: {
//     marginLeft: -75.5,
//     top: 399,
//     fontSize: FontSize.size_mini,
//     width: 153,
//     textAlign: "center",
//     color: Color.colorBlack,
//     fontFamily: FontFamily.quicksandBold,
//     fontWeight: "700",
//   },
//   // barkSound: {
//   //   top: 202,
//   //   fontSize: FontSize.size_mini,
//   //   width: 153,
//   //   textAlign: "center",
//   //   color: Color.colorBlack,
//   //   fontFamily: FontFamily.quicksandBold,
//   //   fontWeight: "700",
//   //   marginLeft: 12.5,
//   // },
//   soundsDefinition: {
//     marginLeft: -75.5,
//     top: 198,
//     fontSize: FontSize.size_mini,
//     width: 153,
//     textAlign: "center",
//     color: Color.colorBlack,
//     fontFamily: FontFamily.quicksandBold,
//     fontWeight: "700",
//   },
//   chooseOption: {
//     marginLeft: -81.5,
//     top: 0,
//     fontSize: FontSize.size_xl,
//   },
//   vectorParent: {
//     marginLeft: -163,
//     top: 325,
//     width: 331,
//     height: 423,
//     left: "50%",
//     position: "absolute",
//   },
//   dashboardItem: {
//     top: 18,
//     left: -4,
//     width: 364,
//     height: 288,
//     position: "absolute",
//   },
//   dashboardInner: {
//     top: 155,
//     left: 0,
//     backgroundColor: "rgba(217, 217, 217, 0.5)",
//     width: 360,
//     height: 61,
//     position: "absolute",
//   },
//   dashboard: {
//     backgroundColor: Color.colorDodgerblue,
//     flex: 1,
//     height: 800,
//     overflow: "hidden",
//     width: "100%",
//   },
// });

// export default DashBoard;
