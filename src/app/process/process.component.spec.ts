import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import Container from '../shared/models/Container';
import Sample from '../shared/models/Sample';
import { StorageService } from '../storage.service';
import { ProcessComponent } from './process.component';

describe('ProcessComponent', () => {
  let component: ProcessComponent;
  let fixture: ComponentFixture<ProcessComponent>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessComponent],
      providers: [
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getContainers', 'getSamples']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ slug: 'box' }),
          },
        },
      ],
    }).compileComponents();

    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    const containers = new Map<string, Container>();
    containers.set('box', new Container('Box', 10, 12));
    containers.set('shelve', new Container('Shelve', 8, 8));
    containers.set('tray', new Container('Tray', 6, 10));

    const samples = new Map<string, Sample>();
    samples.set('1', new Sample('1', 'Blood', '10ml'));
    samples.set('2', new Sample('2', 'Serum', '3ml'));
    samples.set('3', new Sample('3', 'DNA', '2ql'));

    storageService.getContainers.and.returnValue(new BehaviorSubject<Map<string, Container>>(new Map(containers)));
    storageService.getSamples.and.returnValue(new BehaviorSubject<Map<string, Sample>>(new Map(samples)));

    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.containerPageList.length).toEqual(3);
    expect(component.freeSamples.length).toEqual(3);
  });

  it('should render container list', () => {
    const containerList = fixture.debugElement.queryAll(By.css('.l-container-list .btn'));
    expect(containerList.length).toEqual(3);
  });

  it('should render free samples list', () => {
    const containerList = fixture.debugElement.queryAll(By.css('.l-sample-list .btn'));
    expect(containerList.length).toEqual(3);
  });
});
