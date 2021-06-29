import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as slug from 'slug';

export function ValidateUnique(collection: Map<string, unknown>, slugify = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!collection.size) {
      return null;
    }

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
  };
}
