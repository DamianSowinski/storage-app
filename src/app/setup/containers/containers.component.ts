import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_NAME } from '../../../environments/environment';
import Container from '../../shared/models/Container';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
})
export class ContainersComponent implements OnDestroy {
  title = 'Containers';
  tableColumns = ['Name', 'Rows', 'Columns'];
  tableData: (number | string)[][] = [];
  containersSubscription: Subscription;

  constructor(
    private storageService: StorageService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    titleService.setTitle(`${this.title} | ${APP_NAME}`);

    this.containersSubscription = this.storageService
      .getContainersStream()
      .subscribe((containers) => this.fillTableData(containers));
  }

  ngOnDestroy(): void {
    this.containersSubscription.unsubscribe();
  }

  addContainer(): void {
    void this.router.navigate(['add'], { relativeTo: this.route });
  }

  private fillTableData(containers: Map<string, Container>): void {
    this.tableData = [];
    containers.forEach((item) => {
      const { name, rows, columns } = item;
      this.tableData.push([name, rows, columns]);
    });
  }
}
