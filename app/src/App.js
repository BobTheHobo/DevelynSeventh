import React, { Component } from 'react';
import { StatusBar, AppState, Alert } from 'react-native';
import { AppNavigationContainer } from './routes/AppStackNavigator';
import { Navigator } from './routes/Navigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { setCustomText } from 'react-native-global-props';
import BottomNavBar from './routes/BottomNavBar';

import helpers from './functions/signOut'

/*Redux
import { appReduxStore } from './redux/store';
import { Provider } from 'react-redux';

import { View } from 'react-native'
*/
 
export default class App extends Component {

  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  };
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };
  
  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/)) {

    }
    this.setState({appState: nextAppState});  
  };

  render() {

    //Change color of Apple status bar
    StatusBar.setBarStyle('default');

    /*
    const customTextProps = {
      style: {
        fontFamily: 'Manjari-Regular'
      }
    }
    setCustomText(customTextProps);
    */

    return(
      <PaperProvider>
        <StatusBar />
        <Navigator />
      </PaperProvider>
    )
  }
}