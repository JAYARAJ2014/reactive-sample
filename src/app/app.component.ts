import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'reactive';

  /*Create the form Model
  To associate this model with the HTML , we have bound [fromGroup] in the form 
  and formControlName in the individual controls. 
  */
  regForm = new FormGroup({
    userName: new FormControl('test'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });

  loadData() {
    this.regForm.patchValue({
      userName: 'Jayaraj',
      password: 'test123$',
      confirmPassword: 'test123$',
      address: {
        city: 'Ekm',
        state: 'Kerala',
        zip:'682315'
      }
    });
  }

}
