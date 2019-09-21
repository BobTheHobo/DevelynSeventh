import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './styles' 
import AppHeader from '../../components/AppHeader'
 
class ProfileScreen extends Component {
    render() {
        const { container, headerContainer, bodyContainer, title} = styles;
        return (
            <View style={container}>
                <View style={headerContainer}>
                    <AppHeader title="Profile" touchable={true} backTo={'Home'}/>
                </View>
                <View style={bodyContainer}>
                    <Text>Profile</Text>
                </View>
            </View>
        )
    }
}

export default ProfileScreen