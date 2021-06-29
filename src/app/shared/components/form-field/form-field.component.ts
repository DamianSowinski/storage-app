import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() form: AbstractControl | null = null;
  @Input() feedbackId?: string;

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
          const requiredLength = form.getError('minlength').requiredLength as number;
          this.errorMessage = `Please use at least ${requiredLength} characters`;
          break;
        }

        case form.hasError('unique'): {
          this.errorMessage = form.getError('unique').message;
          break;
        }
        case form.hasError('pattern'): {
          this.errorMessage = form.getError('pattern').message;
          break;
        }
      }
    }
    return invalid;
  }
}
