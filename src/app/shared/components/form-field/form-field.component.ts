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

    if (this.form) {
      if (this.form.hasError('required') && this.form?.touched) {
        invalid = true;
        this.errorMessage = 'This field is required';
      }

      if (this.form.hasError('min') && this.form?.touched) {
        invalid = true;
        this.errorMessage = 'This value is too small';
      }

      if (this.form.hasError('minlength') && this.form?.touched) {
        invalid = true;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const minLength = this.form.errors?.minlength?.requiredLength as number;

        this.errorMessage = `Please use at least ${minLength} characters`;
      }
    }
    return invalid;
  }
}
