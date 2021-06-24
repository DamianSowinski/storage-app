import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Container from '../shared/models/Container';
import Sample from '../shared/models/Sample';
import Page from '../shared/types/Page';
import SelectedCell from '../shared/types/SelectedCell';
import { StorageService } from '../storage.service';
import { BoardService } from './board/board.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnDestroy {
  containerPageList: Page[] = [];
  freeSamples: Sample[] = [];
  selectedSample?: Sample;
  selectedCell?: SelectedCell;

  samplesSubscription: Subscription;
  containersSubscription: Subscription;
  selectedCellSubscription: Subscription;

  constructor(private storageService: StorageService, private boardService: BoardService) {
    this.containersSubscription = this.storageService
      .getContainers()
      .subscribe((containers) => this.fillContainerPageList(containers));

    this.samplesSubscription = this.storageService.getSamples().subscribe((samples) => this.fillFreeSamples(samples));

    this.selectedCellSubscription = this.boardService.getSelectedCell().subscribe((selectedCell) => {
      this.selectedCell = selectedCell;
    });
  }

  ngOnDestroy(): void {
    this.containersSubscription.unsubscribe();
    this.samplesSubscription.unsubscribe();
    this.selectedCellSubscription.unsubscribe();
    this.selectedSample = undefined;
    this.selectedCell = undefined;
  }

  handleSelectSample(sample: Sample): void {
    this.selectedSample = sample;
  }

  handleCheckIn(): void {
    const { row, column } = this.selectedCell ?? {};
    const sample = this.selectedSample;
    const container = this.boardService.selectedContainer;

    if (container && sample && row !== undefined && column !== undefined) {
      if (container.addSample(sample, row, column)) {
        this.storageService.updateStream();
        this.boardService.addSampleToSelectedCell(sample);
        this.selectedSample = undefined;
      }
    }
  }

  handleCheckOut(): void {
    const { sample } = this.selectedCell ?? {};
    const container = this.boardService.selectedContainer;

    if (container && sample) {
      if (container.removeSample(sample)) {
        this.storageService.updateStream();
        this.boardService.removeSampleFromSelectedCell();
      }
    }
  }

  private fillContainerPageList(containers: Map<string, Container>) {
    this.containerPageList = [];
    containers.forEach((container, key) => {
      this.containerPageList.push({ path: key, title: container.name });
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
