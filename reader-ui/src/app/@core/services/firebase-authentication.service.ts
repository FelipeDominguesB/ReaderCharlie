import { JsonPipe } from '@angular/common';
import { jsDocComment, Token } from '@angular/compiler';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


import { Observable, observable, from, of } from 'rxjs';
import { FirebaseToken } from 'src/app/@shared/models/FirebaseToken';
import { User, UserProperties, UserRegistryObject } from 'src/app/@shared/models/User';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {


  userData: any;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { }


  login(email: string, password: string) {
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          
          return this.saveInformationOnStorage();
        })
        .then(() => {

          setTimeout(() =>{

            this.router.navigate(['/folders']);
          }, 100);

          

        })
        .catch(err => { console.log(err)});
  }

  signUp(user: UserRegistryObject)
  {
    return new Promise((resolve, reject) =>{
      this.angularFireAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
  
        return res.user?.updateProfile({
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      })
      .then((res) =>{
          resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
    

  }


  saveInformationOnStorage() {
    return new Promise((resolve, reject) => {
      try{
        this.angularFireAuth.idTokenResult.subscribe(tokenInfo => {
          let token: FirebaseToken = {
            accessToken: tokenInfo!.token,
            expiration: new Date(Date.parse(tokenInfo!.expirationTime))
          }
  
          localStorage.setItem('token', JSON.stringify(token));
        }, err => {
          reject("Erro ao salvar informação")
        });
  
        this.angularFireAuth.user.subscribe(loginInfo => {
          this.userData = loginInfo;
          localStorage.setItem('user', JSON.stringify(this.userData));
        }, err => {
          reject("Erro ao salvar informação")
        });
  
        console.log("finalizei o save: " + Date.now())
        
        setTimeout(() =>{
          resolve(true);
        }, 100)
        
  
      }catch{
        reject(false);
      }
    })
  }
      



  

  isAuthenticated(): boolean {

    let token = new FirebaseToken();
    token = JSON.parse(localStorage.getItem('token') || '{}');

    if (!token.accessToken || !token.expiration) {
      localStorage.clear();
      return false;
    }

    if (token.expiration < new Date(Date.now())) {
      localStorage.clear();
      return false;
    }

    return true;
  }


  getUserProperty(propName: UserProperties) {
    let userProperty: any;

    this.angularFireAuth.user.subscribe(userData =>{
        userProperty = userData?.[propName];
    });

    return userProperty;
    
  }

  get userInfo() : Observable<User>
  {
    let user: User = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user) {
      this.signOut();
    }

    return of(user);
  }

  get userName() {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.displayName;
  }

  get userId() {
    let user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.uid) {
      this.signOut();
    }

    return user.uid;
  }
  signOut() {
    this.angularFireAuth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['login']);
    });
  }
}
