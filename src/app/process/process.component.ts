import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { APP_NAME } from '../../environments/environment';
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
  selectedPendingSample?: Sample;
  selectedCell?: SelectedCell;

  samplesSubscription: Subscription;
  containersSubscription: Subscription;
  selectedCellSubscription: Subscription;

  constructor(private storageService: StorageService, private boardService: BoardService, private titleService: Title) {
    titleService.setTitle(`Process | ${APP_NAME}`);

    this.containersSubscription = this.storageService
      .getContainersStream()
      .subscribe((containers) => this.fillContainerPageList(containers));

    this.samplesSubscription = this.storageService
      .getSamplesStream()
      .subscribe((samples) => this.fillFreeSamples(samples));

    this.selectedCellSubscription = this.boardService.getSelectedCellStream().subscribe((selectedCell) => {
      this.selectedCell = selectedCell;
    });
  }

  ngOnDestroy(): void {
    this.containersSubscription.unsubscribe();
    this.samplesSubscription.unsubscribe();
    this.selectedCellSubscription.unsubscribe();
    this.selectedPendingSample = undefined;
    this.selectedCell = undefined;
  }

  handleSelectSample(sample: Sample): void {
    this.selectedPendingSample = sample;
  }

  handleCheckIn(): void {
    const { row, column } = this.selectedCell ?? {};
    const sample = this.selectedPendingSample;
    const container = this.boardService.selectedContainer;

    if (container && sample && row !== undefined && column !== undefined) {
      if (container.addSample(sample, row, column)) {
        this.storageService.updateStream();
        this.boardService.addSampleToSelectedCell(sample);
        this.selectedPendingSample = undefined;
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

  isDisableCheckInBtn(): boolean {
    return !(<boolean>(this.selectedPendingSample && this.selectedCell && !this.selectedCell.sample));
  }

  private fillContainerPageList(containers: Map<string, Container>): void {
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
