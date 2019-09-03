import React, { Component } from 'react';
import { Text, TouchableHighlight, Image } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { PropTypes } from 'prop-types';
import { firebase } from '@react-native-firebase/auth';

import styles from './styles';

class AppHeader extends Component {
    render(){
        const { headerBar, profileImgContainer, profileImg, body, subtitleText} = styles

        return (
            <Text>what the fuck</Text>
        )
    }
}

signOut = async () => {
    try{
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await firebase.auth().signOut();
    }catch(error){
        this.handleSignInError(error);
    }finally{
        this.props.navigation.navigate('Login')
    }
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

AppHeader.defaultProps = {
    title: 'Title',
    UserSignIn_logOut: 'Subtitle'
}

export default AppHeader    