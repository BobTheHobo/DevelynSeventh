import React, {useEffect, useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { Surface } from 'react-native-paper'
import styles from './styles'
//MobX
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../stores/RootStore';

import {firebase} from '@react-native-firebase/firestore'
import RequireButton from '../RequireButton';
import AttendanceButton from '../AttendanceButton';

export default TeacherRequire = (props) => {
    //observables
    const rootStore = React.useContext(RootStoreContext);
    //const store = rootStore.userInfoStore;
    //styles
    const {surface} = styles;

    const [students, setStudents] = useState([]);

    useEffect(()=>{
        getFirestoreData("Viet");
    }, [])

    render = () => {
        return (
            <Surface style={surface}>
                <View>
                    <Text>Hello</Text>
                    <FlatList 
                        data={students}
                        renderItem={({item, index}) => {
                            return(
                                <View>
                                    <AttendanceButton name={item}/>
                                    <RequireButton name={item}/>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => item}
                    />
                </View>
            </Surface>
        )
    }

    getFirestoreData = (document) => {
        const ref = firebase.firestore().collection('Teachers').doc(document);

        ref.get().then((doc)=>{
            if(doc.exists){
                setStudents(doc.data().StudentRoster);
            }else{
                console.warn("No document exists")
            }
        })
    }

    return(
        render()
    )
}