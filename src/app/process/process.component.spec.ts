import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { APP_NAME } from '../../environments/environment';
import { CardComponent } from '../shared/components/card/card.component';
import Container from '../shared/models/Container';
import Sample from '../shared/models/Sample';
import SelectedCell from '../shared/types/SelectedCell';
import { StorageService } from '../storage.service';
import { BoardComponent } from './board/board.component';
import { BoardService } from './board/board.service';
import { ProcessComponent } from './process.component';

describe('ProcessComponent', () => {
  let component: ProcessComponent;
  let fixture: ComponentFixture<ProcessComponent>;
  let titleService: Title;
  let storageService: jasmine.SpyObj<StorageService>;
  let boardService: jasmine.SpyObj<BoardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessComponent, CardComponent, BoardComponent],
      imports: [RouterTestingModule],
      providers: [
        Title,
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('BoardService', ['getContainersStream', 'getSamplesStream', 'updateStream']),
        },
        {
          provide: BoardService,
          useValue: jasmine.createSpyObj('BoardService', [
            'getSelectedCellStream',
            'addSampleToSelectedCell',
            'removeSampleFromSelectedCell',
          ]),
        },
      ],
    }).compileComponents();

    titleService = TestBed.inject(Title);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    boardService = TestBed.inject(BoardService) as jasmine.SpyObj<BoardService>;
  });

  beforeEach(() => {
    const containers = new Map<string, Container>();
    containers.set('a', new Container('A', 1, 1));
    containers.set('b', new Container('B', 1, 1));
    containers.set('c', new Container('C', 1, 1));

    const samples = new Map<string, Sample>();
    samples.set('1', new Sample('1', 'a', 'aa'));
    samples.set('2', new Sample('2', 'b', 'bb'));
    samples.set('3', new Sample('3', 'c', 'cc'));

    storageService.getContainersStream.and.returnValue(
      new BehaviorSubject<Map<string, Container>>(new Map(containers))
    );
    storageService.getSamplesStream.and.returnValue(new BehaviorSubject<Map<string, Sample>>(new Map(samples)));
    boardService.getSelectedCellStream.and.returnValue(new BehaviorSubject<SelectedCell | undefined>(undefined));

    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values', () => {
    expect(component.containerPageList).toHaveSize(3);
    expect(component.freeSamples).toHaveSize(3);
    expect(component.selectedPendingSample).toBeUndefined();
    expect(component.selectedCell).toBeUndefined();
  });

  it('should set page title', () => {
    expect(titleService.getTitle()).toEqual(`Process | ${APP_NAME}`);
  });

  it('should render storage list', () => {
    const containerList = fixture.debugElement.queryAll(By.css('.btn-container-list'));

    expect(containerList).toHaveSize(3);
    expect(containerList[0].nativeElement.innerText).toEqual('A');
  });

  it('should render pending samples list', () => {
    const sampleList = fixture.debugElement.queryAll(By.css('.btn-sample'));

    expect(sampleList).toHaveSize(3);
    expect(sampleList[0].nativeElement.innerText).toEqual('Sample#: 1 a aa');
  });

  it('should hide information card when cell is not selected', () => {
    component.selectedCell = undefined;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.l-process__info'));

    expect(card).toBeNull();
  });

  it('should show information card when cell is selected', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.l-process__info'));

    expect(card).toBeTruthy();
  });

  it('should fill information card', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    let card = fixture.debugElement.query(By.css('.l-process__info'));
    let cardHTML = card.nativeElement as HTMLElement;

    expect(cardHTML.querySelector('.lead')?.innerHTML).toEqual('1 : 1');
    expect(cardHTML.querySelector('.col span')?.innerHTML).toEqual('Empty');
    expect(cardHTML.querySelector('.btn-check-out')).toBeFalsy();

    component.selectedCell = { row: 0, column: 0, sample: new Sample('1', 'a', 'aa') };
    fixture.detectChanges();
    card = fixture.debugElement.query(By.css('.l-process__info'));
    cardHTML = card.nativeElement as HTMLElement;

    expect(cardHTML.querySelector('.col-6 > div > span')?.innerHTML).toEqual('Checked in');
    expect(cardHTML.querySelector('.col span:nth-child(1)')?.innerHTML).toEqual('a, aa');
    expect(cardHTML.querySelector('.col span:nth-child(2)')?.innerHTML).toEqual('Sample#: 1');
    expect(cardHTML.querySelector('.btn-check-out')).toBeTruthy();
  });

  it('should disable check in button when both empty cell and sample is no selected', () => {
    const btnHTML = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeTrue();
  });

  it('should disable check in button when is only empty cell selected', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    const btnHTML = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeTrue();
  });

  it('should disable check in button when is only sample selected', () => {
    component.selectedPendingSample = new Sample('1', 'a', 'aa');
    fixture.detectChanges();
    const btnHTML = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeTrue();
  });

  it('should enable check in button when is selected empty cell and panding sample', () => {
    component.selectedCell = { row: 0, column: 0 };
    component.selectedPendingSample = new Sample('1', 'a', 'aa');
    fixture.detectChanges();
    const btnHTML = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(btnHTML.disabled).toBeFalse();
  });

  it('should emit click event when pending sample is clicked', () => {
    const btnCell = fixture.debugElement.queryAll(By.css('.btn-sample'))[0];
    const spySelect = spyOn(component, 'handleSelectSample').and.callThrough();
    btnCell.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
  });

  it('should emit click event when check out button is clicked', () => {
    component.selectedCell = { row: 0, column: 0, sample: new Sample('1', 'a', 'aa') };
    fixture.detectChanges();
    const btnCell = fixture.debugElement.query(By.css('.btn-check-out'));
    const spySelect = spyOn(component, 'handleCheckOut').and.callThrough();
    btnCell.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
  });

  it('should emit click event when check in button is clicked', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    const btnCheckIn = fixture.debugElement.query(By.css('.btn-check-in'));
    const spySelect = spyOn(component, 'handleCheckIn').and.callThrough();
    btnCheckIn.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
  });

  it('should handleSelectSample set sample as selected sample', () => {
    const sample = new Sample('1', 'a', 'aa');
    component.handleSelectSample(sample);
    expect(component.selectedPendingSample).toEqual(sample);
  });

  it('should handleCheckIn add sample to container', () => {
    const sample = new Sample('1', 'a', 'aa');
    const container = new Container('A', 1, 1);

    boardService.selectedContainer = container;
    component.selectedPendingSample = sample;
    component.selectedCell = { row: 0, column: 0 };
    component.handleCheckIn();

    expect(container.getMatrixCell(0, 0)).toEqual(sample);
  });

  it('should handleCheckOut remove sample from container', () => {
    const sample = new Sample('1', 'a', 'aa');
    const container = new Container('A', 1, 1);
    container.addSample(sample, 0, 0);
    boardService.selectedContainer = container;
    component.selectedCell = { row: 0, column: 0, sample };
    component.handleCheckOut();

    expect(container.getMatrixCell(0, 0)).toBeUndefined();
  });

  it('should isDisableCheckInBtn return valid state', () => {
    const sample = new Sample('1', 'a', 'aa');

    expect(component.isDisableCheckInBtn()).toBeTrue();

    component.selectedPendingSample = sample;
    component.selectedCell = undefined;
    fixture.detectChanges();

    expect(component.isDisableCheckInBtn()).toBeTrue();

    component.selectedPendingSample = undefined;
    component.selectedCell = { row: 0, column: 0, sample };
    fixture.detectChanges();

    expect(component.isDisableCheckInBtn()).toBeTrue();

    component.selectedPendingSample = sample;
    component.selectedCell = { row: 0, column: 0, sample };
    fixture.detectChanges();

    expect(component.isDisableCheckInBtn()).toBeTrue();

    component.selectedPendingSample = sample;
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();

    expect(component.isDisableCheckInBtn()).toBeFalse();
  });
});
