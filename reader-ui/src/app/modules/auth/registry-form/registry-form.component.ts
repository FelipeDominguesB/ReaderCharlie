import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from 'src/app/@core/services/firebase-authentication.service';
import { UserRegistryObject } from 'src/app/@shared/models/User';

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
  get f() { return this.registryForm.controls; }
  ngOnInit(): void {
  }

  createUser()
  {
    let user: UserRegistryObject = {email: this.f.email.value, displayName: this.f.userName.value, password: this.f.password.value };

    this.firebaseAuthentication.signUp(user).then(res =>{
      console.log(res);
    }).catch(err =>{
      console.log(err);
    });
 
  }

}
