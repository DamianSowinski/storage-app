import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_NAME, COMPANY_NAME } from '../../../environments/environment';
import { CardComponent } from '../../shared/components/card/card.component';
import { IcoListComponent } from '../../shared/components/ico/ico-list.component';
import { IcoComponent } from '../../shared/components/ico/ico.component';
import Container from '../../shared/models/Container';
import Sample from '../../shared/models/Sample';
import { StorageService } from '../../storage.service';
import { BoardComponent } from './board.component';
import { BoardService } from './board.service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let titleService: Title;
  let storageService: jasmine.SpyObj<StorageService>;
  let boardService: BoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, CardComponent, IcoComponent, IcoListComponent],
      imports: [RouterTestingModule],
      providers: [
        Title,
        BoardService,
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getContainer']),
        },
      ],
    }).compileComponents();

    titleService = TestBed.inject(Title);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    boardService = TestBed.inject(BoardService);
  });

  beforeEach(() => {
    storageService.getContainer.and.returnValue(new Container('A', 10, 10));

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(component.container).toBeTruthy();
    expect(component.selectedCell).toBeUndefined();
  });

  it('should set page title', () => {
    expect(titleService.getTitle()).toEqual(`A - ${COMPANY_NAME} | ${APP_NAME}`);
  });

  it('should render card title', () => {
    expect(component.title).toEqual('SoftSystem / A');
  });

  it('should render board information', () => {
    const containerInfoHTML = fixture.debugElement.query(By.css('.card-body .d-flex.justify-content-end'))
      .nativeElement as HTMLDivElement;

    expect(containerInfoHTML.innerText).toEqual('0 Samples / 100 slots / 100 empty');
  });

  it('should render board', () => {
    const boardHTML = fixture.debugElement.query(By.css('.table')).nativeElement as HTMLDivElement;
    expect(boardHTML).toBeTruthy();
    expect(boardHTML.querySelectorAll('.table__header')).toHaveSize(10);
    expect(boardHTML.querySelectorAll('.table__row')).toHaveSize(10);
    expect(boardHTML.querySelectorAll('.item')).toHaveSize(10 * 10);
  });

  it('should mark selected cell', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    const itemHTML = fixture.debugElement.queryAll(By.css('.item'))[0].nativeElement as HTMLButtonElement;

    expect(itemHTML.classList.contains('is-active')).toBeTrue();
  });

  it('should mark stored sample', () => {
    component.container?.addSample(new Sample('1', 'a', 'aa'), 0, 0);
    fixture.detectChanges();
    const itemHTML = fixture.debugElement.queryAll(By.css('.item'))[0].nativeElement as HTMLButtonElement;

    expect(itemHTML.classList.contains('is-filled')).toBeTrue();
    expect(itemHTML.querySelector('svg')).toBeTruthy();
  });

  it('should emit click event when pending sample is clicked', () => {
    const btnCell = fixture.debugElement.queryAll(By.css('.item'))[0];
    const spySelect = spyOn(component, 'handleSelectCell').and.callThrough();
    btnCell.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
  });

  it('should handleSelectCell set selectedCell in board service', () => {
    component.handleSelectCell(0, 1);

    expect(boardService.getSelectedCellStream().value?.row).toEqual(0);
    expect(boardService.getSelectedCellStream().value?.column).toEqual(1);
  });

  it('should handleSelectCell return valid info', () => {
    component.container = new Container('A', 1, 1);
    expect(component.createSampleInfo()).toEqual('0 Samples / 1 slots / 1 empty');

    component.container = new Container('A', 3, 1);
    expect(component.createSampleInfo()).toEqual('0 Samples / 3 slots / 3 empty');

    component.container = new Container('A', 2, 4);
    expect(component.createSampleInfo()).toEqual('0 Samples / 8 slots / 8 empty');

    const container = new Container('A', 4, 4);
    container.addSample(new Sample('1', 'a', 'aa'), 0, 0);
    component.container = container;
    expect(component.createSampleInfo()).toEqual('1 Sample / 16 slots / 15 empty');

    container.addSample(new Sample('2', 'b', 'bb'), 1, 1);
    component.container = container;
    expect(component.createSampleInfo()).toEqual('2 Samples / 16 slots / 14 empty');
  });
});
