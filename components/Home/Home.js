import React from "react";
import { AsyncStorage, StyleSheet, View, Text, Image } from "react-native";
import Polls from "./Polls";
import CameraBox from "./CameraBox";
import MakePoll from "../MakePoll/MakePoll";

const uuid = require("uuid/v4");

import { ImagePicker } from "expo";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      user_id: null,
      poll_url: ""
    };
  }

  async componentDidMount() {
    const user_id = await AsyncStorage.getItem("user_id");

    if (user_id) {
      console.log("VALUE", user_id);
      this.setState({ user_id });
    }
  }

  setImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      base64: true,
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!result.canceled) {
      const image = {
        image_Id: uuid(),
        base64: result.base64,
        uri: result.uri,
        date: Date.now()
      };
      this.setState({ images: [image] });
    }
  };

  savePollUrlInState = poll_url => {
    this.setState(poll_url);
  };

  render() {
    if (this.state.images.length > 0) {
      return (
        <MakePoll
          savePollUrl={this.savePollUrlInState}
          user_id={this.state.user_id}
          images={this.state.images}
        />
      );
    }

    return (
      <View style={styles.home}>
        <CameraBox setImage={this.setImage} />
        {/*<Polls user_id={this.state.user_id} />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center"
  }
});
