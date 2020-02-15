import React, {useEffect} from 'react'
import { View, Text, TextInput, Button, TouchableHighlight } from 'react-native'
import styles from './styles'
//MobX
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../stores/RootStore';
//firebase
import { firebase } from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
//icons can be found here https://oblador.github.io/react-native-vector-icons/

export default PlanEditor = observer((props) => {
    //observables
    const rootStore = React.useContext(RootStoreContext);
    const store = rootStore.planStore;
    //styles
    const { container, title, textEdit, confirmTextEditButtons, confirmNumEditButtons, numEdit, numButtons, numUpDown} = styles;

    //I know you're not supposed to use both MobX and React.state, but it works so who cares :P
    const [value, onChangeText] = React.useState(store.currentPlan);
    const [numValue, onChangeNum] = React.useState(store.maxNum);

    const textInput = React.createRef();

    const ref = firebase.firestore().collection('Teachers').doc("Viet");

    useEffect(() => { //keeps track of all the changes in firestore
        unsubscribe = ref.onSnapshot((doc) => {
            rootStore.planStore.getData({
                currentPlan: doc.data().Plan,
                currentNum: doc.data().StudentsSignedUp.length,
                maxNum: doc.data().Max.toString(),
            });
        });

        return function cleanup() {
            unsubscribe();
        }
    })

    render = () => {
        return (
            <View style={container}>
                <Text style={title}>Current Plan:</Text>
                <View style={textEdit}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        defaultValue = {store.currentPlan}
                        onChangeText={text => onChangeText(text)}
                        value={(store.editingPlan) ? value : store.currentPlan} //ensures that plan displayed is always in sync with firestore, even if plan is being altered from firestore
                        editable={store.editingPlan}
                        onSubmitEditing={()=>{setFirestore(type.PLAN, value), store.switchEdit(type.PLAN)}}
                        ref={textInput}
                    />
                </View>
                {renderButtons(type.PLAN)}
                <Text style={title}>Max Number of Students:</Text>
                <View style={numEdit}>
                    <TextInput
                        style={{ height: 40, width: 40, marginRight: 5, borderColor: 'gray', borderWidth: 1}}
                        defaultValue = {store.maxNum}
                        onChangeText={num => onChangeNum(num)}
                        value={(store.editingNum) ? numValue : store.maxNum}
                        editable={store.editingNum}
                        onSubmitEditing={()=>{setFirestore(type.NUM, changeNum(numValue, upOrDown.NONE)), store.switchEdit(type.NUM)}}
                        maxLength={2}
                        keyboardType={"number-pad"}
                    />
                    {renderButtons(type.NUM)}
                </View>
            </View>
        )
    }

    const type = {
        NUM: 0,
        PLAN: 1
    }
    renderButtons = (mode) => { 
        if(mode==type.PLAN){
            if(store.editingPlan){
                return(
                    <View style={confirmTextEditButtons}>
                        <Button title="cancel" onPress={()=>{store.switchEdit(type.PLAN), onChangeText(store.currentPlan)}}/>
                        <Button title="clear" onPress={()=>{textInput.current.clear(), onChangeText('')}} color="red"/>
                        <Button title="save" onPress={()=>{setFirestore(type.PLAN, value), store.switchEdit(type.PLAN)}} color="green"/>
                    </View>
                )
            }else{
                return(
                    <View style={confirmTextEditButtons}>
                        <Button title="edit" onPress={()=>{store.switchEdit(type.PLAN)}}/>
                    </View>
                )
            }
        }else{
            if(store.editingNum){
                return(
                    <View style={confirmNumEditButtons}>
                        <View style={numUpDown}>
                            <TouchableHighlight style={numButtons} onPress={()=>{changeNum(-1,upOrDown.UP)}}>
                                <Ionicons name={"md-arrow-up"} size={25} color={'white'} />
                            </TouchableHighlight>
                            <TouchableHighlight style={numButtons} onPress={()=>{changeNum(-1,upOrDown.DOWN)}}>
                                <Ionicons name={"md-arrow-down"} size={25} color={'white'} />
                            </TouchableHighlight>
                        </View>
                        <View style={{marginLeft: 5}}>
                            <Button title="cancel" onPress={()=>{store.switchEdit(type.NUM), onChangeNum(store.maxNum)}}/>
                        </View>
                        <View style={{marginLeft: 5}}>
                            <Button title="save" onPress={()=>{setFirestore(type.NUM, changeNum(numValue, upOrDown.NONE)), store.switchEdit(type.NUM)}} color="green"/>
                        </View>
                    </View>
                )
            }else{
                return(
                    <View style={confirmNumEditButtons}>
                        <Button title="edit" onPress={()=>{store.switchEdit(type.NUM)}}/>
                    </View>
                )
            }
        }
    }

    setFirestore = (mode, updatedVal) => {
        if(mode===type.PLAN){
            ref.update({
                Plan: updatedVal
            }).then(() => {
                console.log("Successfully updated plan to: "+updatedVal);
            }).catch((error) => {
                console.error("Error updating plan: ", error);
            });
        }else if(mode===type.NUM){
            newMax = parseInt(updatedVal, 10)
            ref.update({ //update firestore
                Max: newMax
            }).then(() => {
                console.log("Successfully updated max to: "+newMax);
            }).catch((error) => {
                console.log("Error updating max: ", error);
            })
        }
    }

    const upOrDown = {
        UP: 1,
        NONE: 0,
        DOWN: -1
    }
    changeNum = (updNum, upOrDown) => {
        let newNum = 0;
        const curNum = parseInt(numValue, 10);
        const updatedNum = parseInt(updNum, 10);

        if(updatedNum===-1){
            if((curNum>0) || (curNum===0 && upOrDown===1)){ //using incremental arrows
                newNum = curNum+upOrDown;
            }
        }else{ //using numpad input
            if(!isNaN(updatedNum) && (updatedNum>=1 || updatedNum===0)){
                newNum = updatedNum;
            }
        }

        onChangeNum(newNum.toString()) //update state
        return newNum;
    }

    return(
        render()
    )
})