import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Sound = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sound}>
      <Image
        style={styles.soundChild}
        contentFit="cover"
        source={require("../assets/ellipse-91.png")}
      />
      <Image
        style={styles.soundItem}
        contentFit="cover"
        source={require("../assets/ellipse-10.png")}
      />
      <Text style={[styles.chooseBreed, styles.aspinTypo]}>Choose Breed</Text>
      <Pressable
        style={styles.wrapper}
        onPress={() => navigation.navigate("DashBoard")}
      >
        <Image
          style={styles.iconLayout}
          contentFit="cover"
          source={require("../assets/ellipse-121.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.container, styles.frameLayout]}
        onPress={() => navigation.navigate("ShihtzuSounds")}
      >
        <Image
          style={[styles.icon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-25.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.frame, styles.frameLayout]}
        onPress={() => navigation.navigate("AspinSounds")}
      >
        <Image
          style={[styles.icon2, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-26.png")}
        />
      </Pressable>
      <View style={[styles.soundInner, styles.soundInnerLayout]} />
      <View style={[styles.rectangleView, styles.soundInnerLayout]} />
      <Text style={[styles.aspin, styles.aspinTypo]}>ASPIN</Text>
      <Text style={[styles.shihTzu, styles.aspinTypo]}>{`SHIH TZU `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  aspinTypo: {
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  frameLayout: {
    height: 168,
    width: 275,
    left: 40,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  soundInnerLayout: {
    opacity: 0.5,
    height: 51,
    backgroundColor: Color.colorGainsboro_100,
    width: 275,
    left: 40,
    position: "absolute",
  },
  soundChild: {
    top: -8,
    left: -5,
    width: 365,
    height: 289,
    position: "absolute",
  },
  soundItem: {
    top: 325,
    left: -94,
    width: 543,
    height: 610,
    position: "absolute",
  },
  chooseBreed: {
    top: 281,
    left: 95,
  },
  wrapper: {
    left: 10,
    top: 38,
    width: 27,
    height: 27,
    position: "absolute",
  },
  icon1: {
    borderRadius: Border.br_xl,
  },
  container: {
    top: 581,
  },
  icon2: {
    borderRadius: Border.br_21xl,
  },
  frame: {
    top: 391,
  },
  soundInner: {
    top: 508,
    borderBottomRightRadius: Border.br_21xl,
    borderBottomLeftRadius: Border.br_21xl,
  },
  rectangleView: {
    top: 698,
    borderBottomRightRadius: Border.br_xl,
    borderBottomLeftRadius: Border.br_xl,
  },
  aspin: {
    top: 516,
    left: 144,
  },
  shihTzu: {
    top: 713,
    left: 127,
  },
  sound: {
    backgroundColor: Color.colorDodgerblue,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default Sound;
