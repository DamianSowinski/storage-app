import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SamplesComponent } from './samples.component';

describe('SamplesComponent', () => {
  let component: SamplesComponent;
  let fixture: ComponentFixture<SamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SamplesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
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
});
