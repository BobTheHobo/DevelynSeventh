import React, { Component } from 'react'
import { ActivityIndicator, View, TextInput, Text, Button, Alert } from 'react-native'
import styles from './styles'

//import google stuff
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';

import { PropTypes } from 'prop-types'

/*
const initialUser = {
    user: {
        user: {
            email: "",
            id: "",
            photo: "",
            name: ""
        }}, 
    username: "", 
    password: ""
}
*/
 
class Login extends Component {
    state = {
        isUserSignedIn: false,
        checkingSignedInStatus: true
        /*
        user: initialUser,
        username: "", 
        password: ""
        */
    };

    constructor(){
        super();
        GoogleSignin.configure({
            //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '6356092898-8e4e2qlel67rvpdanh1rg1f1n0che9h8.apps.googleusercontent.com',
        });
    }

    componentDidMount(){
        this.isUserSignedIn();
    }

    render() {
        const { heading , input, button, parent } = styles;
        const { isSigninInProgress } = this.state;

        return (
            <View>
                <TextInput style={input} placeholder="Username" 
                    onChangeText={text => this.setState({username: text})}/>
                <TextInput style={[input, {marginBottom: 20}]} secureTextEntry={true} placeholder="Password" 
                    onChangeText={text => this.setState({password: text})}/>

                <Button sytle={button} title={"Login"} onPress={() => this.checkLogin()}/>

                <GoogleSigninButton
                    style={{ width: 200, height: 48, marginTop: 40 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.onSignInPress}
                    disabled={isSigninInProgress}
                />

                {/*
                <Button title='name' onPress={()=>{console.warn(firebase.auth().currentUser.displayName)}}/>

                <Button title={'check'} onPress={() => this.confirm()}/>
                
                <Button sytle={button} title={"Logout"} onPress={() => this.signOut()}/>

                <Text>{loggedInUser.user.name}</Text>
                <Text>{loggedInUser.user.photo}</Text>
                <Text>{loggedInUser.user.name}</Text>
                */}

            </View>
        )
    }
    confirm = () =>{
        bob = firebase.auth().currentUser
        console.warn(bob.displayName);
    }

    onSignInPress = async () => {
        try{
            this.setState({ isSigninInProgress: true });

            //initiate google sign-in
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();

            //this.dispatchOnLogin(googleAuthResponse);
            if(user.user.email.indexOf("@jeffcoschools.us") == -1){

                Alert.alert("Error!", user.user.email+"\nis not a valid student email. \n\nPlease use your @jeffcoschools.us email.")

                await GoogleSignin.signOut();

                this.setState({ isSigninInProgress: false});
            }
            else{
                // create a new firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken)
                // login with credential
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

                console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

                Alert.alert("Success!","You have logged in with "+user.user.email+"!");

                this.setState({
                    isSigninInProgress: false
                });

                this.props.navigation.navigate('StudentSeventh');
            }
        } catch (error){
            console.warn(error);
            this.handleSignInError(error);
        }
    }

    dispatchOnLogin = (firebaseUserCredential) => {
        this.props.UserLogin_onSuccess({
        })
    }

    isUserSignedIn = async () => {
        const isUserSignedIn = await GoogleSignin.isSignedIn();
        if (isUserSignedIn) {
            await this.getCurrentUserInfo();
            this.props.navigation.navigate('StudentSeventh');
        }
    };
    

    getCurrentUserInfo = async () => {
        try {
            await GoogleSignin.signInSilently();
        } catch (error) {
            this.handleSignInError(error);
        }
    };

    signOut = async () => {
        const signedIn = await GoogleSignin.isSignedIn();
        if(signedIn){
          try{
              //await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              await firebase.auth().signOut();
          }catch(error){
              this.handleSignInError(error);
          }
        }else{
          Alert.alert('You\'re already signed in')
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
                this.showSignInError(JSON.stringify(error));
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

    showSignInError = alertMessage => {
        Alert.alert(
            'Google Signin Error',
            '{alertMessage}',
            [{text:'OK'}],
            {
                cancelable: false
            }
        )
    }

    googleLogin = async () => {
        try {
            // add any configuration settings here:
            await GoogleSignin.configure({
                //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
                webClientId: '6356092898-8e4e2qlel67rvpdanh1rg1f1n0che9h8.apps.googleusercontent.com', // required
            });

            const userInfo = await GoogleSignin.signIn();

            this.setState({ user: userInfo });

            //const { accessToken, idToken } = await GoogleSignin.signIn();

            // create a new firebase credential with the token
            //const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

            console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

            Alert.alert("Success!","You have logged in!");
            
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              Alert.alert("User cancelled login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
              Alert.alert("operation (f.e. sign in) is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              Alert.alert("play services not available or outdated")
            } else {
              Alert.alert("some other error happened")
            }
        }
    }

    logout = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({user: initialUser});
          Alert.alert("Success!", "User signed out")
        } catch (error) {
          console.error(error);
        }
    };

    checkLogin() {
        const { username, password } = this.state;
        if(username == "Admin" && password == "Admin"){
            //redirect to dashboard
            this.props.navigation.navigate('dashboard');
        }else{
            Alert.alert("Error", "Username/Password mismatch", [{
                text: 'Okay'
            }])
        }
    }
}

export default Login