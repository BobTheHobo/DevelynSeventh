import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from './styles'
import { GoogleSignin } from 'react-native-google-signin';

class SeventhScreen extends Component {
    render() {
        const { container , title } = styles;

        return (
            <View >
                <Text style={title}>D'Evelyn Seventh</Text>
                <Button title={'Logout'} onPress={ () => this.signOut() }/>
            </View>
        )
    }

    signOut = async () => {
        try{
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.props.navigation.navigate('Login');
        }catch(error){
            //TODO: handle error
        }
    }
}

export default SeventhScreen