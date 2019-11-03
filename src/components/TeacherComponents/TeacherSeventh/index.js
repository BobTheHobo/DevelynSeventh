import React, { Component } from 'react'
import { View, Button, Text, TouchableOpacity, List, ListItem, FlatList, Alert } from 'react-native'
import styles from './styles'
import { firebase } from '@react-native-firebase/firestore';
import AttendanceButton from '../AttendanceButton';
import { GoogleSignin } from 'react-native-google-signin';

class TeacherSeventh extends Component {

    constructor(props){
        super(props);
        this.state = ({
            currentPlan : "No 7th",
            studentRoster: [],
            currentNum:0,
            maxNum:0,
        });

        this.ref = firebase.firestore().collection('Teachers').doc("Viet");
    }

    componentDidMount(){
        this.getStudentRoster("Viet");
        this.unsubscribe = this.ref.onSnapshot((doc) => {
            this.setState({
                currentPlan: doc.data().Plan,
                currentNum: doc.data().StudentsSignedUp.length,
                maxNum: doc.data().Max,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getStudentRoster = (teacher) => {
        const ref = firebase.firestore().collection('Teachers').doc(teacher);

        ref.get().then((snapshot) => {
            if(snapshot.exists){
                this.setState({studentRoster: snapshot.data().StudentRoster})
            }else{
                console.warn("No document exists")
            }
        }).catch((error) => {
            console.warn("Error retrieving document: "+error);
        });
    }

    render() {
        const { box, title, flist, signedUpIn } = styles;
        

        return (
            <View style={flist}>
                <Text style={signedUpIn}>Current plan: </Text>
                <Text>this.state.currentPlan+"\n"</Text>
                <Text>Current number of students: </Text>
                <Text>this.state.currentNum+"/"+this.state.maxNum</Text>
                
                <FlatList 
                        data={this.state.studentRoster}
                        renderItem={({item, index}) => {
                            return(
                                <AttendanceButton 
                                    name={item}
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

export default TeacherSeventh
