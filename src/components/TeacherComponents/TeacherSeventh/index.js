import React, { Component } from 'react'
import { View, Button, Text, TouchableOpacity, List, ListItem, FlatList, Alert } from 'react-native'
import styles from './styles'
import { firebase } from '@react-native-firebase/firestore';
import DisplayButton from '../DisplayButton';
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
            submitTitle: 'Submit Attendance',
            butColor: '#2196F3'
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
            if(this.state.submitted){
                this.setState({submitTitle: 'Attendance Submitted!'});
                this.setState({butColor: 'green'});
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getStudentRoster = (teacher) => {
        const ref = firebase.firestore().collection('Teachers').doc(teacher);

        this.ref.onSnapshot((doc) => {
            if(doc.exists){
                this.setState({studentRoster: doc.data().StudentRoster})
            }else{
                console.warn("No document exists")
            }
        })
    }

    submitConfirm = (prompt) => {
        Alert.alert(
            prompt,
            "",
            [
                {text: "Yes", onPress: () => {
                    if(prompt === "Revoke Submission?"){
                        this.ref.update({
                            AttendanceSubmitted: false
                        })
                        this.setState({submitted: false});
                        this.setState({submitTitle: "Submit Attendance"})
                        this.setState({butColor: '#2196F3'});
                    }else if(prompt === "Submit Attendance?"){
                        this.ref.update({
                            AttendanceSubmitted : true
                        });
                        this.setState({submitted: true});
                        this.setState({submitTitle: "Attendance Submitted!"});
                        this.setState({butColor: 'green'});
                    }else{
                        console.warn("Something went wrong w/ submission")
                    }
                    
                }},
                {text: "Cancel"},
            ],
            {cancelable: false},
        );
    }

    submitAttendance(){
        if(!this.state.submitted){
            this.submitConfirm("Submit Attendance?");
        }else{
            this.submitConfirm("Revoke Submission?");
        }
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
                                <DisplayButton 
                                    name={item}
                                    type={"attendance"}
                                />
                            )
                        }}
                        extraData={this.state.studentRoster}
                        keyExtractor={(item, index) => item}
                    >
                </FlatList>
                
                <Button title={this.state.submitTitle} color={this.state.butColor} onPress={() => this.submitAttendance()}/>
            </View>
        )

        
    }
}

export default TeacherSeventh