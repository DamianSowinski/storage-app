import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import Container from '../../shared/models/Container';
import { StorageService } from '../../storage.service';
import { ContainersComponent } from './containers.component';

describe('ContainersComponent', () => {
  let component: ContainersComponent;
  let fixture: ComponentFixture<ContainersComponent>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainersComponent],
      providers: [
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getContainers']) as StorageService,
        },
      ],
    }).compileComponents();

    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    storageService.getContainers.and.returnValue(new Map<string, Container>());

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
});
