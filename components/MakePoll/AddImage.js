import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

import addCameraIcon from "../../assets/addCamera.png";

import { ImagePicker } from "expo";

const uuid = require("uuid/v4");

export default class AddImage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AddImageBox
          getImages={this.props.getImages}
          images={this.props.images}
        />
      </View>
    );
  }
}

class AddImageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.addImages = this.addImages.bind(this);
  }

  componentDidMount() {
    const images = this.props.images;
    this.setState({
      images: images
    });
  }

  pressImage = async image_id => {
    if (image_id === "addImageButton") {
      console.log("touched button ", image_id);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        base64: true,
        allowsEditing: true,
        aspect: [1, 1]
      });

      if (!result.canceled) {
        console.log(result);
        const image = {
          image_Id: uuid(),
          base64: result.base64,
          uri: result.uri,
          date: Date.now()
        };

        let images = this.state.images;
        images.push(image);
        console.log("these are the props in AddImage", this.props);
        this.props.getImages(images);
        this.setState({ images: images });
      }
    }
  };

  addImages = () => {
    let arr = this.state.images;
    console.log(
      "this is the updated state of images in AddImage, addImages() ",
      arr
    );
    return arr.map(image => {
      return (
        <TouchableHighlight
          activeOpacity={7}
          style={styles.addImageBox}
          onPress={() => this.pressImage(image.image_id)}
        >
          <View key={image.date}>
            <Image style={styles.addImageBox} source={{ uri: image.uri }} />
          </View>
        </TouchableHighlight>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.addImages()}
        <TouchableHighlight
          activeOpacity={7}
          style={styles.addImageBox}
          onPress={() => this.pressImage("addImageButton")}
        >
          <View>
            <Image style={styles.addImageBox} source={addCameraIcon} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffc244",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center"
  },
  addImageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 75,
    width: 75,
    margin: 10,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 5
  }
});
