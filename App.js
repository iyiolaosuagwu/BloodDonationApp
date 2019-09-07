import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import ContentLoader, { Facebook, Instagram, Bullets } from 'react-native-easy-content-loader';
import { Block, Text } from './components';
import { LineChart, Path } from 'react-native-svg-charts';
import { Line } from "react-native-svg";
import * as shape from 'd3-shape';



import * as mocks from './mocks';

import * as Font from 'expo-font';

import * as theme from './theme';

class App extends Component {
  state = {
    name: '',
    bloodType: '',
    age: '',
    gender: '',
    distance: '',
    time: '',
    priority: '',
    fontLoaded: false,
    loading: false,
    modalFalse: false
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
    setTimeout(() => {
      this.setState({loading: true})
    }, 2000);
  }

  Loader = () => (
    <Image source={(require('./assets/spinner.gif'))} style={styles.loading} />
  ) 

  addModal = () => (
    <KeyboardAvoidingView behavior="padding">
      <Block flex={false} >
        <Modal animationType="slide" style={styles.modalAdd} visible={this.state.modalFalse} transparent={false} onRequestClose={() => this.setState({ modalFalse: false })}>
              <Block flex={1} space="between">
                <Block flex={false} style={{marginTop: 100}}>
                  <Block flex={false}>
                    <Text h3 bold center>Add Blood Request</Text>
                  </Block>
                  <Block flex={false} style={{marginHorizontal: 20,  marginTop: 20}}>
                    <Text h4 bold style={styles.label}>Name</Text>
                    <TextInput 
                      column
                      shadow
                      placeholder="name" 
                      style={{marginTop: 10, backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 10, fontSize: 15}}
                      placeholderTextColor="gray"
                      borderColor="gray"
                      borderWidth={1}
                      onChangeText={text => this.setState({name: text})}
                    />
                  </Block>

                  <Block flex={false} style={{marginHorizontal: 20,  marginTop: 20}}>
                    <Text h4 bold style={styles.label}>BloodType</Text>
                    <TextInput 
                      column
                      shadow
                      placeholder="name" 
                      style={{marginTop: 10, backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 10, fontSize: 15}}
                      placeholderTextColor="gray"
                      borderColor="gray"
                      borderWidth={1}
                      onChangeText={text => this.setState({bloodType: text})}
                    />
                  </Block>

                  <Block flex={false} style={{marginHorizontal: 20,  marginTop: 20}}>
                    <Text h4 bold style={styles.label}>Gender</Text>
                    <TextInput 
                      column
                      shadow
                      placeholder="name" 
                      style={{marginTop: 10, backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 10, fontSize: 15}}
                      placeholderTextColor="gray"
                      borderColor="gray"
                      borderWidth={1}
                      onChangeText={text => this.setState({gender: text})}
                    />
                  </Block>

                  <Block flex={false} style={{marginHorizontal: 20,  marginTop: 20}}>
                    <Text h4 bold style={styles.label}>Age</Text>
                    <TextInput 
                      column
                      shadow
                      placeholder="name" 
                      style={{marginTop: 10, backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 10, fontSize: 15}}
                      placeholderTextColor="gray"
                      borderColor="gray"
                      borderWidth={1}
                      onChangeText={text => this.setState({age: text})}
                    />
                  </Block>

                  <Block flex={false} style={{marginHorizontal: 20,  marginTop: 20}}>
                    <Text h4 bold style={styles.label}>Distance</Text>
                    <TextInput 
                      column
                      shadow
                      placeholder="name" 
                      style={{marginTop: 10, backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 10, fontSize: 15}}
                      placeholderTextColor="gray"
                      borderColor="gray"
                      borderWidth={1}
                      onChangeText={text => this.setState({distance: text})}
                    />
                  </Block>

                  <Block flex={false} style={{marginHorizontal: 20,  marginTop: 20}}>
                    <Text h4 bold style={styles.label}>Priority</Text>
                    <TextInput 
                      column
                      shadow
                      placeholder="name" 
                      style={{marginTop: 10, backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 10, fontSize: 15}}
                      placeholderTextColor="gray"
                      borderColor="gray"
                      borderWidth={1}
                      onChangeText={text => this.setState({priority: text})}
                    />
                  </Block>


                </Block>
                <Block>
                  <TouchableOpacity flex={false} style={styles.modalAdd} activeOpacity={0.8} onPress={() => this.setState({ modalFalse: false })}>
                      <Text h3 center color="white">ADD</Text>
                  </TouchableOpacity>
                </Block>
              </Block>
          </Modal>
      </Block>
    </KeyboardAvoidingView>
  )

  addBlood = (blood) => {
    return (
      <Block flex={false}>
        <Block flex={false} center  middle h1 bold style={styles.addButton}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({modalFalse: true})}>
            <Text bold h1 white shadow>+</Text>
          </TouchableOpacity>
        </Block>
      </Block>
    )
  };

  renderChart = () => {
    const {chart} = this.props;
    const LineShadow = ({line}) => (
      <Path
        d={line}
        fill="none"
        stroke={theme.colors.primary}
        strokeWidth={7}
        strokeOpacity={0.07}
      >
      </Path>
    )
    return (
        <LineChart
          yMin={0}
          yMax={10}
          style={{ flex: 1 }}
          data={chart}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveMonotoneX}
          svg={{ stroke: theme.colors.primary, strokeWidth: 1.25 }}
          contentInset={{left: theme.sizes.base, right: theme.sizes.base}}
        >
        <LineShadow belowChart={true} />
        <Line
          key="zero-axis"
          x1="0%"
          x2="100%"
          y1="50%"
          y2="50%"
          belowChart={true}
          stroke={theme.colors.gray}
          strokeDasharray={[2, 10]}
          strokeWidth={1}
        />
        </LineChart>
    )
  }


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
          

          <Block flex={1}>
              {
                this.renderChart()
              }
          </Block>

        </Block>
      </Block>
    )
  };


  renderRequest = (request) => {
      return (
        <Block row card shadow color="white" style={styles.request}>

        {/* {!this.state.loading ? 
          (
            <Block row card shadow color="white" style={styles.request}>
              <ContentLoader active avatar /> 
            </Block>
          )
          : 
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
                  {request.age}  •  {request.gender}  •  {`${request.distance}km`}  •  {`${request.time}hrs`} 
                </Text>
              </Block>
          </Block>
        } */}

        <ContentLoader active avatar loading={!this.state.loading}>
          <Block row>
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
                  {request.age}  •  {request.gender}  •  {`${request.distance}km`}  •  {`${request.time}hrs`} 
                </Text>
              </Block>
          </Block>
        </ContentLoader>

        
      </Block>
    )
  };

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
                {
                  this.renderRequest(request)
                }
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
        {this.addBlood()}
        {this.addModal()}      
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
    paddingBottom: 30,
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
  },
  label: {
    fontSize: 15,
    color: theme.colors.secondary
  },
  addButton: {
    color: theme.colors.primary,
    height: 65,
    width: 65,
    borderRadius: 65 / 2 ,
    position: "absolute",
    top:  -95,
    right: 10,
    zIndex: 1,
    backgroundColor: theme.colors.secondary
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalAdd: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 5
  }
});

