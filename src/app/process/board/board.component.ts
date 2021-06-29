import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { APP_NAME, COMPANY_NAME } from '../../../environments/environment';
import Container from '../../shared/models/Container';
import SelectedCell from '../../shared/types/SelectedCell';
import { StorageService } from '../../storage.service';
import { BoardService } from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnDestroy {
  title = COMPANY_NAME;
  prevTitle = '';
  container?: Container;
  selectedCell?: Partial<SelectedCell>;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private boardService: BoardService,
    private titleService: Title
  ) {
    this.route.params.subscribe((params) => {
      this.container = this.storageService.getContainer(params.slug);
      this.setTitle();
      this.selectedCell = undefined;
      this.boardService.clearSelection();
      this.boardService.selectedContainer = this.container;
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.prevTitle);
  }

  handleSelectCell(row: number, column: number): void {
    this.selectedCell = { row, column };

    this.boardService.setSelectedCell({
      row,
      column,
      sample: this.container?.getMatrixCell(row, column),
    });
  }

  createSampleInfo(): string {
    const samples = this.container?.getAmountOfStoredSamples() ?? 0;
    const slots = this.container?.getMatrixSize() ?? 0;
    const empty = this.container?.getAmountOfEmptySlots() ?? 0;
    const sampleTxt = samples === 1 ? 'Sample' : 'Samples';
    return `${samples} ${sampleTxt} / ${slots} slots / ${empty} empty`;
  }

  private setTitle(): void {
    this.prevTitle = this.titleService.getTitle();

    if (this.container) {
      this.titleService.setTitle(`${this.container.name} - ${COMPANY_NAME} | ${APP_NAME}`);
      this.title = `${COMPANY_NAME} / ${this.container.name}`;
    }
  }
}
