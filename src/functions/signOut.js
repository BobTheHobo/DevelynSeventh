import React, { Component } from 'react'

import { GoogleSignin } from 'react-native-google-signin';
import { firebase } from '@react-native-firebase/firestore';


const helpers = {
    signOut : async () => {
        try{
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
        }catch(error){
            //console.log(error);
        }
    }
}

export default helpers;