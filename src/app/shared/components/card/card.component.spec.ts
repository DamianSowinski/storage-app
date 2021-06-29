import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    component.title = 'test title';
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('.card-header')).nativeElement as HTMLDivElement;
    expect(header.innerText).toEqual('test title');
  });

  it('should change style', () => {
    component.cardStyle = 'gray';
    fixture.detectChanges();
    let header = fixture.debugElement.query(By.css('.card-header')).nativeElement as HTMLDivElement;
    expect(header.classList.toString()).toEqual('card-header');

    component.cardStyle = 'red';
    fixture.detectChanges();
    header = fixture.debugElement.query(By.css('.card-header')).nativeElement as HTMLDivElement;
    expect(header.classList.toString()).toEqual('card-header bg-primary');
  });
});
