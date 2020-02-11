import { observable, computed, action, decorate, autorun } from 'mobx';
import { firebase } from '@react-native-firebase/firestore';

const userTypes = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
    INVALID: "invalid"
}

export class UserInfoStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    //login stuff
    isSigninInProgress = false;
    loading = true;
    userType = userTypes.INVALID;

    //user info
    username = "";
    photoURL = "";

    //firebase
    userFRef;

    setUsername = () => {
        this.username = firebase.auth().currentUser.displayName;
    }

    //make sure the "name" field in firestore is the same as the google displayName
    setFirestoreRef = () => {
        if(this.userType === userTypes.STUDENT){
            this.userFRef = firebase.firestore().collection('Students').where("name","==",this.username);
        }else if(this.userType === userTypes.TEACHER){
            this.userFRef = firebase.firestore().collection('Teachers').where("name","==",this.username);
        }
    }

    getPlan = () => {
        this.setFirestoreRef();
        firebase.firestore().collection('Teachers').doc('Viet').get().then((doc) => {
            if(doc.exists){
                this.plan = doc.data().Plan;
            }else{
                this.plan = "not working?";
            }
        });
    }

    determineUserType = (googleInfo) => {
        if(googleInfo.user.email.indexOf("@jeffcoschools.us") != -1){
            this.userType = userTypes.STUDENT;
        }else if(googleInfo.user.email.indexOf("@jeffco.k12.co.us") != -1){
            this.userType = userTypes.TEACHER;
        }else if(googleInfo.user.email == "thienvietngomai@gmail.com" == 1){
            this.userType = userTypes.TEACHER;
        }else if(googleInfo.user.email == "" == 1){
            //admins go here
            this.userType = userTypes.ADMIN;
        }else{
            this.userType = userTypes.INVALID;
        }
    }
}

decorate(UserInfoStore, {
    isSigninInProgress: observable,
    userType: observable,
    loading: observable,
    username: observable,
    userFRef: observable,
    plan: observable,
    getUsername: action,
    setFirestoreRef: action,
    determineUserType: action,
    getPlan: action,
})