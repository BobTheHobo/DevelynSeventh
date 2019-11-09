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
            submitted: false,
            submitTitle: 'Submit Attendance'
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
                submitted: doc.data().AttendanceSubmitted
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

    submitConfirm = () => {
        let prompt = "Submit Attendance";
        if(this.state.submitted){
            prompt = "Resubmit?"
        }
        Alert.alert(
            prompt,
            "",
            [
              {text: "Yes", onPress: () => this.submitAttendance()},
              {text: "Cancel"}
            ],
            {cancelable: false},
        );
    }

    submitAttendance(){
        this.ref.set({
            AttendanceSubmitted : true
        }, { merge: true });
        this.state.submitted = true;
        this.setState({submitTitle: "Attendance Submitted!"});
    }

    render() {
        const { box, title, flist, signedUpIn, label, labelText } = styles;
        

        return (
            <View style={flist}>
                <Text style={signedUpIn}>
                    <Text>{"Current plan: "}</Text>
                    <Text style={{fontWeight: 'bold'}}>{this.state.currentPlan+"\n"}</Text>
                    <Text>{"Current students signed up: "}</Text>
                    <Text style={{fontWeight: 'bold'}}>{this.state.currentNum+"/"+this.state.maxNum}</Text>
                </Text>

                <View style={label}>
                    <Text style={labelText}>Present</Text>
                    <Text style={labelText}>Late</Text>
                    <Text style={labelText}>Absent</Text>
                </View>
                
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

                <Button title={this.state.submitTitle} onPress={() => this.submitConfirm()}/>
            </View>
        )

        
    }
}

export default TeacherSeventh