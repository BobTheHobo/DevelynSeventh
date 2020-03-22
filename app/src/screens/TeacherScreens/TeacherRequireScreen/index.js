import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import styles from './styles'

import AppHeader from '../../../components/NavigationComponents/AppHeader'
import TeacherRequire from '../../../components/TeacherComponents/TeacherRequire';

class TeacherRequireScreen extends Component {
    static navigationOptions = {
        title: 'Require',
        tabBarColor: '#ba1414',
    };

    render() {
        const { container, infoDisp, title, headerContainer, buttons, selector, surface } = styles;

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={container}> 

                <View style={headerContainer}>
                    <AppHeader title="Require a Student" />
                </View>

                <View style={infoDisp}>
                    <TeacherRequire/>
                </View>

            </View>
            </SafeAreaView>
        )
    }
}

export default TeacherRequireScreen