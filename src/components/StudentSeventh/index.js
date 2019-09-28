import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import styles from './styles'

//Firebase
import { firebase } from '@react-native-firebase/firestore';

//Other components
import SignUpButton from '../SignUpButton'

class StudentSeventh extends Component {

    constructor(props){
        super(props);
        this.state = ({
            teachers: [],
        });

        this.email = firebase.auth().currentUser.email
        this.studentNum = this.email.slice(0,this.email.indexOf('@jeffcoschools.us'));
        this.ref = firebase.firestore().collection('Students').doc(this.studentNum);

        this.teachRef = firebase.firestore().collection('Teachers');
    }

    componentDidMount(){
        this.getData();
        this.unsubscribe = this.ref.onSnapshot((doc) => {
            console.log('Im signed up in'+ doc.data().SignedUpWith);
            this.setState({
                signedUpWith: doc.data().SignedUpWith,
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
        this.ref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data().Teachers);
                this.setState({teachers: doc.data().Teachers})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
    }

    render() {
        const { flist, signedUpIn } = styles;

        return (
            <View style={flist}>
                <Text style={signedUpIn}>{'You are signed up in: '+this.state.signedUpWith}</Text>
                <FlatList 
                    data={this.state.teachers}
                    renderItem={({item, index}) => {
                        console.log(item);
                        return(
                            <SignUpButton 
                                teacher={item} 
                                number={index+1}
                                press={()=>this.signUpAlert(item)}
                            />
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
