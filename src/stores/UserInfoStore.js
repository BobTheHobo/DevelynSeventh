import { observable, computed, action, decorate } from 'mobx';

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
    photoURL = "";

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
    determineUserType: action
})