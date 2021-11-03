import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";

import firebase from "firebase";
import "firebase/firestore";
import { connect } from "react-redux";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { currentUser, posts } = props;

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  const onLogout = () => {
    firebase.auth().signOut();
  };

  if (user === null) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={styles.containerInfoTitle}>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>

      <View>
        <TouchableHighlight onPress={() => onLogout()}>
          <View style={styles.containerLogout}>
            <View>
              <MaterialCommunityIcons
                name="logout"
                size={40}
                color={colors.thierd}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>Logout</Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={40}
              color={colors.thierd}
            />
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerInfo: {
    margin: 20,
  },
  containerInfoTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  containerLogout: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: "center",
    marginBottom: 5,
  },
  details: {
    justifyContent: "center",
    marginLeft: 50,
    marginRight: 200,
  },
  title: { fontSize: 16, fontWeight: "600" },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});
export default connect(mapStateToProps, null)(Profile);
