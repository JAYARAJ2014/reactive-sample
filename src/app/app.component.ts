import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { ForbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';

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
  constructor(private fb: FormBuilder) {

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
      })
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

}
