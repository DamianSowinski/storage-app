import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() form: AbstractControl | null = null;
  @Input() feedbackId: string | null = null;

  errorMessage = '';

  isInvalid(): boolean {
    let invalid = false;
    const form = this.form;

    if (form && form.touched && form.errors) {
      invalid = true;

      switch (true) {
        case form.hasError('required'):
          this.errorMessage = 'This field is required';
          break;

        case form.hasError('min'):
          this.errorMessage = 'This value is too small';
          break;

        case form.hasError('minlength'): {
          const { minLength } = form.errors;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
          this.errorMessage = `Please use at least ${minLength.requiredLength} characters`;
          break;
        }

        case form.hasError('pattern'): {
          const { pattern } = form.errors;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
          this.errorMessage = pattern.message;
          break;
        }

        case form.hasError('unique'): {
          const { unique } = form.errors;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
          this.errorMessage = unique.message;
          break;
        }
      }
    }
    return invalid;
  }
}
