import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const ShihtzuSounds = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.shihtzuSounds}>
      <Pressable
        style={[styles.wrapper, styles.wrapperPosition]}
        onPress={() => navigation.navigate("Sound")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-121.png")}
        />
      </Pressable>
      <Image
        style={styles.shihtzuSoundsChild}
        contentFit="cover"
        source={require("../assets/ellipse-15.png")}
      />
      <Image
        style={[styles.dogBreedsRemovebgPreview3Icon, styles.wrapperPosition]}
        contentFit="cover"
        source={require("../assets/dogbreedsremovebgpreview-3.png")}
      />
      <Text style={styles.shihTzu}>SHIH TZU</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperPosition: {
    left: 10,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    top: 38,
    width: 27,
    height: 27,
  },
  shihtzuSoundsChild: {
    top: 260,
    left: -17,
    width: 387,
    height: 393,
    opacity: 0.8,
    position: "absolute",
  },
  dogBreedsRemovebgPreview3Icon: {
    top: 31,
    width: 360,
    height: 229,
  },
  shihTzu: {
    top: 163,
    left: 76,
    fontSize: FontSize.size_21xl,
    fontWeight: "700",
    fontFamily: FontFamily.quicksandBold,
    color: Color.colorWhite,
    textAlign: "center",
    position: "absolute",
  },
  shihtzuSounds: {
    backgroundColor: Color.colorDodgerblue,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default ShihtzuSounds;
