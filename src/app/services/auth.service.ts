import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService{
    private token:string=null;
    public authStatus=new Subject<boolean>();

    constructor(private router:Router){}
    registerUser(user:any){
        console.log(user)
        const {email,password}=user;
        firebase.auth().createUserWithEmailAndPassword(email,password).then(response=>{
            this.router.navigate(['/'])
            firebase.auth().currentUser.getIdToken().then((token:string)=>{
                this.token=token;
            })
            this.setStatus(true)
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
            this.setStatus(true)
            return true;
        }).catch(err=>{
            console.log(err)   
            return err;   
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
        this.setStatus(false)
    }
    setStatus(value:boolean){
        this.authStatus.next(value)
    }
}