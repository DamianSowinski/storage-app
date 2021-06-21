import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FabComponent } from './fab.component';

describe('FabComponent', () => {
  let component: FabComponent;
  let fixture: ComponentFixture<FabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle btn click', () => {
    const spyClick = spyOn(component, 'handleClick').and.callThrough();
    const btn = fixture.debugElement.query(By.css('button'));

    btn.triggerEventHandler('click', {});
    expect(spyClick).toHaveBeenCalled();
  });
});
