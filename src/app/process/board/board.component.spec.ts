import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import Container from '../../shared/models/Container';
import Sample from '../../shared/models/Sample';
import { StorageService } from '../../storage.service';
import { BoardComponent } from './board.component';

fdescribe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: StorageService,
          useValue: jasmine.createSpyObj('StorageService', ['getContainer']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ slug: 'box' }),
          },
        },
      ],
      declarations: [BoardComponent],
    }).compileComponents();
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    const container = new Container('Box', 10, 12);

    storageService.getContainer.and.returnValue(container);

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set card title', () => {
    expect(component.title).toEqual('SoftSystem / Box');
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
});
