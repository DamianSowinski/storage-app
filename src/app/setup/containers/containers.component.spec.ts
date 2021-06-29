import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { APP_NAME } from '../../../environments/environment';
import { FabComponent } from '../../shared/components/fab/fab.component';
import { TableComponent } from '../../shared/components/table/table.component';
import Container from '../../shared/models/Container';
import { StorageService } from '../../storage.service';
import { ContainersComponent } from './containers.component';

describe('ContainersComponent', () => {
  let component: ContainersComponent;
  let fixture: ComponentFixture<ContainersComponent>;
  let titleService: Title;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainersComponent, TableComponent, FabComponent],
      imports: [RouterTestingModule],
      providers: [
        Title,
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getContainersStream']),
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

    fixture = TestBed.createComponent(ContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(component.tableColumns).toHaveSize(3);
    expect(component.tableData).toHaveSize(2);
  });

  it('should set page title', () => {
    expect(titleService.getTitle()).toEqual(`${component.title} | ${APP_NAME}`);
  });

  it('should render section title', () => {
    const titleHTML = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLHeadingElement;

    expect(titleHTML.innerText).toEqual(component.title);
  });

  it('should have display table', () => {
    const appTable = fixture.debugElement.query(By.css('app-table'));
    expect(appTable).toBeTruthy();
  });

  it('should have display fab add', () => {
    const appTable = fixture.debugElement.query(By.css('app-fab'));
    expect(appTable).toBeTruthy();
  });

  it('should emit click event when add button is clicked', () => {
    const btnCell = fixture.debugElement.queryAll(By.css('app-fab button'))[0];
    const spySelect = spyOn(component, 'addContainer').and.returnValue();
    btnCell.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
  });
});
