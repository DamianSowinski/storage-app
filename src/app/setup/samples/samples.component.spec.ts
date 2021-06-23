import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StorageService } from '../../storage.service';
import { SamplesComponent } from './samples.component';

describe('SamplesComponent', () => {
  let component: SamplesComponent;
  let fixture: ComponentFixture<SamplesComponent>;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SamplesComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [StorageService],
    }).compileComponents();

    storageService = TestBed.inject(StorageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have display section title', () => {
    component.title = 'Samples';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLHeadingElement;
    expect(title.innerText).toEqual('Samples');
  });

  it('should have display table', () => {
    const appTable = fixture.debugElement.query(By.css('app-table'));
    expect(appTable).toBeTruthy();
  });

  it('should generate form', () => {
    const form = fixture.debugElement.query(By.css('#sampleForm')).nativeElement as HTMLFormElement;
    const [number, type, volume] = Array.from(form.querySelectorAll('input'));

    expect(form).toBeTruthy();
    expect(number.id).toEqual('number');
    expect(type.id).toEqual('type');
    expect(volume.id).toEqual('volume');
  });

  it('should form be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validity valid', () => {
    const { number, type, volume } = component.form.controls;
    number.setValue('100');
    type.setValue('Blood');
    volume.setValue('10ml');

    expect(number.errors).toBeFalsy();
    expect(type.errors).toBeFalsy();
    expect(volume.errors).toBeFalsy();

    number.setValue('');
    type.setValue('');
    volume.setValue('1');

    expect(number.errors?.required).toBeTruthy();
    expect(type.errors?.required).toBeTruthy();
    expect(volume.errors?.pattern).toBeTruthy();

    // regex check
    volume.setValue('1l');
    expect(volume.errors?.pattern).toBeFalsy();
    volume.setValue('1ml');
    expect(volume.errors?.pattern).toBeFalsy();
    volume.setValue('1µl');
    expect(volume.errors?.pattern).toBeFalsy();
    volume.setValue('1nl');
    expect(volume.errors?.pattern).toBeFalsy();
    volume.setValue('1pl');
    expect(volume.errors?.pattern).toBeFalsy();
    volume.setValue('0.1ml');
    expect(volume.errors?.pattern).toBeFalsy();
    volume.setValue('0,1ml');
    expect(volume.errors?.pattern).toBeFalsy();

    volume.setValue('ml');
    expect(volume.errors?.pattern).toBeTruthy();
    volume.setValue(',ml');
    expect(volume.errors?.pattern).toBeTruthy();
    volume.setValue('1,ml');
    expect(volume.errors?.pattern).toBeTruthy();
    volume.setValue(',1ml');
    expect(volume.errors?.pattern).toBeTruthy();
  });

  it('should submitting a form emits a sample', () => {
    expect(component.form.valid).toBeFalsy();
    const { number, type, volume } = component.form.controls;
    number.setValue('100');
    type.setValue('Blood');
    volume.setValue('10ml');
    expect(component.form.valid).toBeTruthy();

    component.handleFormSubmit();

    const samples = storageService.getSamples().value;
    const sample = samples.get('100');

    expect(sample?.number).toEqual('100');
    expect(sample?.type).toEqual('Blood');
    expect(sample?.volume).toBe('10ml');
  });
});
