import React, { Component } from 'react'
import AppHeader from '../../../components/NavigationComponents/AppHeader'
import StudentInfoDisplay from '../../../components/StudentComponents/StudentInfoDisplay'

//Styling
import { View, Button, Image, SafeAreaView } from 'react-native'
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
                            this.teachers.forEach((element) => 
                                this.CREATETEACHERDATABASE(element.split("_")[0], element.split("_")[1])
                            )
                        }/>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

export default AdminScreen