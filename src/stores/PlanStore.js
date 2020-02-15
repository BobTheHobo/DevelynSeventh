import { observable, computed, action, decorate, autorun } from 'mobx';
import { firebase } from '@react-native-firebase/firestore';

const type = {
    NUM: 0,
    PLAN: 1
}

export class PlanStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    editingPlan = false;
    editingNum = false;

    getData = ({currentPlan, currentNum, maxNum, submitted}) => {
        this.currentPlan = currentPlan;
        this.currentNum = currentNum;
        this.maxNum = maxNum;
        this.submitted = submitted;
    }
    
    updatePlan(plan){
        firebase.firestore().collection();
    }

    getStudentNames = async () => {
        firebase.firestore().collection('Students').doc(this.props.name).get().then((doc) => {
            if(doc.exists) {
                this.setState({studentName: doc.data().Name})
            }else{
                console.warn("No student document exists");
            }
        });
    }

    switchEdit = (mode) => {
        if(mode===type.PLAN){
            this.editingPlan ? this.editingPlan = false : this.editingPlan = true;
        }else{
            this.editingNum ? this.editingNum = false : this.editingNum = true;
        }
    }
}

decorate(PlanStore, {
    //blob: observable
    editingPlan: observable,
    currentPlan: observable,
    editingNum: observable,
    userFRef: observable,
    currentPlan: observable,
    currentNum: observable,
    maxNum: observable,
    submitted: observable,
    switchEdit: action,
    getData: action,
})