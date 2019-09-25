import React, { Component } from 'react'
import { View, Text, Button, Image } from 'react-native'
import styles from './styles' 
import AppHeader from '../../components/AppHeader'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

//Firebase+Google
import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';
 
class ProfileScreen extends Component {
    render() {
        const { container, headerContainer, bodyContainer, title, profileImg} = styles;
        return (
            <View style={container}>
                <View style={headerContainer}>
                    <AppHeader title="Profile" touchable={true} backTo={'Home'}/>
                </View>
                <View style={bodyContainer}>
                    <Card>
                        <Card.Title 
                            title={firebase.auth().currentUser.displayName} 
                            subtitle={firebase.auth().currentUser.email} 
                            left={(props) => <Image 
                                style={profileImg}
                                source={{ uri: firebase.auth().currentUser.photoURL }}/>
                            } 
                        />
                        <Card.Actions>
                            <Button title={'Logout'} onPress={ () => this.signOut() }/>
                        </Card.Actions>
                    </Card>
                </View>
            </View>
        )
    }

    signOut = async () => {
        try{
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
            this.props.navigation.navigate('Login');
        }catch(error){
            //console.log(error);
        }
    }
}

export default ProfileScreen