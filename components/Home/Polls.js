import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Button,
  Image
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import {getPlaneDetection} from "expo/build/AR";

export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  }

  async componentDidMount() {
    // let user_id = await AsyncStorage.getItem("user_id");
    // if (user_id) {
    //   console.log("VALUE", user_id);
    //   this.setState({ user_id });
    // }

    const user_id = "5c39cda3e560f2a362e2a55d";

    this.getPolls(user_id)
      .then(polls => console.log(polls))

  }
  // Todo: fix get Polls user
  getPolls = id => {
      // return fetch("http://192.168.1.146:3000/users/1234123123123/polls", {
      return fetch(`http://192.168.1.146:3000/getUserPolls/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        // body: JSON.stringify({
        //   user_id: id
        // })
      }).then(response => response.json());
  };


  render() {
    return (
      <View>
        <Text>Logged User id = {this.props.user_id}</Text>
        <View style={styles.box} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: vmin(95),
    height: vmin(80),
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "grey"
  }
});
