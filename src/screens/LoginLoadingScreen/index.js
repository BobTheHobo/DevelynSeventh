import React, { Component } from 'react'
import {
  ActivityIndicator,
  StatusBar,
  View,
  Alert
} from 'react-native';
import styles from './styles'

//import google stuff
import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';

export default class LoginLoadingScreen extends Component {

    constructor(){
        super();
        GoogleSignin.configure({
            //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '6356092898-8e4e2qlel67rvpdanh1rg1f1n0che9h8.apps.googleusercontent.com',
        });
    }

    componentDidMount() {
      this.isUserSignedIn();
    }

    isUserSignedIn = async () => {
        /*
            Note that Firebase auth persistance is set to LOCAL by default, so no need to check if 
            user is signed in to Firebase here. As long as we log in and log out of Firebase when 
            we use Google log in and log out, we should be fine.
            https://firebase.google.com/docs/auth/web/auth-state-persistence
        */
        const isUserSignedIn = await GoogleSignin.isSignedIn();
        if (isUserSignedIn) {
            await this.getCurrentUserInfo();
            this.props.navigation.navigate('StudentSeventh');
        } else {
            this.props.navigation.navigate('Login')
        }
    };

    getCurrentUserInfo = async () => {
        try {
            await GoogleSignin.signInSilently();
        } catch (error) {
            console.log(error);
        }
    };

    signOut = async () => {
        try{
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
        }catch(error){
            //console.log(error);
        }
    }
  
    // Render any loading content that you like here
    render() {
      return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}