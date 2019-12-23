import { AbstractControl, ValidatorFn } from '@angular/forms';

/*
    forbiddenNameValidator accepts a regular expression and returns ValidatorFn which is built-in to forms

    the ValidatorFn accepts only one AbstractControl parameter. No second args are supported.

    Hence we are wrapping it around another function and exporting it back!
    This is called factory function!
*/
export function forbiddenNameValidator(nameToValidate: RegExp): ValidatorFn {
 return   (control: AbstractControl): { [key: string]: any } | null => {

        const forbidden = nameToValidate.test(control.value);
        return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    }

}