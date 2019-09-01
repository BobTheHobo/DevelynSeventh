import React, { Component } from 'react';
import { AppNavigationContainer } from './routes/AppStackNavigator';

/*Redux
import { appReduxStore } from './redux/store';
import { Provider } from 'react-redux';

import { View } from 'react-native'
*/
 
export default class App extends Component {
  render() {
    return(
      <AppNavigationContainer />
    )
  }
}