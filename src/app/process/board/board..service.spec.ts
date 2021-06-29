import { TestBed } from '@angular/core/testing';
import Sample from '../../shared/models/Sample';
import SelectedCell from '../../shared/types/SelectedCell';
import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardService],
    });
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getSelectedCellStream().value).toBeUndefined();
  });

  it('should return selected cell stream', () => {
    expect(service.getSelectedCellStream).toBeTruthy();
  });

  it('should set selected cell', () => {
    const select: SelectedCell = { row: 1, column: 1 };
    service.setSelectedCell(select);

    expect(service.getSelectedCellStream().value).toBeTruthy();
    expect(service.getSelectedCellStream().value?.row).toEqual(1);
    expect(service.getSelectedCellStream().value?.column).toEqual(1);
  });

  it('should add sample to selected cell', () => {
    const sample = new Sample('1', 'a', 'aa');
    const select: SelectedCell = { row: 1, column: 1 };
    service.setSelectedCell(select);
    service.addSampleToSelectedCell(sample);

    expect(service.getSelectedCellStream().value).toBeTruthy();
    expect(service.getSelectedCellStream().value?.sample).toEqual(sample);
  });

  it('should remove a sample from selected cell', () => {
    const select: SelectedCell = {
      row: 1,
      column: 1,
      sample: new Sample('1', 'a', 'aa'),
    };
    service.setSelectedCell(select);
    service.removeSampleFromSelectedCell();

    expect(service.getSelectedCellStream().value).toBeTruthy();
    expect(service.getSelectedCellStream().value?.sample).toBeUndefined();
  });

  it('should clear selection', () => {
    const select: SelectedCell = { row: 1, column: 1 };
    service.setSelectedCell(select);
    service.clearSelection();

    expect(service.selectedContainer).toBeUndefined();
    expect(service.getSelectedCellStream().value).toBeUndefined();
  });
});
