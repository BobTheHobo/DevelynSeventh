import React, { Component } from 'react'
import { View, ActivityIndicator, TextInput, Text, Button, Alert } from 'react-native'
import styles from './styles'

//import google stuff
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';
 
	/*
            Note that Firebase auth persistance is set to LOCAL by default, so no need to check if 
            user is signed in to Firebase here. As long as we log in and log out of Firebase when 
            we use Google log in and log out, we should be fine.
            https://firebase.google.com/docs/auth/web/auth-state-persistence
    */
class Login extends Component {

    constructor(){
		super();
		
		this.state = {
			loading: true,
			userType: "",
		};

        GoogleSignin.configure({
            //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '6356092898-8e4e2qlel67rvpdanh1rg1f1n0che9h8.apps.googleusercontent.com',
        });
    }

    componentDidMount(){
        this.isUserSignedIn();
	}

    render() {
        const { container , input, button, text } = styles;
		const { isSigninInProgress } = this.state;
		
		if(this.state.loading == true){
			return (
				<View style={container}>
					<ActivityIndicator size="large" color="green"/>
					{/*<StatusBar barStyle="default" />*/}
				</View>
			);
		}else{
			return (
				<View style={container}>
					<GoogleSigninButton
						style={{ width: 200, height: 48}}
						size={GoogleSigninButton.Size.Wide}
						color={GoogleSigninButton.Color.Light}
						onPress={() => this.onSignInPress()}
						disabled={isSigninInProgress}
					/>
				</View>
			)
		}
    }

    onSignInPress = async () => {
        try{
            this.setState({ isSigninInProgress: true });

			//initiate google sign-in
			this.setState({loading: true});
            await GoogleSignin.hasPlayServices();
			const user = await GoogleSignin.signIn();
            this.determineUserType(user);

            if(this.state.userType == "invalid"){

                Alert.alert("Error!", user.user.email+"\nis not a valid email. \n\nPlease use a @jeffcoschools.us or @jeffco.k12.co.us email.")

                await GoogleSignin.signOut();

				this.setState({ isSigninInProgress: false});
				this.setState({loading: false});
            }
            else{
                // create a new firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken)
                // login with credential
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

                //console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

                Alert.alert("Success!","You have logged in with "+user.user.email+"!");

				this.setState({isSigninInProgress: false});
				this.setState({loading: false});

                if(this.state.userType == "student"){
                    this.props.navigation.navigate('StudentSeventh');
                }else if(this.state.userType == "teacher"){
                    this.props.navigation.navigate('TeacherSeventh');
                }else if(this.state.userType == "admin"){
                    this.props.navigation.navigate('Admin');
                }else{
                    Alert.alert("Something went wrong!")
                }
            }
        } catch (error){
            console.warn(error);
            this.handleSignInError(error);
            this.setState({loading: false});
        }
    }

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
	
	isUserSignedIn = async () => {
		const user = await GoogleSignin.isSignedIn();
		try {
			if(user){
				const userInfo = await GoogleSignin.signInSilently();
				this.determineUserType(userInfo);

				if(this.state.userType == "teacher"){
					this.props.navigation.navigate('TeacherSeventh')
				}else if(this.state.userType == "student"){
					this.props.navigation.navigate('StudentSeventh');
				}
			}
			this.setState({loading: false});
		} catch (error) {
			this.handleSignInError(error);
			this.setState({loading: false});
		}
	};

    //This is here for testing purposes only, not actually used.
    signOut = async () => {
        try{
            await GoogleSignin.signOut();
			await firebase.auth().signOut();
            this.props.navigation.navigate('Login');
            this.setState({loading: true});
        }catch(error){
            //console.log(error);
        }
    }


    handleSignInError = async (error) => {
        if(error.code){
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                this.showSignInError("User cancelled login flow");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                this.showSignInError("operation (f.e. sign in) is in progress already");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                this.showSignInError("Play Services not available or outdated. Please update.")
                await this.getGooglePlayServices();
            } else {
				//this.showSignInError(JSON.stringify(error));
				this.showSignInError(error+"");
            }
        } else {
            this.showSignInError(JSON.stringify(error));
        }
        this.setState({ isSigninInProgress: false });
    }

    getGooglePlayServices = async () => {
        try{
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            })
        }catch(error){
            this.showSignInError('Play services are not available. Please download.');
        }
    }

    showSignInError = (alertMessage) => {
        Alert.alert(
            'Google Signin Error',
            alertMessage,
            [{text:'OK'}],
            {
                cancelable: false
            }
        )
    }
}

export default Login