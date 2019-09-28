import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { AppNavigationContainer } from './routes/AppStackNavigator';
import { Navigator } from './routes/Navigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { setCustomText } from 'react-native-global-props';
import BottomNavBar from './routes/BottomNavBar';

/*Redux
import { appReduxStore } from './redux/store';
import { Provider } from 'react-redux';

import { View } from 'react-native'
*/
 
export default class App extends Component {
  
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