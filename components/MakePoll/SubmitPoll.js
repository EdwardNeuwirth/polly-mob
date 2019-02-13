import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";



export default class SubmitPollBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      firebaseStorage: null

    };
  }

   componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Title</Text>
        </View>
        <View>
          <TextInput
            style={styles.title}
            maxLength={35}
            onChangeText={text => this.setState({title: text})}
          />
        </View>
        <View>
          <Text style={styles.text}>Description</Text>
        </View>
        <View>
          <TextInput
            style={styles.description}
            multiline={true}
            numberOfLines={3}
            maxLength={100}
            onChangeText={text => this.setState({description: text})}
          />
        </View>
        <View>
          <TouchableHighlight activeOpacity={7}
                              style={styles.submit}
                              onPress={() => this.props.makePoll(this.state.title, this.state.description)}
          >
            <Text style={{fontSize: 20}}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    width: "100%",
    backgroundColor: "#ffc244", // "#ffc244"
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 20
  },
  title: {
    display: "flex",
    alignContent: "center",
    height: 50,
    width: 310,
    borderColor: "gray",
    borderWidth: 3,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 20
  },
  description: {
    height: 100,
    width: 310,
    textAlignVertical: "top",
    borderColor: "gray",
    borderWidth: 3,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 20
  },
  submit: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 50,
    width: 100,
    margin: 10,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'gray',
    backgroundColor: "white",
  }
});
