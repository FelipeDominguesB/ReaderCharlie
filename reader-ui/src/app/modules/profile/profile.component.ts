import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { User } from 'src/app/@shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: FirebaseAuthenticationService) { }
  

  ngOnInit(): void {

  }

}
