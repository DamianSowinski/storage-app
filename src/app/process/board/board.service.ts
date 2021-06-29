import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Container from '../../shared/models/Container';
import Sample from '../../shared/models/Sample';
import SelectedCell from '../../shared/types/SelectedCell';

@Injectable()
export class BoardService {
  private readonly selectedCell$: BehaviorSubject<SelectedCell | undefined>;
  private _selectedContainer?: Container;

  constructor() {
    this.selectedCell$ = new BehaviorSubject<SelectedCell | undefined>(undefined);
  }

  get selectedContainer(): Container | undefined {
    return this._selectedContainer;
  }

  set selectedContainer(value: Container | undefined) {
    this._selectedContainer = value;
  }

  getSelectedCellStream(): BehaviorSubject<SelectedCell | undefined> {
    return this.selectedCell$;
  }

  setSelectedCell(select: SelectedCell): void {
    this.selectedCell$.next(select);
  }

  addSampleToSelectedCell(sample: Sample): void {
    if (this.selectedCell$.value) {
      this.selectedCell$.value.sample = sample;
      this.selectedCell$.next(this.selectedCell$.value);
    }
  }

  removeSampleFromSelectedCell(): void {
    if (this.selectedCell$.value) {
      this.selectedCell$.value.sample = undefined;
      this.selectedCell$.next(this.selectedCell$.value);
    }
  }

  clearSelection(): void {
    this.selectedCell$.next(undefined);
    this._selectedContainer = undefined;
  }
}
