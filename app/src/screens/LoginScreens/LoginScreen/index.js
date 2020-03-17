import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Login from '../../../components/LoginComponents/Login'

import styles from './styles' 

export default class LoginScreen extends Component {
    render() {
        const { container , title } = styles;

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={container}>                    
                    <Text style={title}>D'Evelyn Seventh</Text>
                    <Login navigation={this.props.navigation}/>
                </View>
            </SafeAreaView>
        )
    }
}