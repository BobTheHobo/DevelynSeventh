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

    //Sorry for all these reset functions. I wanted to simplify it into a single one that took the goal function(RESET() or CREATETEACHERDATABASE()) as
    //a parameter, but i have no idea how to do it
    confirmReset = async () => {
        Alert.alert(
            "Are you sure you want to perform this action?",
            "",
            [
              {text: "Yes", onPress: ()=>this.RESET()},
              {text: "Cancel"},
            ],
            {cancelable: false},
        );
    }

    confirmCreateDatabase = async () => {
        Alert.alert(
            "Are you sure you want to perform this action?",
            "",
            [
              {text: "Yes", onPress: ()=>this.WTF()},
              {text: "Cancel"},
            ],
            {cancelable: false},
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

        console.warn("Teacher Database created");
    }

    WTF = async () => {
        this.teachers.forEach((element) => 
            this.CREATETEACHERDATABASE(element.split("_")[0], element.split("_")[1])
        )
    }

    RESET = async () => {      
        const teachRef = firebase.firestore().collection('Teachers');
        teachRef.get().then(function(querySnapshot) {
            let batch = firebase.firestore().batch();
            querySnapshot.forEach((doc) => {
                const docRef = teachRef.doc(doc.id)
                batch.update(docRef, {
                    AttendanceSubmitted: false,
                    Plan: "",
                    StudentsSignedUp: [],
                })
            })
            batch.commit().then(() => {
                Alert.alert("Teacher daily data has been reset!");
            })
        });
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
                                this.confirmCreateDatabase();
                            }
                        }/>
                        <Button title="Reset daily data" onPress={
                            () => 
                            {
                                this.confirmReset();
                            }
                        }/>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

export default AdminScreen