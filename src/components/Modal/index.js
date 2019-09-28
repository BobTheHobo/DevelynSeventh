import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from './styles'
 
class Modal extends Component {
    render() {
        const { container, modalBox, confirmButtons, titleSection, title, button } = styles;
        return (
            <View style={container}>
                <View style={modalBox}>
                    <View style={titleSection}>
                        <Text style={title}>{this.props.message}</Text>
                    </View>
                    <View style={confirmButtons}>
                        <View style={button}>
                            <Button title="Yes" /*onPress={this.props.confirm}*/></Button> 
                        </View>
                        <View style={button}>
                            <Button title="No" ></Button> 
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Modal