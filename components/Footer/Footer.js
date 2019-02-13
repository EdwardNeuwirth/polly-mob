import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


export default class Header extends React.Component {
  render() {
    return(
      <View style={styles.footer}>
        <Text style={styles.text}>I am the footer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 18
  }
});