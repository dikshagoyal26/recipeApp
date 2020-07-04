import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthService{
    private token:string=null;
    public authStatus=new Subject<boolean>();
    private readonly notifier: NotifierService;

    constructor(private router:Router,notifierService: NotifierService){
        this.notifier = notifierService;
    }
    registerUser(user:any){
        console.log(user)
        const {email,password}=user;
        firebase.auth().createUserWithEmailAndPassword(email,password).then(response=>{
            this.router.navigate(['/'])
            firebase.auth().currentUser.getIdToken().then((token:string)=>{
                this.token=token;
            })
            this.notifier.notify("success", "SuccessFully Registered!!");
            this.setStatus(true)
        }).catch(err=>{
            console.log(err)
            this.notifier.notify("error", err);

        })
    }
    loginUser(user:any){
        console.log(user)
        const {email,password}=user;
        firebase.auth().signInWithEmailAndPassword(email,password).then(response=>{
            firebase.auth().currentUser.getIdToken().then((token:string)=>{
                this.token=token;
                this.notifier.notify("success", "SuccessFully Logged In!!");
            })
            this.setStatus(true)
            return true;
        }).catch(err=>{
            console.log(err)   
            this.notifier.notify("error", err);
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
        // return true
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