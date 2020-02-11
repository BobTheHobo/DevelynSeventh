import { UserInfoStore } from './UserInfoStore';
import { createContext } from 'react';
import { DateTimeStore } from './DateTimeStore';
import { PlanStore } from './PlanStore';

export class RootStore {
    userInfoStore = new UserInfoStore(this);
    dateTimeStore = new DateTimeStore(this);
    planStore = new PlanStore(this);
}

export const RootStoreContext = createContext(new RootStore());