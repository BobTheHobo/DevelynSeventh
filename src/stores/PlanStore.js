import { observable, computed, action, decorate, autorun } from 'mobx';
import { firebase } from '@react-native-firebase/firestore';

export class PlanStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    editingPlan = false;

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

    switchEdit = () => {
        this.editingPlan ? this.editingPlan = false : this.editingPlan = true;
    }
}

decorate(PlanStore, {
    //blob: observable
    editingPlan: observable,
    currentPlan: observable,
    userFRef: observable,
    currentPlan: observable,
    currentNum: observable,
    maxNum: observable,
    submitted: observable,
    switchEdit: action,
    getData: action,
})