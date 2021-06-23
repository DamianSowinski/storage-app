import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Container from '../shared/models/Container';
import Sample from '../shared/models/Sample';
import Page from '../shared/types/Page';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnDestroy {
  containersSubscription: Subscription;
  samplesSubscription: Subscription;
  containerPageList: Page[] = [];
  freeSamples: Sample[] = [];

  constructor(private storageService: StorageService) {
    this.containersSubscription = this.storageService
      .getContainers()
      .subscribe((containers) => this.fillContainerPageList(containers));

    this.samplesSubscription = this.storageService.getSamples().subscribe((samples) => this.fillFreeSamples(samples));
  }

  ngOnDestroy(): void {
    this.containersSubscription.unsubscribe();
  }

  private fillContainerPageList(containers: Map<string, Container>) {
    this.containerPageList = [];
    containers.forEach((container) => {
      this.containerPageList.push({ path: container.name.toLowerCase(), title: container.name });
    });
  }

  private fillFreeSamples(samples: Map<string, Sample>): void {
    this.freeSamples = [];
    samples.forEach((sample) => {
      if (!sample.container) {
        this.freeSamples.push(sample);
      }
    });
  }
}
