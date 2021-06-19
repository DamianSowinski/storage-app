import { Component } from '@angular/core';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
})
export class ContainersComponent {
  title = 'Containers';
  tableColumns = ['Name', 'Rows', 'Columns'];
  tableData: (number | string)[][] = [];

  constructor(private storageService: StorageService) {
    this.fillTableData();
  }

  private fillTableData(): void {
    this.storageService.getContainers().forEach((item) => {
      const { name, rows, columns } = item;
      this.tableData.push([name, rows, columns]);
    });
  }
}
