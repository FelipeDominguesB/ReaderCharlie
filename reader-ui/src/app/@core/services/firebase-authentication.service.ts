import { JsonPipe } from '@angular/common';
import { jsDocComment, Token } from '@angular/compiler';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { sign } from 'crypto';

import { Observable, observable, from } from 'rxjs';
import { FirebaseToken } from 'src/app/@shared/models/FirebaseToken';
import { User } from 'src/app/@shared/models/User';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { }


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
      this.angularFireAuth.idTokenResult.subscribe(tokenInfo =>{
          let token: FirebaseToken = {
            accessToken: tokenInfo!.token,
            expiration: new Date(Date.parse(tokenInfo!.expirationTime))
          }
          
          localStorage.setItem('token', JSON.stringify(token));
      }, err =>{
          console.log("Erro ao salvar informação")
      });
      
      this.angularFireAuth.user.subscribe(loginInfo =>{
          let user: User = {
            email: loginInfo!.email!,
            userName: loginInfo!.displayName!,
            uid: loginInfo!.uid,
          };

          localStorage.setItem('user', JSON.stringify(user));
      }, err =>{
        console.log("Erro ao salvar informação")
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

  
  get userId() { 
    let user = JSON.parse(localStorage.getItem('user') || '{}');

    if(!user.uid){
      this.signOut();
    }

    return user.uid;
  }

  signOut()
  {
      this.angularFireAuth.signOut().then(() =>{
          localStorage.clear();
          this.router.navigate(['login']);
      });
  }
}
