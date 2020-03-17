import React, {useEffect} from 'react'
import { View, Text, TouchableHighlight, TextInput, ActivityIndicator, FlatList } from 'react-native'
import { Surface } from 'react-native-paper'
import styles from './styles'
//MobX
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../stores/RootStore';

import DisplayButton from '../DisplayButton';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {firebase} from '@react-native-firebase/firestore';

export default TeacherFindStudent = (props) => {
    //observables
    const rootStore = React.useContext(RootStoreContext);
    //const store = rootStore.userInfoStore;
    //styles
    const {container, surface, title, searchS, searchBox, searchButton} = styles;

    const [value, onChangeText] = React.useState();
    const [loading, changeLoading] = React.useState(true);
    var [resultsHolder, changeResults] = React.useState([]);
    const [partOfRoster, changePartOfRoster] = React.useState(false);
    const [studentRoster, setStudentRoster] = React.useState([]);

    var studentResults = [];

    const ref = firebase.firestore().collection('Students')

    useEffect(()=>{
        getStudentRoster("Viet")
    }, [])

    getStudentRoster = (document) => {
        const ref = firebase.firestore().collection('Teachers').doc(document);

        ref.get().then((doc)=>{
            if(doc.exists){
                setStudentRoster(doc.data().StudentRoster);
            }else{
                console.warn("No document exists")
            }
        })
    }

    searchStudent = (requestedSearch) => {
        ref.where("NameArray", "array-contains", requestedSearch).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => { 
                //doc.data() is never undefined for query snapshots so no need to check doc.exists
                studentResults.push(doc.id);
                changeResults(resultsHolder = [...studentResults]) //copies studentResults to state

                if(studentRoster.includes(doc.id)){
                    changePartOfRoster(true)
                    console.warn("part of roster");
                }
            })
            changeResults(resultsHolder = [...studentResults]) //ensure that even if query results are blank it updates state to reflect that
            console.warn(studentResults);
            console.warn("results holder", resultsHolder);
            changeLoading(false);
        }).catch((error)=>{
            console.warn("Error searching for this student: "+requestedSearch, error);
        })
    }

    listEmptyFList = () => {
        return(
            // <View style={container}>
            //     <Text>No search found</Text>
            // </View>
            <DisplayButton name={"No search found"} type={"textDisplay"}/>
        )
    }

    fListHeader = () => {
        return(
            <View style={{width: '100%', paddingHorizontal: 15, flexDirection: 'row',  justifyContent: 'space-between'}}>
                <Text style={{fontSize: 10}}>Name</Text>
                <View style={{width: 100}}>
                    <Text style={{fontSize: 10}}>Signed up in:</Text>
                </View>
            </View>
        )
    }

    render = () => {
        return (
            <View style={{flex: 1}}>
                <Surface style={surface}>
                    <View>
                        <Text style={title}>Search:</Text>
                        <View style={searchS}>
                            <View style={searchBox}>
                                <TextInput
                                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                    placeholder = {"Enter a student name"}
                                    onChangeText={text => onChangeText(text)}
                                    value={value}
                                    onSubmitEditing={()=>{searchStudent(value.toLowerCase())}}
                                />
                            </View>
                            <View>
                                <TouchableHighlight style={searchButton} onPress={()=>{(value!==undefined) ? searchStudent(value.toLowerCase()) : searchStudent("")}}>
                                    <Ionicons name={"md-search"} size={30} color={'white'} />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Surface>
                <View style={{marginHorizontal: 5}}>
                    {renderSearchResults()}
                </View>
            </View>
        )
    }

    renderSearchResults = () => {
        if(!loading ){
            return(
                <View>
                    <FlatList
                        data={resultsHolder}
                        renderItem={({item}) => {
                            console.warn(item);
                            return(
                                <DisplayButton name={item} type={"search"}/>
                            )
                        }}
                        extraData={resultsHolder}
                        ListEmptyComponent={listEmptyFList()}
                        ListHeaderComponent={fListHeader()}
                        keyExtractor={(item) => item}
                    />
                </View>
            )
        }else{
            return(
                <View>
                </View>
            )
        }
    }

    return(
        render()
    )
}