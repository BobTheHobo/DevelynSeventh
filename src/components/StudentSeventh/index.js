import React, { Component } from 'react'
import { View, Button, Text, TouchableOpacity, List, ListItem, FlatList } from 'react-native'
import { Item } from 'native-base';
import { BottomTabBar } from 'react-navigation';
import styles from './styles'
import { firebase } from '@react-native-firebase/firestore';
import SignUpBotton from '../SignUpButton'

class StudentSeventh extends Component {

    constructor(props){
        super(props);
        this.state = ({
            teachers: [],
            signedUpWith: '',
            loading: true,
        });
        this.ref = firebase.firestore().collection('Students').doc('2143486')
    }

    componentDidMount(){
        this.getData();
        this.unsubscribe = this.ref.onSnapshot((doc) => {
            console.log(doc.data().SignedUpWith);
            this.setState({
                signedUpWith: doc.data().SignedUpWith,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getData = () => {
        this.ref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data().Teachers);
                this.setState({teachers: doc.data().Teachers});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        })
    }

    render() {
        const { box, title, flist } = styles;

        if(this.state.loading){
            return null;
            //TODO: add loadign?
        }

        return (
            <View style={flist}>
                <Text>{this.state.signedUpWith}</Text>
                <FlatList 
                    data={this.state.teachers}
                    renderItem={({item, index}) => {
                        console.log(item);
                        return(
                                <SignUpBotton teacher={item} number={index}/>
                        )
                    }}
                    keyExtractor={(item, index) => item}
                >
                </FlatList>
            </View>
        )
    }
}

export default StudentSeventh
