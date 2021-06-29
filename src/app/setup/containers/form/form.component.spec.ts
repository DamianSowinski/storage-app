import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { APP_NAME } from '../../../../environments/environment';
import { CardComponent } from '../../../shared/components/card/card.component';
import Container from '../../../shared/models/Container';
import { StorageService } from '../../../storage.service';
import { FormComponent } from './form.component';

describe('Container FormComponent', () => {
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
          useValue: jasmine.createSpyObj('StorageService', ['getContainersStream', 'addContainer']),
        },
      ],
    }).compileComponents();

    titleService = TestBed.inject(Title);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    const containers = new Map<string, Container>();
    containers.set('a', new Container('A', 1, 1));
    containers.set('b', new Container('B', 1, 1));

    storageService.getContainersStream.and.returnValue(
      new BehaviorSubject<Map<string, Container>>(new Map(containers))
    );

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page title', () => {
    expect(titleService.getTitle()).toEqual(`${component.title} | ${APP_NAME}`);
  });

  it('should render form', () => {
    const formHTML = fixture.debugElement.query(By.css('#containerForm')).nativeElement as HTMLFormElement;
    const [name, rows, columns] = Array.from(formHTML.querySelectorAll('input'));

    expect(formHTML).toBeTruthy();
    expect(name.id).toEqual('name');
    expect(rows.id).toEqual('rows');
    expect(columns.id).toEqual('columns');
  });

  it('should disable submit button when form is invalid', () => {
    const btnHTML = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    const { name, rows, columns } = component.form.controls;
    name.setValue('C');
    rows.setValue(1);
    columns.setValue(1);
    fixture.detectChanges();
    const btnHTML = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeFalse();
  });

  it('should form be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validity form', () => {
    const { name, rows, columns } = component.form.controls;
    name.setValue('C');
    rows.setValue(1);
    columns.setValue(1);

    expect(name.errors).toBeFalsy();
    expect(rows.errors).toBeFalsy();
    expect(columns.errors).toBeFalsy();

    // empty check
    name.setValue('');
    rows.setValue('');
    columns.setValue('');

    expect(name.errors?.required).toBeTruthy();
    expect(rows.errors?.required).toBeTruthy();
    expect(columns.errors?.required).toBeTruthy();

    // min check
    rows.setValue(0);
    columns.setValue(0);

    expect(rows.errors?.min).toBeTruthy();
    expect(columns.errors?.min).toBeTruthy();

    // unique check
    name.setValue('A');
    expect(name.errors?.unique).toBeTruthy();
  });

  it('should emit submit ewen when form is submit', () => {
    const form = fixture.debugElement.query(By.css('#containerForm'));
    const spySelect = spyOn(component, 'handleFormSubmit').and.callThrough();
    form.triggerEventHandler('submit', {});

    expect(spySelect).toHaveBeenCalled();
  });
});
