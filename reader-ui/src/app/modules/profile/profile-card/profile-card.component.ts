import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { User } from 'src/app/@shared/models/User';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  constructor(private authService: FirebaseAuthenticationService) {  }

  user: User;
  ngOnInit(): void {
    this.authService.userInfo.subscribe(res =>{
        this.user = res;
        console.log(this.user);
    })
  }

}
