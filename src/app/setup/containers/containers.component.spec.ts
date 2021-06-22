import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StorageService } from '../../storage.service';
import { ContainersComponent } from './containers.component';

describe('ContainersComponent', () => {
  let component: ContainersComponent;
  let fixture: ComponentFixture<ContainersComponent>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainersComponent],
      imports: [ReactiveFormsModule],
      providers: [StorageService],
    }).compileComponents();

    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have display section title', () => {
    component.title = 'Containers';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLHeadingElement;
    expect(title.innerText).toEqual('Containers');
  });

  it('should have display table', () => {
    const appTable = fixture.debugElement.query(By.css('app-table'));
    expect(appTable).toBeTruthy();
  });

  it('should generate form', () => {
    const form = fixture.debugElement.query(By.css('#containerForm')).nativeElement as HTMLFormElement;
    const [name, rows, columns] = Array.from(form.querySelectorAll('input'));

    expect(form).toBeTruthy();
    expect(name.id).toEqual('name');
    expect(rows.id).toEqual('rows');
    expect(columns.id).toEqual('columns');
  });

  it('should form be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validity valid', () => {
    const { name, rows, columns } = component.form.controls;
    name.setValue('Box');
    rows.setValue(12);
    columns.setValue(12);

    expect(name.errors).toBeFalsy();
    expect(rows.errors).toBeFalsy();
    expect(columns.errors).toBeFalsy();

    name.setValue('');
    rows.setValue(0);
    columns.setValue(0);

    expect(name.errors?.required).toBeTruthy();
    expect(rows.errors?.min).toBeTruthy();
    expect(columns.errors?.min).toBeTruthy();
  });

  it('should submitting a form emits a sample', () => {
    expect(component.form.valid).toBeFalsy();
    const { name, rows, columns } = component.form.controls;
    name.setValue('Tray');
    rows.setValue(12);
    columns.setValue(12);
    expect(component.form.valid).toBeTruthy();

    component.handleFormSubmit();

    const containers = storageService.getContainers().value;
    const container = containers.get('tray');

    expect(container?.name).toEqual('Tray');
    expect(container?.rows).toEqual(12);
    expect(container?.columns).toBe(12);
  });
});
