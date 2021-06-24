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
    expect(service.getSelectedCell().value).toBeUndefined();
  });

  it('should store select', () => {
    const select: SelectedCell = {
      row: 1,
      column: 1,
    };
    service.setSelectedCell(select);

    expect(service.getSelectedCell().value).toBeTruthy();
    expect(service.getSelectedCell().value?.row).toEqual(1);
    expect(service.getSelectedCell().value?.column).toEqual(1);
  });

  it('should add a sample to select', () => {
    const sample = new Sample('1', 'DNA', '1ml');
    const select: SelectedCell = {
      row: 1,
      column: 1,
    };

    service.setSelectedCell(select);
    service.addSampleToSelectedCell(sample);

    expect(service.getSelectedCell().value).toBeTruthy();
    expect(service.getSelectedCell().value?.sample).toEqual(sample);
  });

  it('should remove a sample from select', () => {
    const select: SelectedCell = {
      row: 1,
      column: 1,
      sample: new Sample('1', 'DNA', '1ml'),
    };

    service.setSelectedCell(select);
    service.removeSampleFromSelectedCell();

    expect(service.getSelectedCell().value).toBeTruthy();
    expect(service.getSelectedCell().value?.sample).toBeUndefined();
  });

  it('should clear selection', () => {
    const select: SelectedCell = {
      row: 1,
      column: 1,
    };

    service.setSelectedCell(select);
    service.clearSelection();

    expect(service.selectedContainer).toBeUndefined();
    expect(service.getSelectedCell().value).toBeUndefined();
  });
});
