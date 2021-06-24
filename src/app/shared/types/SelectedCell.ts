import Sample from '../models/Sample';

type SelectedCell = {
  row: number;
  column: number;
  sample?: Sample;
};

export default SelectedCell;
