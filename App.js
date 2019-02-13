import React from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MakePoll from "./components/MakePoll/MakePoll";




export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user_id: null
    };
  }

  async componentDidMount() {
    await this.getUser();

    this.setState({
      loading: false
    });
  }

  getUser = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      if (user_id) {
        console.log("VALUE", user_id);
        this.setState({ user_id });
      } else {
        await this.createUser();
      }
      console.log("user found, id: ", user_id);
    } catch (err) {
      console.log("Error getUser ", err);
    }
  };

  createUser = async () => {
    const user = await fetch("http://192.168.1.146:3000/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "default" })
    }).then(res => res.json());
    this.setState({ user_id: user._id });
    await AsyncStorage.setItem("user_id", user._id);
  };

  render() {
    if (this.state.loading) {
      return <View>Loading</View>;
    }

    return (
      <View style={styles.container}>
        <Header />
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: "#ffc244",
    display: "flex"
  }
});
