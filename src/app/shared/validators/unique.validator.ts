import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import Container from '../models/Container';
import Sample from '../models/Sample';

export function ValidateUnique(collection: Map<string, Sample | Container>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!collection.size) {
      return null;
    }

    if (control.valueChanges && control.dirty) {
      let value = control.value;

      if (typeof value === 'string') {
        value = value.toLowerCase();
      }

      if (collection.has(value)) {
        return {
          unique: {
            message: 'This value already exist',
          },
        };
      }

      return null;
    }

    return null;
  };
}
