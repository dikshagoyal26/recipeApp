import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    private token:string=null;
    constructor(private router:Router){}
    registerUser(user:any){
        console.log(user)
        const {email,password}=user;
        firebase.auth().createUserWithEmailAndPassword(email,password).then(response=>{
            this.router.navigate(['/'])
            firebase.auth().currentUser.getIdToken().then((token:string)=>{
                this.token=token;
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    loginUser(user:any){
        console.log(user)
        const {email,password}=user;
        firebase.auth().signInWithEmailAndPassword(email,password).then(response=>{
            firebase.auth().currentUser.getIdToken().then((token:string)=>{
                this.token=token;
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    getToken(){
        firebase.auth().currentUser.getIdToken().then((token:string)=>{
            this.token=token;
        })
        return this.token
    }
    isAuthenticated(){
        return this.token!==null
    }
    logOut(){
        this.token=null;
        firebase.auth().signOut();
    }
}