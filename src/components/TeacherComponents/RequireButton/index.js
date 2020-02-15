import React, {Component, useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { Surface } from 'react-native-paper'
import styles from './styles'
//MobX
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../stores/RootStore';

import { firebase } from '@react-native-firebase/firestore';

export default RequireButton = (props) => {

    const [studentName, setStudentName] = useState("");

    useEffect(()=>{
        getStudentNames();
        console.log(props.name);
    })

    getStudentNames = async () => {
        firebase.firestore().collection('Students').doc(props.name).get().then((doc) => {
            if(doc.exists) {
                setStudentName(doc.data().Name);
            }else{
                console.warn("No student document exists");
            }
        });
    }

    render = () => {
        const { container, name, surface, presentButton, lateButton, absentButton} = styles;

        return (
                <Surface style={surface}>
                    <View style={container}>
                        <View style={name}>
                            <Text>{studentName}</Text>
                        </View>
                    </View>
                </Surface>
        )
    }

    return(
        render()
    )
}