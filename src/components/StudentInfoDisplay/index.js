import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { firebase } from '@react-native-firebase/auth'
import styles from './styles'
import DateTime from '../DateTime'
 
class StudentInfoDisplay extends Component {
    render() {
        const { box, name, email, studentnum } = styles; 

        return (
            <View style={box}>
                <Text style={name}>{firebase.auth().currentUser.displayName}</Text>
                <Text style={email}>{firebase.auth().currentUser.email}</Text>
                <Text style={studentnum}>2143486</Text>
                <DateTime fontSize = {13} />
            </View>
        )
    }
}

export default StudentInfoDisplay