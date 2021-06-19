import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: (number | string)[][] = [];

  isValidData = true;

  ngOnInit(): void {
    this.isValidData = this.checkInputData();
  }

  private checkInputData(): boolean {
    const columns = this.columns.length;

    for (const data of this.data) {
      if (data.length !== columns) {
        return false;
      }
    }

    return true;
  }
}
