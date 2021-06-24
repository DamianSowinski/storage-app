import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
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
  let storageService: jasmine.SpyObj<StorageService>;
  let boardService: jasmine.SpyObj<BoardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, CardComponent, IcoComponent, IcoListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getContainer']),
        },
        {
          provide: BoardService,
          useValue: jasmine.createSpyObj('BoardService', ['setSelectedCell', 'clearSelection', 'getSelectedCell']),
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
    boardService = TestBed.inject(BoardService) as jasmine.SpyObj<BoardService>;
  });

  beforeEach(() => {
    const container = new Container('Box', 10, 12);

    storageService.getContainer.and.returnValue(container);
    boardService.getSelectedCell.and.callThrough();
    boardService.setSelectedCell.and.callThrough();
    boardService.clearSelection.and.callThrough();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set card title', () => {
    expect(component.title).toEqual('SoftSystem / Box');

    storageService.getContainer.and.returnValue(undefined);
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.title).toEqual('SoftSystem');
  });

  it('should fetch container', () => {
    expect(component.container).toBeTruthy();
  });

  it('should show information about samples', () => {
    let samplesInfo = fixture.debugElement.query(By.css('.card-body .d-flex.justify-content-end'))
      .nativeElement as HTMLDivElement;
    expect(samplesInfo.innerText).toEqual('0 Samples / 120 slots / 120 empty');

    const container = new Container('Box', 10, 12);
    container.addSample(new Sample('1', 'Blood', '10ml'), 1, 1);

    storageService.getContainer.and.returnValue(container);

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    samplesInfo = fixture.debugElement.query(By.css('.card-body .d-flex.justify-content-end'))
      .nativeElement as HTMLDivElement;
    expect(samplesInfo.innerText).toEqual('1 Sample / 120 slots / 119 empty');
  });

  it('should generate board', () => {
    const board = fixture.debugElement.query(By.css('.table')).nativeElement as HTMLDivElement;
    expect(board).toBeTruthy();
    expect(board.querySelectorAll('.table__header')).toHaveSize(12);
    expect(board.querySelectorAll('.table__row')).toHaveSize(10);
    expect(board.querySelectorAll('.item')).toHaveSize(10 * 12);
  });

  it('should display stored sample on board', () => {
    const container = new Container('Box', 10, 12);
    let icons = fixture.debugElement.queryAll(By.css('.table__cell .item svg'));
    expect(icons).toHaveSize(0);

    container.addSample(new Sample('1', 'Blood', '10ml'), 0, 1);
    storageService.getContainer.and.returnValue(container);

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    icons = fixture.debugElement.queryAll(By.css('.table__cell .item svg'));

    expect(icons).toHaveSize(1);
  });

  it('should emit select cell when cell is clicked', () => {
    let btnCell = fixture.debugElement.queryAll(By.css('.table__cell .item'))[1];
    const spySelect = spyOn(component, 'handleSelectCell').and.callThrough();

    btnCell.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();

    expect(component.selectedCell?.row).toEqual(0);
    expect(component.selectedCell?.column).toEqual(1);

    btnCell = fixture.debugElement.queryAll(By.css('.table__cell .item'))[2];
    btnCell.triggerEventHandler('click', {});

    expect(spySelect).toHaveBeenCalled();
    expect(component.selectedCell?.row).toEqual(0);
    expect(component.selectedCell?.column).toEqual(2);
  });
});
