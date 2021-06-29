import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidatePattern(pattern: RegExp, errorMsg: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!pattern.test(value)) {
      return {
        pattern: {
          message: errorMsg,
        },
      };
    }

    return null;
  };
}
