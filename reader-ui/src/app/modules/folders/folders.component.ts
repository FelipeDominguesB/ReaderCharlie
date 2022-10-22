import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthenticationService) { }

  ngOnInit(): void {
    
  }

}
