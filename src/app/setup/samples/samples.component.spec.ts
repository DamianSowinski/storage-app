import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import Sample from '../../shared/models/Sample';
import { StorageService } from '../../storage.service';
import { SamplesComponent } from './samples.component';

describe('SamplesComponent', () => {
  let component: SamplesComponent;
  let fixture: ComponentFixture<SamplesComponent>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SamplesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getSamples']) as StorageService,
        },
      ],
    }).compileComponents();

    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    storageService.getSamples.and.returnValue(new BehaviorSubject(new Map<string, Sample>()));

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
    const inputs = form.querySelectorAll('input');

    expect(form).toBeTruthy();
    expect(inputs[0].id).toEqual('number');
    expect(inputs[1].id).toEqual('type');
    expect(inputs[2].id).toEqual('volume');
  });
});
