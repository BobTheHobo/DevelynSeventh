import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './styles'
 
class Sidebar extends Component {

    navigate(route){
        this.props.navigation.navigate(route)
    }

    render() {

        const routes = [{
            title: "Login",
            route:"login"
        },
        {
            title: "SeventhScreen",
            route: "seventh"
        }]

        return (
            <View>
                <Image style={{width: 300, height: 300}} source={{uri: "https://codedamn.com/logo.png"}} />
                
                {
                    routes.map(e => (
                        <TouchableOpacity key={e.title} style={styles.link} onPress={ _ => this.navigate(e.route)}>
                            <Text>{e.title}</Text>
                        </TouchableOpacity>
                    )
                )}
                
                <Text>Hi</Text>
                <Text>Nice Sidebar!</Text>
            </View>
        )
    }
}

export default Sidebar