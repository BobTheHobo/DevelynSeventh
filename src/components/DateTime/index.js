import React, { Component } from 'react';

import { StyleSheet, View, Alert, Text } from 'react-native';

class DateTime extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      curTime: '',
    };
  }
  
componentDidMount() {
  this._isMounted = true;
  if(this._isMounted){
    setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
    },1000)
  }
}

componentWillUnmount() {
  this._isMounted = false;
}

render() {
    return (
      <Text style={{fontSize: this.props.fontSize}}>{this.state.curTime}</Text>
    );
  }
}

export default DateTime
