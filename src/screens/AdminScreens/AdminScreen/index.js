import React, { Component } from 'react'
import AppHeader from '../../../components/NavigationComponents/AppHeader'
import StudentInfoDisplay from '../../../components/StudentComponents/StudentInfoDisplay'

//Styling
import { View, Button, Image, SafeAreaView, Alert } from 'react-native'
import styles from './styles'

//Firebase+Google
import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/auth';

class AdminScreen extends Component {

    constructor(props){
        super(props);
        this.state = ({

        });

        this.teachers = [
            "McSkimin_mcskimin@gmail.com",
            "Murphy_murphy@gmail.com",
            "Online Education_oe@gmail.com",
            "Viet_viet@gmail.com",
            "Weber_weber@gmail.com"
        ]
    }

    componentWillUnmount(){
        this.signOut();
    }

    confirm = async () => {
        Alert.alert(
            "Are you sure you want to perform this action?",
            "",
            [
              {text: "Yes", onPress: ()=>{return true}},
              {text: "Cancel"}
            ],
            //{cancelable: false},
        );
    }

    //How to perform a query of items contained in an array :
    //https://angularfirebase.com/lessons/query-by-array-contains-firestore/
    CREATETEACHERDATABASE = async (teacher, email) => {
        const ref = firebase.firestore().collection('Students');
        const teachRef = firebase.firestore().collection('Teachers');

        var students = [];

        const studs = ref.where("Teachers", "array-contains", ""+teacher);

        await studs.get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                students.push(doc.id);
            })
        })
        
        teachRef.doc(""+teacher).set({
            AttendanceSubmitted: false,
            Name: ""+teacher,
            Email: ""+email,
            Plan: "",
            Max: 0,
            StudentsSignedUp: [],
            StudentRoster: students
        })
    }

    RESET = () => {      
        const teachRef = firebase.firestore().collection('Teachers');

        teachRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.set({
                    AttendanceSubmitted: false,
                    Plan: "",
                    StudentsSignedUp: [],
                }, {merge: true});
            });
        });

        Alert.alert("Teacher daily data has been reset!");
    }

    signOut = async () => {
        try{
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
        }catch(error){
            //console.log(error);
        }
    }

    render() {
        const { container, infoDisp, title, headerContainer, buttons, selector, surface } = styles;

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={container}> 

                    <View style={headerContainer}>
                        <AppHeader title="D'Evelyn Seventh" />
                    </View>
                    
                    <View style={infoDisp}>
                        <StudentInfoDisplay />
                    </View>

                    <View style={buttons}> 
                        <Button title="Create Teacher Database" onPress={
                            () => 
                            {
                                let confirm = this.confirm();
                                if(confirm){
                                    this.teachers.forEach((element) => 
                                        this.CREATETEACHERDATABASE(element.split("_")[0], element.split("_")[1])
                                    )
                                }
                            }
                        }/>
                        <Button title="Reset daily data" onPress={
                            () => 
                            {
                                let confirm = this.confirm();
                                if(confirm){
                                    this.RESET();
                                }
                            }
                        }/>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

export default AdminScreen