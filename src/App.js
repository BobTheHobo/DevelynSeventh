import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
//import pages
import Sidebar from './components/Sidebar';
import LoginScreen from './screens/LoginScreen';
import SeventhScreen from './screens/SeventhScreen';

import { View } from 'react-native'
 
class App extends Component {
  render() {
    return (
      <AppContainer />
      //<AppSlider/>
    )
  }
}

/*
const AppStack = createDrawerNavigator({
  login: {screen: LoginScreen},
  seventh: {screen: SeventhScreen},
}, {
  contentComponent: ({navigation}) => <Sidebar navigation={navigation}/>
})

const AppSlider = createAppContainer(AppStack);
*/

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Seventh: SeventhScreen,
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
}
)

const AppContainer = createAppContainer(AppNavigator);

export default App;
