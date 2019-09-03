import React, { Component } from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import styles from './styles'
 
class SignUpButton extends Component {
    render() {
        const { container, number, teacher, split, name, plan } = styles;
        console.log(this.props);

        return (
            <TouchableHighlight>
                <View style={container}>
                    <View style={number}>
                        <Text>{this.props.number}</Text>
                    </View>
                    <View style={teacher}>
                        <View style={split}>
                            <Text style={name}>{this.props.teacher}</Text>
                            <Text style={plan}>This is my plan</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

export default SignUpButton