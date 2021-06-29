import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill table', () => {
    component.columns = ['col1', 'col2', 'col3'];
    component.data = [
      [1, 'a', 'b'],
      [2, 'c', 'd'],
    ];

    fixture.detectChanges();

    const columnsTitle = fixture.debugElement.queryAll(By.css('th'));
    const columnFirstTitle = columnsTitle[0].nativeElement as HTMLTableHeaderCellElement;
    const dataFields = fixture.debugElement.queryAll(By.css('td'));

    expect(component.isValidData).toBeTruthy();
    expect(columnsTitle.length).toEqual(3);
    expect(columnFirstTitle.innerText).toEqual('col1');
    expect(dataFields.length).toEqual(6);
  });

  it('should display message for invalid data', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = ['col1', 'col2', 'col3'];
    component.data = [
      [1, 'a', 'b'],
      [2, 'c'],
    ];
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('td')).nativeElement as HTMLTableDataCellElement;

    expect(component.isValidData).toBeFalsy();
    expect(errorMessage.innerText).toEqual('Invalid data');
  });
});
