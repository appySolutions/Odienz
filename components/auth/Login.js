import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import Screen from "../components/Screen";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import firebase from "firebase";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
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
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />

          <Button onPress={() => this.onSignup()} title="Sign In" />
        </View>
        <TouchableOpacity
          style={styles.forget}
          onPress={() => this.props.navigation.navigate("Reset")}
        >
          <Text style={styles.title}>Forget password</Text>
        </TouchableOpacity>
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
  forget: { paddingTop: 40, alignSelf: "center" },
  title: {},
});

export default Login;
