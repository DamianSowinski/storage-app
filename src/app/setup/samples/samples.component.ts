import { Component } from '@angular/core';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
})
export class SamplesComponent {
  title = 'Samples';
  tableColumns = ['Number', 'Type', 'Volume'];
  tableData: (number | string)[][] = [];

  constructor(private storageService: StorageService) {
    this.fillTableData();
  }

  private fillTableData(): void {
    this.storageService.getSamples().forEach((item) => {
      const { number, type, volume } = item;
      this.tableData.push([number, type, volume]);
    });
  }
}
