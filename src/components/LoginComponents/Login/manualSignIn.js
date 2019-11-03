import React, { Component } from 'react'
import { View, TextInput, Text, Button, Alert } from 'react-native'
import styles from './styles'

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
 
class manualSignIn extends Component {

    state = {
        user: initialUser,
        username: "", 
        password: ""
    };

    render() {
        const { container , input, button, text } = styles;

        return (
            <View style={container}>
                <TextInput style={input} placeholder="Username" 
                    onChangeText={text => this.setState({username: text})}/>
                <TextInput style={[input, {marginBottom: 20}]} secureTextEntry={true} placeholder="Password" 
                    onChangeText={text => this.setState({password: text})}/>

                <Button sytle={button} title={"Login"} onPress={() => this.checkLogin()}/>

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

export default manualSignIn