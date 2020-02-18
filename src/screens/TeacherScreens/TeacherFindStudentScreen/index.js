import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import styles from './styles'

import AppHeader from '../../../components/NavigationComponents/AppHeader'
import TeacherFindStudent from '../../../components/TeacherComponents/TeacherFindStudent';

class TeacherPlanScreen extends Component {
    static navigationOptions = {
        title: 'Find a Student',
        tabBarColor: '#6627c4',
    };

    render() {
        const { container, infoDisp, title, headerContainer, buttons, selector, surface } = styles;

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={container}> 

                <View style={headerContainer}>
                    <AppHeader title="Find a Student" />
                </View>

                <View style={infoDisp}>
                    <TeacherFindStudent/>
                </View>

            </View>
            </SafeAreaView>
        )
    }
}

export default TeacherPlanScreen