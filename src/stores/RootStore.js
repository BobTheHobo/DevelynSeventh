import { UserInfoStore } from './UserInfoStore';
import { createContext } from 'react';
import { DateTimeStore } from './DateTimeStore';

export class RootStore {
    userInfoStore = new UserInfoStore(this);
    dateTimeStore = new DateTimeStore(this);
}

export const RootStoreContext = createContext(new RootStore());