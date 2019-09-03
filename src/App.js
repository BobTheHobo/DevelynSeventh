import React, { Component } from 'react';
import { AppNavigationContainer } from './routes/AppStackNavigator';
import { setCustomText } from 'react-native-global-props';

/*Redux
import { appReduxStore } from './redux/store';
import { Provider } from 'react-redux';

import { View } from 'react-native'
*/
 
export default class App extends Component {
  render() {

    /*
    const customTextProps = {
      style: {
        fontFamily: 'Manjari-Regular'
      }
    }
    setCustomText(customTextProps);
    */

    return(
      <AppNavigationContainer />
    )
  }
}