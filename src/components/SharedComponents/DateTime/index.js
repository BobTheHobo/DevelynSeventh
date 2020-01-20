import React, { Component } from 'react';

import {View, Text} from 'react-native';

class DateTime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      curTime: '',
      curDate: '',
    };
  }
  
  componentDidMount() {
    this.interval = setInterval( () => {
      this.date = new Date();
      this.setState({
        curTime : this.date.toLocaleTimeString(), curDate: this.date.toLocaleDateString()
      })
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    console.warn("Timer cleared");
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: this.props.fontSize}}>
          {this.state.curDate+'\n'+this.state.curTime}
        </Text>
      </View>
    );
  }

}

export default DateTime

/* MobX version
import React, { Component, useEffect } from 'react';

import { StyleSheet, View, Alert, Text, ActivityIndicator} from 'react-native';

import { firebase } from '@react-native-firebase/firestore';
import SignUpButton from '../../StudentComponents/SignUpButton';
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../stores/RootStore';

export default DateTime = observer((props) => {
  const rootStore = React.useContext(RootStoreContext);
  const store = rootStore.dateTimeStore;
  
  useEffect(() => {
    const interval = setInterval(() => store.clockTick(), 1000);
    console.warn("timer active");

    //essentially the same as componentWillUnmount()
    return cleanup = () => {
      clearInterval(interval);
      console.warn("cleaned up timer");
    }
  }, [])

  render = () => {
      return (
        <View>
          <Text style={{fontSize: props.fontSize}}>
            {store.curDate+'\n'+store.curTime}
          </Text>
        </View>
      );
  }

  return(
    render()
  )

})
*/
