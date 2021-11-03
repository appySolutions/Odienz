import React from "react";
import { View, StyleSheet, ImageBackground, Image, Text } from "react-native";

import Button from "../components/Button";
import colors from "../config/colors";

function Landing({ navigation }) {
  return (
    <ImageBackground
      blurRadius={2}
      style={styles.background}
      source={require("../../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../../assets/odienz-logo.png")}
        />
        <Text style={styles.tagline}>
          RÉVEILLONS VOTRE MARCHÉ ET VOS ÉQUIPES!
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 250,
    height: 200,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 20,
    color: colors.primary,
  },
});

export default Landing;
