import { Component } from '@angular/core';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
})
export class ContainersComponent {
  title = 'Containers';
  tableColumns = ['Name', 'Rows', 'Columns'];
  tableData = [
    [1, 'a', 'b'],
    [2, 'c', 'd'],
  ];
}
