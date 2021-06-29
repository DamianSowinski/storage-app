import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    component.title = 'App title';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement as HTMLHeadingElement;
    expect(title.innerText).toEqual('App title');
  });

  it('should render nav menu', () => {
    component.pages = [{ path: 'a', title: 'title' }];
    fixture.detectChanges();
    const nav = fixture.debugElement.queryAll(By.css('.btn'));

    expect(nav).toHaveSize(1);
    expect(nav[0].nativeElement.innerText).toEqual('title');
  });
});
