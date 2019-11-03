import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Divider } from 'react-native-paper'

import Ionicons from 'react-native-vector-icons/Ionicons';

import { GoogleSignin } from 'react-native-google-signin';
import { PropTypes } from 'prop-types';
import { firebase } from '@react-native-firebase/auth';

import styles from './styles';

class AppHeader extends Component {

    render(){
        const { headerBar, title, profileImgContainer, profileImg, backButton, body, subtitleText} = styles

        return (
            <View style={headerBar}>
                <View style={backButton}>
                    {this.addBackButton()}
                </View>
                <View> 
                    <Text style={title}>{this.props.title}</Text>
                </View>
                <View style={profileImgContainer}>
                    <TouchableOpacity style={profileImg} activeOpacity={0.5} onPress={()=>this.goToProfilePage()}>
                        <Image 
                        style={profileImg}
                        source={{ uri: firebase.auth().currentUser.photoURL }}/>
                    </TouchableOpacity>
                </View>
            </View>    
        )
    }

    addBackButton = () => {
        if(this.props.touchable){
            return(
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                {/*
                If you want to customize where the back button takes you, use this:
                <TouchableOpacity onPress={()=>this.goBackToDestination(this.props.backTo)}>
                */}
                        <Ionicons name="md-arrow-back" size={30} color={'black'}/>
                </TouchableOpacity>
            )
        }
    }
    
    goBackToDestination = destination => {
        this.props.navigation.navigate(destination);
    }

    goToProfilePage = () => {
       this.props.navigation.navigate('Profile');
    };

    signOut = async () => {
        try{
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
        }catch(error){
            this.handleSignInError(error);
        }finally{
            this.props.navigation.navigate('Login')
        }
    }

    /*
    AppHeader.propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired
    };

    AppHeader.defaultProps = {
        title: 'Title',
        UserSignIn_logOut: 'Subtitle'
    }
    */
}

export default withNavigation(AppHeader);    