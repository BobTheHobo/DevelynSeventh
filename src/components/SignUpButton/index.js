import React, { Component } from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import styles from './styles'
 
class SignUpButton extends Component {
    render() {
        const { container, number, teacher } = styles;
        console.log(this.props);

        return (
            <TouchableHighlight>
                <View style={container}>
                    <View style={number}>
                        <Text>{this.props.number}</Text>
                    </View>
                    <View style={teacher}>
                        <Text>{this.props.teacher}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

export default SignUpButton