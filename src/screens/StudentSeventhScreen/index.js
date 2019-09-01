import React, { Component } from 'react'
import AppHeader from '../../components/AppHeader'
import StudentInfoDisplay from '../../components/StudentInfoDisplay'
import StudentSeventh from '../../components/StudentSeventh'

//Styling
import { View, Text, Button } from 'react-native'
import { Container, Content} from "native-base";
import styles from './styles'

//Firebase+Google
import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';

class StudentSeventhScreen extends Component {
    render() {
        const { container, infoDisp, title, titleContainer, buttons, selector } = styles;

        return (
            <View style={container}> 

                <View style={titleContainer}>
                    <Text style={title}>D'Evelyn Seventh</Text>
                </View>

                <View style={infoDisp}>
                    <StudentInfoDisplay />
                </View>

                <View style={buttons}> 
                    <Text>Sign up for Seventh</Text>
                    <StudentSeventh />
                    <Button title='name' onPress={()=>{console.warn(firebase.auth().currentUser.displayName)}}/>
                    <Button title={'Logout'} onPress={ () => this.signOut() }/>
                </View>

            </View>
        )
    }

    signOut = async () => {
        try{
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
            this.props.navigation.navigate('Login');
        }catch(error){
            //console.log(error);
        }
    }
}

export default StudentSeventhScreen