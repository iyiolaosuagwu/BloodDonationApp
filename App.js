import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Block, Text } from './components';

import * as Font from 'expo-font';

import * as theme from './theme';

class App extends Component {
  state = {
    fontLoaded: false
  }

  loadFonts = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  renderHeader = () => (
    <Block flex={0.333} column style={{paddingHorizontal: 15, backgroundColor: theme.colors.primary}}>
      <Block flex={false} row center>
        <Block center style={{paddingVertical: 15}}>
          <Text h3 bold white>Blood request</Text>
        </Block>
        <Image style={styles.avatar} source={require('./assets/avatar.png')} />
      </Block>
      <Block card shadow color="white">
        <Text>chart</Text>
      </Block>
    </Block>
  )


  renderRequest = () => (
    <Block column flex={0.8} color="gray">
      <Text>Requests</Text>
    </Block>
  )

  // App render
  render(){

    if(!this.state.fontLoaded){
      return (
        <Block>
          <Text>Loading...</Text>
        </Block>
      )
    }

    return (
    <SafeAreaView style={styles.save}>
      {this.renderHeader()}   
      {this.renderRequest()}   
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: theme.colors.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  save: {
    flex: 1,
    backgroundColor: theme.colors.gray
  }, 
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  request: {
    padding: 20,
    marginBottom: 15
  },
  requestStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90
  }
});

export default App;
