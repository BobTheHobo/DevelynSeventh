import React, { Component } from 'react';

import { StyleSheet, View, Alert, Text, ActivityIndicator} from 'react-native';

class DateTime extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      curTime: '',
      curDate: '',
    };
  }
  
componentDidMount() {
  this._isMounted = true;
  if(this._isMounted){
    date = new Date();
    setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleTimeString(), curDate:  date.toLocaleDateString()
        })
    },1000)
    this.state.loading = false;
  }
}

componentWillUnmount() {
  this._isMounted = false;
}

render() {
  if(this.state.loading){
    return(
      <ActivityIndicator size='large' color='green'/>
    )
  }
  else{
    return (
      <View>
        <Text style={{fontSize: this.props.fontSize}}>
          {this.state.curDate+'\n'+this.state.curTime}
        </Text>
      </View>
    );
  }
}

}

export default DateTime
