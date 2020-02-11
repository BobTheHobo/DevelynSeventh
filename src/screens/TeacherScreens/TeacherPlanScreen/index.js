import React, { Component } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import styles from './styles'

import AppHeader from '../../../components/NavigationComponents/AppHeader';
import PlanEditor from '../../../components/TeacherComponents/PlanEditor';

class TeacherFindStudentScreen extends Component {
    static navigationOptions = {
        title: 'Plan',
        tabBarColor: '#1512c4',
    };

    render() {
        const { container, infoDisp, title, headerContainer, buttons, selector, surface } = styles;

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={container}> 

                <View style={headerContainer}>
                    <AppHeader title="Today's Plan" />
                </View>

                <View style={infoDisp}>
                    <PlanEditor/>
                </View>

            </View>
            </SafeAreaView>
        )
    }
}

export default TeacherFindStudentScreen