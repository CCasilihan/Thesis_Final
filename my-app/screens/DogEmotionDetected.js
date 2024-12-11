import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const DogEmotionDetected = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.dogEmotionDetected}>
      <Image
        style={styles.dogEmotionDetectedChild}
        contentFit="cover"
        source={require("../assets/ellipse-101.png")}
      />
      <Text style={[styles.text, styles.textTypo]}>05:02</Text>
      <Image
        style={styles.soundWaveIconSymbolSpeaker}
        contentFit="cover"
        source={require("../assets/soundwaveiconsymbolspeaker260nw2195671857removebgpreview-3.png")}
      />
      <View
        style={[styles.dogEmotionDetectedItem, styles.aggressivePosition]}
      />
      <Text style={[styles.aggressive, styles.aggressivePosition]}>
        Aggressive
      </Text>
      <View style={styles.dogEmotionDetectedInner} />
      <Text style={[styles.emotionDogDetected, styles.textTypo]}>{`Emotion Dog 
Detected`}</Text>
      <Image
        style={styles.ellipseIcon}
        contentFit="cover"
        source={require("../assets/ellipse-93.png")}
      />
      <Image
        style={styles.groupIcon}
        contentFit="cover"
        source={require("../assets/group-9.png")}
      />
      <Pressable
        style={[styles.wrapper, styles.wrapperLayout]}
        onPress={() => navigation.navigate("DashBoard")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.container, styles.wrapperLayout]}
        onPress={() => navigation.navigate("StartRecordings")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-14.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.sourceSansPro,
    fontWeight: "700",
  },
  aggressivePosition: {
    top: 412,
    position: "absolute",
  },
  wrapperLayout: {
    height: 71,
    width: 69,
    position: "absolute",
  },
  dogEmotionDetectedChild: {
    top: 51,
    left: -83,
    width: 526,
    height: 338,
    position: "absolute",
  },
  text: {
    top: 345,
    left: 151,
    transform: [
      {
        rotate: "-0.1deg",
      },
    ],
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.sourceSansPro,
    fontWeight: "700",
    position: "absolute",
  },
  soundWaveIconSymbolSpeaker: {
    top: 119,
    left: -20,
    width: 399,
    height: 203,
    position: "absolute",
  },
  dogEmotionDetectedItem: {
    left: -19,
    backgroundColor: Color.colorDarkgray,
    width: 379,
    height: 114,
  },
  aggressive: {
    left: 66,
    width: 250,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.sourceSansPro,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
  },
  dogEmotionDetectedInner: {
    top: 101,
    left: 31,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "solid",
    borderColor: "#1877f2",
    borderWidth: 1,
    width: 300,
    height: 221,
    position: "absolute",
  },
  emotionDogDetected: {
    top: 162,
    left: 82,
    fontSize: FontSize.size_21xl,
    position: "absolute",
  },
  ellipseIcon: {
    top: 465,
    left: -103,
    width: 565,
    height: 646,
    position: "absolute",
  },
  groupIcon: {
    top: 496,
    left: 94,
    width: 194,
    height: 173,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: 37,
    top: 691,
  },
  container: {
    left: 273,
    top: 696,
  },
  dogEmotionDetected: {
    backgroundColor: Color.colorDodgerblue,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default DogEmotionDetected;
