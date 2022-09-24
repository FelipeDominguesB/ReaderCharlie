import { JsonPipe } from '@angular/common';
import { jsDocComment, Token } from '@angular/compiler';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable, observable, from } from 'rxjs';
import { FirebaseToken } from 'src/app/@shared/models/FirebaseToken';
import { User } from 'src/app/@shared/models/User';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }


  login(email: string, password: string)
  {
    return new Promise((resolve, reject) =>{
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(()=> {
          this.saveInformationOnStorage();
      })
      .then(() =>{
          resolve(true);
      })
      .catch(err => reject(err));
    })
    


  }


  saveInformationOnStorage()
  {
    this.isAuthenticated();
      this.angularFireAuth.idTokenResult.subscribe(tokenInfo =>{
          let token: FirebaseToken = {
            accessToken: tokenInfo!.token,
            expiration: new Date(Date.parse(tokenInfo!.expirationTime))
          }
          
          localStorage.setItem('token', JSON.stringify(token));
      })
      
      this.angularFireAuth.user.subscribe(loginInfo =>{
          let user: User = {
            email: loginInfo!.email!,
            userName: loginInfo!.displayName!,
            uid: loginInfo!.uid,
          };

          localStorage.setItem('user', JSON.stringify(user));
      });
      
    
  }

  isAuthenticated() : boolean
  {
      let token = new FirebaseToken();
      token = JSON.parse(localStorage.getItem('token') || '{}');

      if(!token.accessToken || !token.expiration)
      {
        localStorage.clear();
        return false;
      }
      
      if(token.expiration < new Date(Date.now()))
      {
        localStorage.clear();
        return false;
      }

      return true;
  }

}
