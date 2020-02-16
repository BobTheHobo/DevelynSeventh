import React, { Component } from 'react'
import { TouchableHighlight, TouchableWithoutFeedback, View, Text, Button, Alert } from 'react-native'
import { Surface } from 'react-native-paper';
import styles from './styles'

import {firebase} from '@react-native-firebase/firestore'

import { RootStoreContext } from '../../../stores/RootStore'

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
 
class DisplayButton extends Component {
    constructor(props){
        super(props);
        this.state = ({
            status: "none",
            studentName: "",
            present: false,
            late: false,
            absent: false,
            required: false,
        });

        this.ref =  firebase.firestore().collection('Students').doc(this.props.name);

        this.presentIcon = "md-radio-button-off";
        this.presentColor = "#dedede";
        this.lateIcon = "md-radio-button-off";
        this.lateColor = "#dedede";
        this.absentIcon = "md-radio-button-off";
        this.absentColor = "#dedede";
        
        this.requireColor = "#2196F3";
        this.requireText = "Require";

        this.currentTeacher = firebase.auth().currentUser.displayName;
    }

    componentDidMount(){
        this.getStudentNames();
        console.log(this.props.name)
    }

    getStudentNames = async () => {
        this.ref.get().then((doc) => {
            if(doc.exists) {
                this.setState({studentName: doc.data().Name})
            }else{
                console.warn("No student document exists");
            }
        });
    }

    requireStudent = (req) => {
        if(req){
            this.ref.update({
                Required: this.currentTeacher
            }).then(() => {
                console.warn("Student successfully required");
            }).catch((error)=>{
                console.warn("Error requiring student: ", error);
            })
        }else{
            this.ref.update({
                Required: ""
            }).then(()=>{
                console.warn("Student successfully unrequired");
            }).catch((error)=>{
                console.warn("Error unrequiring student: ", error);
            })
        }
    }

    //Looks like I've recreated (in my ignorance) javascript's existing switch() function TODO: replace to make it cleaner?
    switch = (index) => {
        if(index==1){
            this.switchPresent(this.state.present);
            this.switchLate(true);
            this.switchAbsent(true);
        }else if(index==2){
            this.switchPresent(true);
            this.switchLate(this.state.late);
            this.switchAbsent(true);
        }else if(index==3){
            this.switchPresent(true);
            this.switchLate(true);
            this.switchAbsent(this.state.absent);
        }
    }
    
    switchPresent = (type) => {
        if(type){
            this.setState({present: false});
            this.presentIcon = "md-radio-button-off";
            this.presentColor = '#dedede';
        }else{
            this.setState({present: true});
            this.presentIcon = "md-checkmark-circle";
            this.presentColor = 'green';
        }
    }

    switchLate = (type) => {
        if(type){
            this.setState({late: false});
            this.lateIcon = "md-radio-button-off";
            this.lateColor = '#dedede';
        }else{
            this.setState({late: true});
            this.lateIcon = "md-clock";
            this.lateColor = 'gold';
        }
    }

    switchAbsent = (type) => {
        if(type){
            this.setState({absent: false});
            this.absentIcon = "md-radio-button-off";
            this.absentColor = '#dedede';
        }else{
            this.setState({absent: true});
            this.absentIcon = "md-close-circle";
            this.absentColor = 'red';
        }
    }

    switchRequire = (type) => {
        if(type){
            this.setState({required: true});
            this.requireColor = 'green';
            this.requireText = "Required";
            this.requireStudent(true);
        }else{
            this.setState({required: false});
            this.requireColor = "#2196F3";
            this.requireText = "Require";
            this.requireStudent(false);
        }
    }

    render() {
        const { container, name, surface, surfaceRequire, presentButton, lateButton, absentButton, requireButton} = styles;

        const AttendanceButton = (
            <TouchableHighlight>
                <Surface style={surface, {margin: 5}}>
                    <View style={container}>
                        <View style={name}>
                            <Text>{this.state.studentName}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.switch(1)}>
                            <View style={presentButton}>
                                <Ionicons name={this.presentIcon} size={30} color={this.presentColor} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={lateButton} onPress={() => this.switch(2)}>
                            <View style={lateButton}>
                                <Ionicons name={this.lateIcon} size={30} color={this.lateColor} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={absentButton} onPress={() => this.switch(3)}> 
                            <View style={presentButton}>
                                <Ionicons name={this.absentIcon} size={30} color={this.absentColor} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Surface>
            </TouchableHighlight>
        )

        const RequireButton = (
            <TouchableHighlight>
                <Surface style={surface, {marginVertical: 5}}>
                    <View style={container}>
                        <View style={name}>
                            <Text>{this.state.studentName}</Text>
                        </View>
                        <View style={requireButton}>
                            <Button title={this.requireText} onPress={()=>{this.switchRequire(!this.state.required)}} color={this.requireColor}/>
                        </View>
                    </View>
                </Surface>
            </TouchableHighlight>
        )

        if(this.props.type==="require"){
            return(
                RequireButton
            )
        }else if(this.props.type==="attendance"){
            return(
                AttendanceButton
            )
        }else{
            return(
                AttendanceButton
            )
        }
    }
}

export default DisplayButton