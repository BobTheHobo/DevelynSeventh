import React, { Component } from 'react'
import { TouchableHighlight, View, Text, Alert } from 'react-native'
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

        this.studentNum = this.props.studentNum;
        
        this.ref = firebase.firestore().collection('Students').doc(this.studentNum);
        this.teachRef = firebase.firestore().collection('Teachers').doc(this.props.teacher);
    }

    componentDidMount(){
        this.unsubscribe();
    }

    unsubscribe = () => {
        this.teachRef.onSnapshot((doc) => {
            this.setState({
                plan: doc.data().Plan,
                currentNum: doc.data().StudentsSignedUp.length,
                maxNum: doc.data().Max,
            });
            if(this.state.maxNum===this.state.currentNum){
                this.setState({full: true});
            }else{
                this.setState({full: false});
            }
        });
        this.ref.onSnapshot((doc) => {
            this.setState({
                signedUpWith: doc.data().SignedUpWith,
                currentRef: firebase.firestore().collection('Teachers').doc(doc.data().SignedUpWith)
            });
        });
    }

    checkFull = () => {
        if(this.state.currentNum === this.state.maxNum){
            return true;
        }else{
            return false;
        }
    }

    isPastTime = () => {
        var d = new Date();
        var hour = d.getHours();
        var min = d.getMinutes();

        console.warn(hour+' '+min);

        if((hour == 13 && min >=45) || (hour == 14 && min < 30)) {
            return true;    
        }else{
            return false;
        }
    }

    signUpAlert = (teacher, type) => {
        var title='';
        var message='';
        var buttonMessage='Ok';
        var signUpMsg="";
        var cancel=true;
        
        var allowSignUp=false;

        if(type == "confirm"){
            title=''+teacher;
            message='Sign up here?';
            buttonMessage='Cancel';
            signUpMsg='Yes';
            cancel=false;
            allowSignUp=true;
        }
        else if(type == "full"){
            //Correct grammar? Hell yeah
            if(teacher.slice(-1) == 's'){
                title = teacher+'\' class is full!'
            }else if((teacher+'') == "Library" || (teacher+'') == "Counseling"){
                title = teacher+' is full!'
            }else{
                title = teacher+'\'s class is full!'
            }
            message = 'Please sign up in another class.'
        }else if(type == "pastTime"){
            title='You\'re out of time!';
            message='Please go to the counceling office.';
        }else{
            title="Error!";
            message='Wrong/Missing signUpAlert code?'
        }

        if(allowSignUp){
            Alert.alert(
                title,
                message,
                [
                {text: buttonMessage},
                {text: signUpMsg, onPress: () => this.signUp(teacher)}
                ],
                {cancelable: cancel},
            );
        }else{
            Alert.alert(
                title,
                message,
                [
                {text: buttonMessage},
                ],
                {cancelable: cancel},
            );
        }
    }

    processRequest = (teacher) => {
        if(this.isPastTime()){
            this.signUpAlert(teacher, "pastTime");
        }else if(this.checkFull()){
            this.signUpAlert(teacher, "full");
        }else{
            this.signUpAlert(teacher, "confirm")
        }
    }

    signUp = teacher => {
        if(!this.checkFull() && this.state.signedUpWith==''){

            //Change student's signedUpWith
            this.ref.update({SignedUpWith: teacher});

            //Add student to teacher's 7th
            this.teachRef.update({StudentsSignedUp: firebase.firestore.FieldValue.arrayUnion(this.studentNum)});

        }
        else if(!this.checkFull() && (this.state.signedUpWith.localeCompare(teacher+'') != 0)){

            //Remove student from current teacher signed up with
            this.state.currentRef.update({StudentsSignedUp: firebase.firestore.FieldValue.arrayRemove(this.studentNum)});

            //Change student's signedUpWith
            this.ref.update({SignedUpWith: teacher});

            //Add student to teacher's 7th
            this.teachRef.update({StudentsSignedUp: firebase.firestore.FieldValue.arrayUnion(this.studentNum)});

        }
    }

    render() {
        const { container, number, teacher, split, name, plan, surface, count, full } = styles;

        return (
            <TouchableHighlight style={{flex: 1, margin: 5}} 
            onPress={(this.state.signedUpWith!==this.props.teacher) ? (() => this.processRequest(this.props.teacher)) : null}>
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