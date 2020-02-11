import React, {useEffect} from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styles from './styles'
//MobX
import { observer } from 'mobx-react';
import { RootStoreContext } from '../../../stores/RootStore';
//firebase
import { firebase } from '@react-native-firebase/firestore';

export default PlanEditor = observer((props) => {
    //observables
    const rootStore = React.useContext(RootStoreContext);
    const store = rootStore.planStore;
    //styles
    const { container, title, textEdit, confirmTextEditButtons} = styles;

    //I know you're not supposed to use both MobX and React.state, but it works so who cares :P
    const [value, onChangeText] = React.useState(store.currentPlan);

    const textInput = React.createRef();

    const ref = firebase.firestore().collection('Teachers').doc("Viet");

    useEffect(() => { //essentially the same as componentDidMount()
        unsubscribe = ref.onSnapshot((doc) => {
            rootStore.planStore.getData({
                currentPlan: doc.data().Plan,
                currentNum: doc.data().StudentsSignedUp.length,
                maxNum: doc.data().Max,
                submitted: doc.data().AttendanceSubmitted
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
                        ref={textInput}
                    />
                </View>
                {renderButtons()}
            </View>
        )
    }

    renderButtons = () => {
        if(store.editingPlan){
            return(
                <View style={confirmTextEditButtons}>
                    <Button title="cancel" onPress={()=>{store.switchEdit(), onChangeText(store.currentPlan)}}/>
                    <Button title="clear" onPress={()=>{textInput.current.clear(), onChangeText('')}} color="red"/>
                    <Button title="confirm" onPress={()=>{setPlan(value), (store.switchEdit())}} color="green"/>
                </View>
            )
        }else{
            return(
                <View style={confirmTextEditButtons}>
                    <Button title="edit" onPress={()=>{store.switchEdit()}}/>
                </View>
            )
        }
    }

    setPlan = (updatedPlan) => {
        ref.update({
            Plan: updatedPlan
        }).then(() => {
            console.log("Successfully updated plan to "+updatedPlan);
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    return(
        render()
    )
})