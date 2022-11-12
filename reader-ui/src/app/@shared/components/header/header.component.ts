import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: FirebaseAuthenticationService) { }

  ngOnInit(): void {
    
  }

  getUsername()
  {
    try{
      return (this.authService.userName) ? this.authService.userName : 'User'

    }
    catch{
      return 'User';
    }
  }

}
