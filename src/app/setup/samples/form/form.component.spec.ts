import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { APP_NAME } from '../../../../environments/environment';
import { CardComponent } from '../../../shared/components/card/card.component';
import Sample from '../../../shared/models/Sample';
import { StorageService } from '../../../storage.service';
import { FormComponent } from './form.component';

describe('Sample FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let titleService: Title;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, CardComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        Title,
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getSamplesStream', 'addSample']),
        },
      ],
    }).compileComponents();

    titleService = TestBed.inject(Title);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    const samples = new Map<string, Sample>();
    samples.set('1', new Sample('1', 'a', '10ml'));
    samples.set('2', new Sample('2', 'b', '10l'));

    storageService.getSamplesStream.and.returnValue(new BehaviorSubject<Map<string, Sample>>(new Map(samples)));

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(Array.from(component.typesHelper).join()).toEqual('a,b');
  });

  it('should set page title', () => {
    expect(titleService.getTitle()).toEqual(`${component.title} | ${APP_NAME}`);
  });

  it('should render form', () => {
    const formHTML = fixture.debugElement.query(By.css('#sampleForm')).nativeElement as HTMLFormElement;
    const [number, type, volume] = Array.from(formHTML.querySelectorAll('input'));

    expect(formHTML).toBeTruthy();
    expect(number.id).toEqual('number');
    expect(type.id).toEqual('type');
    expect(volume.id).toEqual('volume');
  });

  it('should disable submit button when form is invalid', () => {
    const btnHTML = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    const { number, type, volume } = component.form.controls;
    number.setValue('3');
    type.setValue('c');
    volume.setValue('10ml');
    fixture.detectChanges();
    const btnHTML = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeFalse();
  });

  it('should form be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validity form', () => {
    const { number, type, volume } = component.form.controls;
    number.setValue('3');
    type.setValue('c');
    volume.setValue('10ml');

    expect(number.errors).toBeFalsy();
    expect(type.errors).toBeFalsy();
    expect(volume.errors).toBeFalsy();

    // empty check
    number.setValue('');
    type.setValue('');
    volume.setValue('');

    expect(number.errors?.required).toBeTruthy();
    expect(type.errors?.required).toBeTruthy();
    expect(volume.errors?.required).toBeTruthy();

    // unique check
    number.setValue('2');
    expect(number.errors?.unique).toBeTruthy();

    // regex check number
    number.setValue('1');
    expect(number.errors?.pattern).toBeFalsy();
    number.setValue('100');
    expect(number.errors?.pattern).toBeFalsy();
    number.setValue('1-1');
    expect(number.errors?.pattern).toBeFalsy();
    number.setValue('-');
    expect(number.errors?.pattern).toBeTruthy();
    number.setValue('-l');
    expect(number.errors?.pattern).toBeTruthy();
    number.setValue('1-');
    expect(number.errors?.pattern).toBeTruthy();
    number.setValue('1.1');
    expect(number.errors?.pattern).toBeTruthy();

    // regex check volume
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

  it('should emit submit ewen when form is submit', () => {
    const form = fixture.debugElement.query(By.css('#sampleForm'));
    const spySelect = spyOn(component, 'handleFormSubmit').and.callThrough();
    form.triggerEventHandler('submit', {});

    expect(spySelect).toHaveBeenCalled();
  });
});
