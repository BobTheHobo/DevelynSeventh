import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Login from '../../components/Login'

import styles from './styles' 

export default class LoginScreen extends Component {
    render() {
        const { container , title } = styles;

        return (
            <View style={container}>                    
                <Text style={title}>D'Evelyn Seventh</Text>
                <Login navigation={this.props.navigation}/>
            </View>
        )
    }
}