import React, { Component } from 'react'
import { View, Button, Text, TouchableOpacity, List, ListItem, FlatList, Alert } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { BottomTabBar } from 'react-navigation';
import styles from './styles'
import { firebase } from '@react-native-firebase/firestore';
import SignUpButton from '../SignUpButton'

class StudentSeventh extends Component {

    constructor(props){
        super(props);
        this.state = ({
            teachers: [],
            plan: [],
            signedUpWith: '',
            loading: true,
        });
        //this.studentNum = firebase.auth().currentUser.email.split('@jeffcoschools.us')
        this.ref = firebase.firestore().collection('Students').doc('2143486');
        this.teachRef = firebase.firestore().collection('Teachers');
    }

    componentDidMount(){
        this.getData();

        this.unsubscribe = this.ref.onSnapshot((doc) => {
            console.log('Im signed up in'+ doc.data().SignedUpWith);
            this.setState({
                signedUpWith: doc.data().SignedUpWith,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    signUpAlert = teacher => {
        Alert.alert(
            ''+teacher,
            'Sign up here?',
            [
              {text: 'Cancel'},
              {text: 'Yes', onPress: () => this.signUp(teacher)},
            ],
            //{cancelable: false},
        );
    }

    signUp = teacher => {
        this.ref.set({SignedUpWith: teacher}, {merge: true});
    }

    getData = () => {
        const plans = [];
        this.ref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data().Teachers);
                this.setState({teachers: doc.data().Teachers})

                doc.data().Teachers.forEach((item) => {
                    this.teachRef.where("Name", "==", "Murphy")
                    .get()
                    .then((teacherList) => {
                        teacherList.forEach((doc2) => {
                            console.log("Teacher plan = ", doc2.data().Plan);
                            console.log("foeiaiofj" + doc2.data().Name);
                        })
                    })
                    .catch((error) => {
                        console.log("something bad happened while collecting data");
                    });
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
    }

    render() {
        const { box, title, flist, signedUpIn } = styles;

        if(this.state.loading){
            return null;
            //TODO: add loadign?
        }

        return (
            <View style={flist}>
                <Text style={signedUpIn}>{'You are signed up in: '+this.state.signedUpWith}</Text>
                <FlatList 
                    data={this.state.teachers}
                    renderItem={({item, index}) => {
                        console.log(item);
                        return(
                                <SignUpButton teacher={item} number={index+1} press={()=>this.signUpAlert(item)}/>
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
