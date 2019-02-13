import React from "react";
import { AsyncStorage, StyleSheet, View, Text, Image } from "react-native";
import AddImage from "./AddImage";
import SubmitPoll from "./SubmitPoll";

// Firebase Setup
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDTi-vnd4vgkr1txZoS4LUDQAuxi8rjfuQ",
  authDomain: "polly-14578.firebaseapp.com",
  databaseURL: "https://polly-14578.firebaseio.com",
  projectId: "polly-14578",
  storageBucket: "polly-14578.appspot.com"
  // messagingSenderId: "112307188620"
};
firebase.initializeApp(config);

export default class MakePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      title: "",
      description: "",
      shortUrl: ""
    };
  }

  getImagesWhenAdded = images => {
    this.setState({ images: images });
  };

  makeBlob = async imageInBase64 => {
    const toBlob = image => {
      const byteCharacters = image;
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return byteArray;
      // return new Blob([byteArray], {type: 'image/jpg'})
    };
    return await toBlob(imageInBase64);
  };

  makePoll = async (title, description) => {
    console.log("Submit Clicked");
    const storage = firebase.storage();
    const storageRef = storage.ref();

    const images = this.state.images;

    let newImages = images.map(async image => {
      // const blob = await this.makeBlob(image.base64);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image.uri, true);
        xhr.send(null);
      });

      const imagesRef = storageRef.child(`images/${image.image_Id}`);

      await imagesRef
        .put(blob, {
          contentType: "image/jpeg"
        })
        .then(snapshot => {
          console.log("Uploaded a blob");
        });

      const imageUrl = await imagesRef.getDownloadURL();

      image.imageUrl = imageUrl;
      image.votes = 0;
      image.names = [];
      delete image.base64;
      console.log('imageeeee', image)
      return image;
    });
    newImages = Promise.all(newImages);
    newImages = await newImages;

    await fetch("http://192.168.1.146:3000/createPoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        images: newImages,
        title: title,
        description: description,
        user_id: this.props.user_id
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ shortUrl: data.shortUrl }, () =>
          console.log('this.state: ',this.state)
        );
      });
  };

  // uploadToServer = async ()

  componentDidMount() {}


  render() {
    if (this.state.shortUrl) {
      return (<Text style={{fontSize: 20}}>The Vote url is: 192.168.1.146:3001/{this.state.shortUrl}</Text>)
    }

    return (
      <View style={styles.container}>
        <AddImage
          getImages={this.getImagesWhenAdded}
          images={this.props.images}
        />
        <SubmitPoll makePoll={this.makePoll} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffc244"
  }
});
