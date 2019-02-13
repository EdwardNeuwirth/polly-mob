import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Button,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class CameraBox extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressButton = () => {
    Alert.alert("You tapped the button!");
  };

  render() {
    return (
      <View style={styles.main}>
        <TouchableHighlight
          style={styles.circle}
          activeOpacity={100}
          underlayColor={"grey"}
          onPress={this.props.setImage}
        >
          <Ionicons name="ios-camera" size={150} color="grey" />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'green',
    padding: 25
  },
  circle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "grey"
  }
});
