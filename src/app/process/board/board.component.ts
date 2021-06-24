import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Container from '../../shared/models/Container';
import { StorageService } from '../../storage.service';
import { BoardService } from './board.service';

const TITLE = 'SoftSystem';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  container?: Container;
  title = TITLE;
  selectedCell?: { row: number; column: number };

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private boardService: BoardService
  ) {
    this.route.params.subscribe((params) => {
      this.container = this.storageService.getContainer(params.slug);
      this.updateTitle();
      this.selectedCell = undefined;
      this.boardService.clearSelection();
      this.boardService.selectedContainer = this.container;
    });
  }

  createSampleInfo(): string {
    const samples = this.container?.getAmountOfStoredSamples() ?? 0;
    const slots = this.container?.getMatrixSize() ?? 0;
    const empty = this.container?.getAmountOfEmptySlots() ?? 0;
    const sampleTxt = samples === 1 ? 'Sample' : 'Samples';
    return `${samples} ${sampleTxt} / ${slots} slots / ${empty} empty`;
  }

  handleSelectCell(row: number, column: number): void {
    this.selectedCell = { row, column };

    this.boardService.setSelectedCell({
      row,
      column,
      sample: this.container?.getMatrixCell(row, column),
    });
  }

  private updateTitle(): void {
    if (this.container) {
      this.title = `${TITLE} / ${this.container.name}`;
    }
  }
}