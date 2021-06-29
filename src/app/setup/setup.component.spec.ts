import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SetupComponent } from './setup.component';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SetupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleHTML = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLHeadingElement;

    expect(titleHTML.innerText).toEqual('Setup');
  });

  it('should render menu', () => {
    const menuList = fixture.debugElement.queryAll(By.css('.btn'));

    expect(menuList).toHaveSize(2);
    expect(menuList[0].nativeElement.innerText).toEqual('Samples');
  });
});
