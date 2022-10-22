import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebaseAuthenticationService: FirebaseAuthenticationService, private router: Router) { }

  canActivate() : boolean
  {
      console.log("Guard");
      let canActivate = this.firebaseAuthenticationService.isAuthenticated();

      if(!canActivate)
      {
        this.router.navigate(['login'])
        console.log("Não pode ativar")
      }

      return canActivate;
  }
  
}
