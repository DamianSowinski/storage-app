import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
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
  let storageService: jasmine.SpyObj<StorageService>;
  let boardService: jasmine.SpyObj<BoardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessComponent, CardComponent, BoardComponent],
      providers: [
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getContainers', 'getSamples']),
        },
        {
          provide: BoardService,
          useValue: jasmine.createSpyObj('BoardService', ['getSelectedCell']),
        },
      ],
    }).compileComponents();

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

    storageService.getContainers.and.returnValue(new BehaviorSubject<Map<string, Container>>(new Map(containers)));
    storageService.getSamples.and.returnValue(new BehaviorSubject<Map<string, Sample>>(new Map(samples)));
    boardService.getSelectedCell.and.returnValue(new BehaviorSubject<SelectedCell | undefined>(undefined));

    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.containerPageList).toHaveSize(3);
    expect(component.freeSamples).toHaveSize(3);
    expect(component.selectedSample).toBeUndefined();
    expect(component.selectedCell).toBeUndefined();
  });

  it('should render container list', () => {
    const containerList = fixture.debugElement.queryAll(By.css('.btn-container-list'));

    expect(containerList).toHaveSize(3);
  });

  it('should render free samples list', () => {
    const sampleList = fixture.debugElement.queryAll(By.css('.btn-sample'));

    expect(sampleList).toHaveSize(3);
  });

  it('should hidden a sample information card', () => {
    const card = fixture.debugElement.query(By.css('.l-process__info'));

    expect(card).toBeNull();
  });

  it('should show a sample information card when empty cell is selected', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.l-process__info'));
    const htmlElement = card.nativeElement as HTMLElement;

    expect(card).toBeTruthy();
    expect(htmlElement.querySelector('.lead')?.innerHTML).toEqual('1 : 1');
    expect(htmlElement.querySelector('.col span')?.innerHTML).toEqual('Empty');
  });

  it('should show a sample information card when filled cell is selected', () => {
    component.selectedCell = { row: 0, column: 0, sample: new Sample('1', 'a', 'b') };
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.l-process__info'));
    const htmlElement = card.nativeElement as HTMLElement;

    expect(htmlElement.querySelector('.col-6 > div > span')?.innerHTML).toEqual('Checked in');
    expect(htmlElement.querySelector('.col span:nth-child(1)')?.innerHTML).toEqual('a, b');
    expect(htmlElement.querySelector('.col span:nth-child(2)')?.innerHTML).toEqual('Sample#: 1');
  });

  it('should show check out button only when select filled cell', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    let btn = fixture.debugElement.query(By.css('.btn-check-out'));

    expect(btn).toBeFalsy();

    component.selectedCell = { row: 0, column: 0, sample: new Sample('1', 'a', 'b') };
    fixture.detectChanges();
    btn = fixture.debugElement.query(By.css('.btn-check-out'));

    expect(btn).toBeTruthy();
  });

  it('should default disable check in button', () => {
    const containerList = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(containerList.disabled).toBeTrue();
  });

  it('should enable check in button when is selected empty cell and panding sample', () => {
    component.selectedCell = { row: 0, column: 0 };
    component.selectedSample = new Sample('1', 'a', 'b');
    fixture.detectChanges();
    const containerList = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(containerList.disabled).toBeFalse();
  });

  it('should disable check in button when is only selected empty cell', () => {
    component.selectedCell = { row: 0, column: 0 };
    fixture.detectChanges();
    const containerList = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(containerList.disabled).toBeTrue();
  });

  it('should disable check in button when is only selected sample', () => {
    component.selectedSample = new Sample('1', 'a', 'b');
    fixture.detectChanges();
    const containerList = fixture.debugElement.query(By.css('.btn-check-in')).nativeElement as HTMLButtonElement;

    expect(containerList.disabled).toBeTrue();
  });

  it('should emit handleSelectSample when sample is clicked', () => {
    const btnCell = fixture.debugElement.queryAll(By.css('.btn-sample'))[0];
    const spySelect = spyOn(component, 'handleSelectSample').and.callThrough();
    btnCell.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
    expect(component.selectedSample).toEqual(storageService.getSamples().value.get('1'));
  });

  it('should emit handleCheckIn when check in button is clicked', () => {
    component.selectedCell = { row: 0, column: 0 };
    boardService.selectedContainer = new Container('A', 1, 1);
    component.selectedSample = new Sample('5', 'a', 'b');
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const btnCheckIn = fixture.debugElement.query(By.css('.btn-check-in'));
    const spySelect = spyOn(component, 'handleCheckIn').and.callThrough();
    btnCheckIn.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
    expect(component.selectedCell?.sample).toEqual(storageService.getSamples().value.get('5'));
    expect(component.selectedSample).toBeUndefined();
  });

  it('should emit handleCheckOut when check out button is clicked', () => {
    component.selectedCell = { row: 0, column: 0, sample: new Sample('1', 'a', 'b') };
    fixture.detectChanges();

    const btnCheckOut = fixture.debugElement.query(By.css('.btn-check-out'));
    const spySelect = spyOn(component, 'handleCheckOut').and.callThrough();
    btnCheckOut.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
  });
});
