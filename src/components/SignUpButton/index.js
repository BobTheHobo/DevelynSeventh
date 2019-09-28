import React, { Component } from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { Surface } from 'react-native-paper';
import styles from './styles'

import {firebase} from '@react-native-firebase/firestore'
 
class SignUpButton extends Component {
    constructor(props){
        super(props);
        this.state = ({
            plan: 'blank',
            full: false,
            currentNum: 0,
            maxNum: 1,
        });
        this.teachRef = firebase.firestore().collection('Teachers').doc(this.props.teacher);
    }

    componentDidMount(){
        this.getData();
        this.unsubscribe = this.teachRef.onSnapshot((doc) => {
            this.setState({
                plan: doc.data().Plan,
                full: doc.data().Full,
                currentNum: doc.data().NumSignedUp,
                maxNum: doc.data().Max
            });
            this.checkFull();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getData = () => {
        this.teachRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    plan: doc.data().Plan,
                    full: doc.data().Full,
                    currentNum: doc.data().NumSignedUp,
                    maxNum: doc.data().Max
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
    }

    checkFull = () => {
        if(this.state.currentNum == this.state.maxNum){
            this.teachRef.set({Full: true}, {merge: true});
        }else{
            this.teachRef.set({Full: false}, {merge: true});
        }
    }

    render() {
        const { container, number, teacher, split, name, plan, surface, count, full } = styles;

        return (
            <TouchableHighlight onPress={this.props.press}>
                <Surface style={surface}>
                    <View style={container}>
                        <View style={number}>
                            <Text>{this.props.number}</Text>
                        </View>
                        <View style={teacher}>
                            <View style={split}>
                                <Text style={name}>{this.props.teacher}</Text>
                                <Text style={plan}>{this.state.plan}</Text>
                            </View>
                        </View>
                        <View style={full}>
                            {this.fullIndicator()}
                        </View>
                        <View style={count}>
                            <Text>{this.state.currentNum+'/'+this.state.maxNum}</Text>
                        </View>
                    </View>
                </Surface>
            </TouchableHighlight>
        )
    }

    fullIndicator = () => {
        if(this.state.full){
            return(
                <View style={styles.fullButton}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>FULL</Text>
                </View>
            )
        }
    }
}

export default SignUpButton