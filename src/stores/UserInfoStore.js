import { observable, computed, action, autorun } from 'mobx';

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

    @observable isSigninInProgress = false;
    @observable userType = userTypes.INVALID;
    @observable loadingInfo = true;

    @action determineUserType = (googleInfo) => {
        if(googleInfo.user.email.indexOf("@jeffcoschools.us") != -1){
            this.setState({userType: userTypes.STUDENT});
        }else if(googleInfo.user.email.indexOf("@jeffco.k12.co.us") != -1){
            this.setState({userType: userTypes.TEACHER});
        }else if(googleInfo.user.email == "thienvietngomai@gmail.com" == 1){
            this.setState({userType: userTypes.TEACHER});
        }else if(googleInfo.user.email == "" == 1){
            //admins go here
            this.setState({userType: userTypes.ADMIN});
        }else{
			this.setState({userType: userTypes.INVALID});
        }
    }
}