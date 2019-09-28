import React, { Component } from 'react'
import AppHeader from '../../components/AppHeader'
import StudentInfoDisplay from '../../components/StudentInfoDisplay'
import StudentSeventh from '../../components/StudentSeventh'
import BottomNavBar from '../../routes/BottomNavBar'

//Styling
import { View, Button, Image, SafeAreaView } from 'react-native'
import { Surface, Text } from 'react-native-paper';
import styles from './styles'

//Firebase+Google
import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';

class TeacherSeventhScreen extends Component {
    render() {
        const { container, infoDisp, title, headerContainer, buttons, selector, surface } = styles;

        return (
            <SafeAreaView style={{flex: 1}}>
            <View style={container}> 

                <View style={headerContainer}>
                    <AppHeader title="D'Evelyn Seventh" />
                </View>
                
                <View style={infoDisp}>
                    <StudentInfoDisplay />
                </View>

                <View style={buttons}> 
                    <StudentSeventh />
                    {/*<Button title='name' onPress={()=>{console.warn(firebase.auth().currentUser.displayName)}}/>*/}
                </View>

                <Button title={'Open modal'} onPress={()=>{this.props.navigation.navigate('Modal');}}/>
            </View>
            </SafeAreaView>
        )
    }
}

export default TeacherSeventhScreen