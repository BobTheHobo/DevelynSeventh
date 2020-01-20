import { UserInfoStore } from './UserInfoStore';
import { createContext } from 'react';

export class RootStore {
    userInfoStore = new UserInfoStore(this);
}

export const RootStoreContext = createContext(new RootStore());