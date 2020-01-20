import React, { Component } from 'react'
import AppHeader from '../../../components/NavigationComponents/AppHeader'
import StudentInfoDisplay from '../../../components/StudentComponents/StudentInfoDisplay'
import TeacherSeventh from '../../../components/TeacherComponents/TeacherSeventh'
import BottomNavBar from '../../../routes/BottomNavBar'

//Styling
import { View, SafeAreaView } from 'react-native'
import styles from './styles'

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//Firebase+Google
import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';

class TeacherSeventhScreen extends Component {
    static navigationOptions = {
        title: 'Seventh',
        tabBarColor: 'green',
    };

    render() {
        const { container, infoDisp, headerContainer, buttons } = styles;

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={container}> 

                <View style={headerContainer}>
                    <AppHeader title="D'Evelyn Seventh" />
                </View>

                <View style={infoDisp}>
                    <StudentInfoDisplay />
                </View>

                <View style={buttons}> 
                    <TeacherSeventh />
                    {/*<Button title='name' onPress={()=>{console.warn(firebase.auth().currentUser.displayName)}}/>*/}
                </View>
            </View>
            </SafeAreaView>
        )
    }
}

export default TeacherSeventhScreen