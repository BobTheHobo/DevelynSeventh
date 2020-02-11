import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
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
            loading: true,
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
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getData = () => {
        this.ref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data().Teachers);
                this.setState({teachers: doc.data().Teachers});
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
        
        if(this.state.loading){
            return(
                <ActivityIndicator size='large' color='green'/>
            )
        }
        else{
            return (
                <View style={flist}>
                    <Text style={signedUpIn}>
                        <Text>You are signed up in: </Text>
                        <Text style={{fontWeight: 'bold'}}>{this.state.signedUpWith}</Text>
                    </Text>
                    <FlatList 
                        data={this.state.teachers}
                        renderItem={({item, index}) => {
                            console.log(item);
                            return(
                                <SignUpButton 
                                    //signedUpIn={this.state.signedUpWith}
                                    studentNum={this.studentNum}
                                    teacher={item} 
                                    number={index+1}
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
}

export default StudentSeventh
