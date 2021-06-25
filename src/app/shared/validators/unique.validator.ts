import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as slug from 'slug';
import Container from '../models/Container';
import Sample from '../models/Sample';

export function ValidateUnique(collection: Map<string, Sample | Container>, slugify = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!collection.size) {
      return null;
    }

    if (control.valueChanges && control.dirty) {
      let { value } = control;

      if (typeof value === 'string') {
        value = value.toLowerCase();
      }

      if (slugify) {
        value = slug(value);
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
