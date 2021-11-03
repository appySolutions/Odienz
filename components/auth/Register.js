import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import firebase from "firebase";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
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
            icon="account"
            placeholder="name"
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            style={styles.input}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="email"
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />

          <Button onPress={() => this.onSignup()} title="Sign Up" />
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

export default Register;
