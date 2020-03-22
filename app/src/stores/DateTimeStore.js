import { observable, computed, action, decorate } from 'mobx';

export class DateTimeStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    //login stuff
    loading = true;
    curTime = new Date().toLocaleTimeString();
    curDate = new Date().toLocaleDateString();

    clockTick(newTime = new Date().toLocaleTimeString(), newDate = new Date().toLocaleDateString()) {
        this.curTime = newTime;
        this.curDate = newDate;
    }
}

decorate(DateTimeStore, {
    curTime: observable,
    curDate: observable,
    clockTick: action,
})