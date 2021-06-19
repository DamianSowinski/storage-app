import { Component } from '@angular/core';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
})
export class SamplesComponent {
  title = 'Samples';
  tableColumns = ['Number', 'Type', 'Volume'];
  tableData = [
    [1, 'a', 'b'],
    [2, 'c', 'd'],
  ];
}
