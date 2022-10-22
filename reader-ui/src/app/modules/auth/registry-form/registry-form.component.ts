import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegistryFormComponent implements OnInit {

  
  registryForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public firebaseAuthentication: FirebaseAuthenticationService) {

    this.registryForm = this.formBuilder.group({
        userName: ['', [Validators.required] ],
        email: ['', [Validators.required, Validators.email] ],
        password: ['', [Validators.required]]
    });
   }
  ngOnInit(): void {
  }

}
