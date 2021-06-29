import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ValidatePattern } from '../../validators/pattern.validator';
import { ValidateUnique } from '../../validators/unique.validator';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form control', () => {
    const { required, min, minLength } = Validators;

    component.form = new FormControl('', { validators: [required] });
    fixture.detectChanges();

    component.form.setValue('');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeTrue();
    expect(component.errorMessage).toEqual('This field is required');

    component.form.setValue('a');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeFalse();

    component.form = new FormControl('', { validators: [min(1)] });
    fixture.detectChanges();

    component.form.setValue(0);
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeTrue();
    expect(component.errorMessage).toEqual('This value is too small');

    component.form.setValue(1);
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeFalse();

    component.form = new FormControl('', { validators: [minLength(2)] });
    fixture.detectChanges();

    component.form.setValue('a');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeTrue();
    expect(component.errorMessage).toEqual('Please use at least 2 characters');

    component.form.setValue('ab');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeFalse();

    const collection = new Map([
      ['a', {}],
      ['b', {}],
    ]);

    component.form = new FormControl('', { validators: [ValidateUnique(collection)] });
    fixture.detectChanges();

    component.form.setValue('a');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeTrue();
    expect(component.errorMessage).toEqual('This value already exist');

    component.form.setValue('c');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeFalse();

    component.form = new FormControl('', { validators: [ValidatePattern(/^[0-9a-zA-z]+$/, 'invalid format')] });
    fixture.detectChanges();

    component.form.setValue('#');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeTrue();
    expect(component.errorMessage).toEqual('invalid format');

    component.form.setValue('a0');
    component.form.markAsTouched();
    expect(component.isInvalid()).toBeFalse();
  });

  it('should display error message', () => {
    component.form = new FormControl('', { validators: [Validators.required] });
    component.form.setValue('');
    component.form.markAsTouched();
    fixture.detectChanges();

    const formGroupHTML = fixture.debugElement.query(By.css('.form-group')).nativeElement as HTMLDivElement;

    expect(formGroupHTML.querySelector('.invalid-feedback')).toBeTruthy();
    expect(formGroupHTML.querySelector('.invalid-feedback span')?.innerHTML).toEqual(component.errorMessage);
  });
});
