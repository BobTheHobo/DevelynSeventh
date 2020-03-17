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
        this.state = {
            userType: "",
        };

        GoogleSignin.configure({
            //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '6356092898-8e4e2qlel67rvpdanh1rg1f1n0che9h8.apps.googleusercontent.com',
        });
    }

    componentDidMount() {
        this.getCurrentUserInfo();
    }

    
    isUserSignedIn = async () => {
        /*
            Note that Firebase auth persistance is set to LOCAL by default, so no need to check if 
            user is signed in to Firebase here. As long as we log in and log out of Firebase when 
            we use Google log in and log out, we should be fine.
            https://firebase.google.com/docs/auth/web/auth-state-persistence
        */
        const user = await GoogleSignin.isSignedIn();

        if (user) {
            const user1 = await this.getCurrentUserInfo();
            if(this.state.userType == "student"){
                this.props.navigation.navigate('StudentSeventh');
            }else if(this.state.userType == "teacher"){
                this.props.navigation.navigate('TeacherSeventh')
            /* Admins should be logged out whenever they exit the app for security reasons
            }else if(this.state.userType == "admin"){
                this.props.navigation.navigate('Admin');
            */
            }else{
                this.props.navigation.navigate('Login')
            }
        }else{
            this.props.navigation.navigate('Login')
        }
    };

    //Sets userType based on the email that is passed through the user1 object
    determineUserType = (user1) => {
        if(user1.user.email.indexOf("@jeffcoschools.us") != -1){
            this.setState({userType: 'student'});
        }else if(user1.user.email.indexOf("@jeffco.k12.co.us") != -1){
            this.setState({userType: 'teacher'});
        }else if(user1.user.email == "thienvietngomai@gmail.com" == 1){
            this.setState({userType: 'teacher'});
        }else{
            this.setState({userType: 'invalid'});
        }
    }

    getCurrentUserInfo = async () => {
		try {
            const userInfo = await GoogleSignin.signInSilently();
			this.determineUserType(userInfo);

		  	if(this.state.userType == "teacher"){
				this.props.navigation.navigate('TeacherSeventh')
			}else if(this.state.userType == "student"){
				this.props.navigation.navigate('StudentSeventh');
			}
		} catch (error) {
			console.warn("wut")
		}
	};

    //This is here for testing purposes only, not actually used.
    signOut = async () => {
        try{
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
        }catch(error){
            //console.log(error);
        }
    }
  
    // Render a simple spinning loading component
    render() {
        const {container} = styles;

        return (
            <View style={container}>
                <ActivityIndicator size="large" color="green"/>
                {/*<StatusBar barStyle="default" />*/}
            </View>
        );
    }
}