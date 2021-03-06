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
            signedUpIn: "",
            present: false,
            late: false,
            absent: false,
            requiredByMe: false,
            requiredByDiff: false,

            loaded: false,
        });

        this.ref =  firebase.firestore().collection('Students').doc(this.props.name);

        this.presentIcon = "md-radio-button-off";
        this.presentColor = "#dedede";
        this.lateIcon = "md-radio-button-off";
        this.lateColor = "#dedede";
        this.absentIcon = "md-radio-button-off";
        this.absentColor = "#dedede";

        this.currentTeacher = firebase.auth().currentUser.displayName;
    }

    componentDidMount(){
        this.getFirestoreData();
        console.log(this.props.name)
    }

    getFirestoreData = async () => {
        this.ref.get().then((doc) => {
            if(doc.exists) {
                this.setState({studentName: doc.data().Name})

                signedUpInRef = doc.data().SignedUpWith;
                requiredByRef = doc.data().Required;

                if(requiredByRef==="Viet Ngomai"){//required by signed in teacher
                    this.setState({requiredByMe: true})
                }else if(requiredByRef===""){//not required
                    this.setState({signedUpIn: signedUpInRef})
                }else{
                    this.setState({signedUpIn: requiredByRef})
                    this.setState({requiredByDiff: true})
                }
                this.setState({loaded: true});
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
            this.setState({requiredByMe: true});
            this.requireColor = 'green';
            this.requireText = "Required";
            this.requireStudent(true);
        }else{
            this.setState({requiredByMe: false});
            this.requireColor = "#2196F3";
            this.requireText = "Require";
            this.requireStudent(false);
        }
    }
    
    render() {
        const { container, name, nameSplit, surface, signedUpInText, requiredByText, surfaceRequire, presentButton, lateButton, absentButton, requireButton} = styles;

        attendanceLoading = () => {
            if(this.state.loaded){
                return(
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
                )
            }else{
                return(
                    <View></View>
                )
            }
        }

        const AttendanceButton = (
            <TouchableHighlight>
                <Surface style={surface, {margin: 5}}>
                    {/*<View style={container}>*/}
                        {attendanceLoading()}
                    {/* </View> */}
                </Surface>
            </TouchableHighlight>
        )

        const RequireButton = () => {
            if(this.state.loaded){
                if(this.state.requiredByMe){
                    this.requireColor = "green";
                    this.requireText = "Required";
                    rendering = (
                        <View style={requireButton}>
                            <Button title={this.requireText} onPress={()=>{this.switchRequire(!this.state.requiredByMe)}} color={this.requireColor}/>
                        </View>
                    )
                }else if(this.state.requiredByDiff){
                    // this.requireColor = "red";
                    this.requireText = "Required by "+this.state.signedUpIn;
                    rendering = (
                        <View style={requireButton}>
                            <Button title={this.requireText} onPress={()=>{this.switchRequire(!this.state.requiredByMe)}} color={this.requireColor} disabled={true}/>
                        </View>
                    )
                }else{
                    this.requireColor = "#2196F3";
                    this.requireText = "Require";
                    rendering = (
                        <View style={requireButton}>
                            <Button title={this.requireText} onPress={()=>{this.switchRequire(!this.state.requiredByMe)}} color={this.requireColor}/>
                        </View>
                    )
                }
                return(
                    <TouchableHighlight>
                        <Surface style={surface, {marginVertical: 5}}>
                            <View style={container}>
                                <View style={name}>
                                    <Text>{this.state.studentName}</Text>
                                </View>
                                {rendering}
                            </View>
                        </Surface>
                    </TouchableHighlight>
                )
            }else{
                return(<View></View>)
            }
        }
        
        searchText = () => {
            if(this.state.requiredByMe){
                return(
                    <View style={requiredByText}>
                        <Text style={{fontSize: 10}}>Required by:</Text>
                        <Text>You</Text>
                    </View>
                )
            }else if(this.state.requiredByDiff){
                return(
                    <View style={requiredByText}>
                        <Text style={{fontSize: 10}}>Required by:</Text>
                        <Text>{this.state.signedUpIn}</Text>
                    </View>
                )
            }else{
                return(
                    <View style={signedUpInText}>
                        <Text>{this.state.signedUpIn}</Text>
                    </View>
                )
            }
        }

        const SearchButton = (
            <Surface style={surface, {margin: 5}}>
                <View style={container}>
                    <View style={nameSplit}>
                        <View>
                            <Text>{this.state.studentName}</Text>
                        </View>
                        {searchText()}
                    </View>
                </View>
            </Surface>
        )


        const TextDisplay = (
            <Surface style={surface, {margin: 5}}>
                <View style={container}>
                    <Text style={{marginLeft: 10}}>{this.props.name}</Text>
                </View>
            </Surface>
        )

        if(this.props.type==="require"){
            return(
                RequireButton()
            )
        }else if(this.props.type==="attendance"){
            return(
                AttendanceButton
            )
        }else if(this.props.type==="search"){
            return(
                SearchButton
            )
        }else if(this.props.type==="textDisplay"){
            return(
                TextDisplay
            )
        }else{
            return(
                <Text>Display button not found</Text>
            )
        }
    }
}

export default DisplayButton