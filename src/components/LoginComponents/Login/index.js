import React, { useEffect } from 'react'
import { View, ActivityIndicator, Button, Alert } from 'react-native'
import styles from './styles'
//MobX
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../stores/RootStore';
//Google
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';
 
	/*
            Note that Firebase auth persistance is set to LOCAL by default, so no need to check if 
            user is signed in to Firebase here. As long as we log in and log out of Firebase when 
            we use Google log in and log out, we should be fine.
            https://firebase.google.com/docs/auth/web/auth-state-persistence
    */

export default Login = observer((props) => {
    //observables
    const rootStore = React.useContext(RootStoreContext);
    const store = rootStore.userInfoStore;
    //styles
    const { container , input, button, text } = styles;

    GoogleSignin.configure({
        //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '6356092898-8e4e2qlel67rvpdanh1rg1f1n0che9h8.apps.googleusercontent.com',
    });

    useEffect(() => { //essentially the same as componentDidMount()
        isUserSignedIn();
    }, [])

    render = () => {
		if(store.loading){
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
						onPress={() => onSignInPress()}
						disabled={store.isSigninInProgress}
					/>
                    <Button title="sign out" onPress={()=>signOut()}/>
				</View>
			)
		}
    }

    onSignInPress = async () => {
        try{
            store.isSigninInProgress = true;

            //initiate google sign-in
            store.loading = true;
            await GoogleSignin.hasPlayServices();
			const user = await GoogleSignin.signIn();
            store.determineUserType(user);

            if(store.userType === "invalid"){

                Alert.alert("Error!", user.user.email+"\nis not a valid email. \n\nPlease use a @jeffcoschools.us or @jeffco.k12.co.us email.")

                await GoogleSignin.signOut();

                store.isSigninInProgress = false;
                store.loading = false;
            }
            else{
                // create a new firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken)
                // login with credential
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

                store.setUsername();
                loginFinished();

                //console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

                Alert.alert("Success!","You have logged in with "+user.user.email+"!");

                store.isSigninInProgress = false;
                store.loading = false;

                if(store.userType == "student"){
                    props.navigation.navigate('StudentSeventh');
                }else if(store.userType == "teacher"){
                    props.navigation.navigate('TeacherSeventh');
                }else if(store.userType == "admin"){
                    props.navigation.navigate('Admin');
                }else{
                    Alert.alert("Something went wrong!")
                }
            }
        } catch (error){
            console.warn(error);
            this.handleSignInError(error);
            store.loading = false;
        }
    }
	
    
	isUserSignedIn = async () => {
        const user = await GoogleSignin.isSignedIn();
		try {
            if(user){
                const userInfo = await GoogleSignin.signInSilently();
                loginFinished();
                store.determineUserType(userInfo);
                
				if(store.userType == "teacher"){
                    props.navigation.navigate('TeacherSeventh')
				}else if(store.userType == "student"){
                    props.navigation.navigate('StudentSeventh');
				}
			}
            store.loading = false;
		} catch (error) {
            this.handleSignInError(error);
            store.loading = false;
		}
    };

    loginFinished = () => {
        store.setUsername();
        store.setFirestoreRef();
    }

    //This is here for testing purposes only, won't be in final
    signOut = async () => {
        try{
            await GoogleSignin.signOut();
			await firebase.auth().signOut();
            //props.navigation.navigate('Login');
            store.loading = true;
        }catch(error){
            console.log(error);
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
        store.isSigninInProgress = false;
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

    return(
        render()
    )
}
)