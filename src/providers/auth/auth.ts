import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {User} from '@firebase/auth-types';

@Injectable()
export class AuthProvider {

  constructor() {

  }

  loginWithGithub(): Promise<any> {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(result => {
      console.log(result);
      return result.user
    }).catch(error => {
      console.log(error);
    })
  }

  async signUpUser(email: string, password: string, firstName: string, lastName: string):Promise<any> {
    try{
      const newUser:User = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}`)
        .set({email:email,firstName:firstName,lastName:lastName})
      return newUser
    } catch (error) {
      throw error;
    }

  }

  async loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
      .then(()=> {
        let loggedOut = true;
        resolve(loggedOut)
      })
      .catch((error:any) => {
        reject(error);
      })
    })
  }
}
