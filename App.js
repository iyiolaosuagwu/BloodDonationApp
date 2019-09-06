import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Block, Text } from './components';
import * as mocks from './mocks';

import * as Font from 'expo-font';

import * as theme from './theme';

class App extends Component {
  state = {
    fontLoaded: false,
    loading: false
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
    this.setState({loading: true})
  }

  Loader = () => (
    <Image source={(require('./assets/spinner.gif'))} style={styles.loading} />
  )


  renderHeader = () => {
    const {user} = this.props;
    return (
      <Block flex={0.333} column style={{paddingHorizontal: 15}}>
        <Block flex={false} row style={{paddingVertical: 15}}>
          <Block center>
            <Text h3 bold white style={{marginRight: -(25 + 5) }}>Blood request</Text>
          </Block>
          <Image style={styles.avatar} source={user.avatar} /> 
          {/* // avatar width + margin */}
        </Block>
        {/*  */}
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{paddingHorizontal: 30}}>

              <Block flex={false} row center> 
                <Text h1 bold>291</Text>
                <Text caption bold tertiary style={{paddingHorizontal: 10}}>-12%</Text>
              </Block>
            
              <Block flex={false} row center right> 
              <Text caption bold primary style={{paddingHorizontal: 10}}>+49%</Text>
                <Text h1 bold>481</Text>
              </Block>

          </Block>

          <Block flex={0.5} row space="between" style={{paddingHorizontal: 30}}>
            <Text>Available</Text>
            <Text>Request</Text>
          </Block>
          

          <Block>
            <Text>
              Chart
            </Text>
          </Block>

        </Block>
      </Block>
    )
  };


  renderRequest = (request) => (
      <Block row card shadow color="white" style={styles.request}>

      <Block flex={0.24} card column color="secondary" style={styles.requestStatus}>

        <Block flex={0.25} center middle color={theme.colors.primary}>
          <Text small bold white style={{textTransform: 'uppercase'}}>{request.priority}</Text>
        </Block>

        <Block flex={0.7} center middle>
          <Text h1 white bold>{request.bloodType}</Text>
        </Block>

      </Block>

      
        <Block flex={0.75} middle column>
          <Text h3 bold left style={{paddingVertical: 8}}>
            {request.name}
          </Text>
          <Text left caption semibold>
            {request.age} * {request.gender} * {`${request.distance}km`} * {`${request.time}hrs`} 
          </Text>
        </Block>
    </Block>
  );

  renderRequests = () => {
    const { requests } = this.props;
    return (
      <Block column flex={0.8} color="gray2" style={styles.requests}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          
            <Text light h4>Requests Updates</Text>
        
            <TouchableOpacity activeOpacity={0.8}>
              <Text bold right h4>View All</Text>
            </TouchableOpacity>
          
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            requests.map(request => (
              <TouchableOpacity activeOpacity={0.8} key={`request-${request.id}`}>
                {this.renderRequest(request)}
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </Block>
    )
  };

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
      {this.renderRequests()}   
    </SafeAreaView>
  );
  }
}


App.defaultProps = {
  user: mocks.user,
  requests: mocks.requests,
  chart: mocks.chart
}


export default App;



const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
  save: {
    flex: 1,
    backgroundColor: theme.colors.primary
  },
  headerChart: {
    paddingTop: 25,
    // paddingBottom: 30,
    zIndex: 1
  },
  avatar: {
    width: 27,
    height: 27,
    borderRadius: 27 / 2,
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

