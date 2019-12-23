import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormArray } from '@angular/forms';
import { ForbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  
  title = 'reactive';
  regForm : FormGroup; 
  get userName() {
    return this.regForm.get('userName');
  }
  get email () {
    return this.regForm.get('email');
  }
  get altEmails () {
    return this.regForm.get('altEmails') as FormArray;
  }
  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {

  }
  ngOnInit(): void {
    
    this.regForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), ForbiddenNameValidator(/admin/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''], state: [''], zip: ['']
      }),
      altEmails: this.fb.array([])
    }, {validator: PasswordValidator});

    this.regForm.get('subscribe').valueChanges
    .subscribe(checkedValue=> {
      const email = this.regForm.get('email');
      if(checkedValue ) {
        email.setValidators(Validators.required);
      }else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
  }
  /*Create the form Model
  To associate this model with the HTML , we have bound [fromGroup] in the form 
  and formControlName in the individual controls. 
  */
  // regForm = new FormGroup({
  //   userName: new FormControl('test'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl('')
  //   })
  // });
  

 
  loadData() {
    this.regForm.patchValue({
      userName: 'Jayaraj',
      password: 'test123$',
      confirmPassword: 'test123$',
      address: {
        city: 'Ekm',
        state: 'Kerala',
        zip: '682315'
      }
    });
  }

  addAltEmail() {
    this.altEmails.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.regForm.value );
    this.registrationService.register(this.regForm.value)
    .subscribe( 
      response => console.log('success', response), 
      error => console.log('error',error)
    );
  }

}
