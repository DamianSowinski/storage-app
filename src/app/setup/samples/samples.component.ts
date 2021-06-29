import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_NAME } from '../../../environments/environment';
import Sample from '../../shared/models/Sample';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
})
export class SamplesComponent implements OnDestroy {
  title = 'Samples';
  tableColumns = ['Number', 'Type', 'Volume'];
  tableData: (number | string)[][] = [];
  samplesSubscription: Subscription;

  constructor(
    private storageService: StorageService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    titleService.setTitle(`${this.title} | ${APP_NAME}`);

    this.samplesSubscription = this.storageService.getSamplesStream().subscribe((samples) => {
      this.fillTableData(samples);
    });
  }

  ngOnDestroy(): void {
    this.samplesSubscription.unsubscribe();
  }

  addSample(): void {
    void this.router.navigate(['add'], { relativeTo: this.route });
  }

  private fillTableData(samples: Map<string, Sample>): void {
    this.tableData = [];
    samples.forEach((sample) => {
      const { number, type, volume } = sample;
      this.tableData.push([number, type, volume]);
    });
  }
}
