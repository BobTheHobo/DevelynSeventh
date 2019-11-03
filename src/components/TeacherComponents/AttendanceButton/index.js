import React, { Component } from 'react'
import { TouchableHighlight, View, Text, Alert } from 'react-native'
import { Surface } from 'react-native-paper';
import styles from './styles'

import {firebase} from '@react-native-firebase/firestore'
 
class AttendanceButton extends Component {
    constructor(props){
        super(props);
        this.state = ({
            status: "none"
        });
    }


    render() {
        const { container, name, surface} = styles;

        return (
            <TouchableHighlight>
                <Surface style={surface}>
                    <View style={container}>
                        <View style={name}>
                            <Text>{this.props.name}</Text>
                        </View>
                    </View>
                </Surface>
            </TouchableHighlight>
        )
    }
}

export default AttendanceButton