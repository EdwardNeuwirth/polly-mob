import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class Header extends React.Component {
  render() {
    return(

      <View style={styles.header}>
        <Text style={styles.text}>Polly</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    height: 50,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 18
  }
});
