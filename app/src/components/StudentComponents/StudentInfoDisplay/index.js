import React, { Component } from 'react'
import { View, Text, Button, Image } from 'react-native'
import { firebase } from '@react-native-firebase/auth'
import styles from './styles'
import DateTime from '../../SharedComponents/DateTime'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
 
class StudentInfoDisplay extends Component {
    render() {
        const { container, box, name, email, studentnum, profileImg } = styles; 

        return (
                /*
            <View style={box}>
                <Text style={name}>{firebase.auth().currentUser.displayName}</Text>
                <Text style={email}>{firebase.auth().currentUser.email}</Text>
                <Text style={studentnum}>2143486</Text>
                <DateTime fontSize = {13} />
            </View>
                */
            <View style={container}>
                <Card>
                    <Card.Title 
                        title={firebase.auth().currentUser.displayName} 
                        subtitle={firebase.auth().currentUser.email}
                        left={(props) => <Image 
                            style={profileImg}
                            source={{ uri: firebase.auth().currentUser.photoURL }}/>
                        } 
                    />
                    <Card.Content>
                        <DateTime fontsize = {13} />
                    </Card.Content>
                </Card>
            </View>
        )
    }
}

export default StudentInfoDisplay