import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import firebase from "firebase";

export class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    this.onReset = this.onReset.bind(this);
  }

  onReset() {
    const { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <Screen style={styles.container}>
        <Image
          resizeMode="contain"
          source={require("../../assets/odienz-logo.png")}
          style={styles.logo}
        />
        <View>
          <TextInput
            style={styles.input}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Enter your Email"
            onChangeText={(email) => this.setState({ email })}
          />

          <Button onPress={() => this.onReset()} title="Reset Password" />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    width: "100%",
  },
  logo: {
    width: 150,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
  },
});

export default Reset;
