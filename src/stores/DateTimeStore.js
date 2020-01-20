import { observable, computed, action, decorate } from 'mobx';

export class DateTimeStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    //login stuff
    loading = true;
    curTime = '';
    curDate = '';

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

decorate(DateTimeStore, {
    loading: observable,
    curTime: observable,
    curDate: observable
})