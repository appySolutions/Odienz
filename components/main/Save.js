import React, { useState } from "react";
import { Button, Image, TextInput, View } from "react-native";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";

function save(props) {
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    // for uploading the image in firestore
    const task = firebase.storage().ref().child(childPath).put(blob);

    // For knowing the information of the uploading (optional)
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    // get the downloadURL and save it to firestore
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    // Error handling
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    // The function together
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        likesCount: 0,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image style={{ flex: 1 }} source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption . . . "
        onChangeText={(catption) => setCaption(caption)}
      />

      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}

export default save;
