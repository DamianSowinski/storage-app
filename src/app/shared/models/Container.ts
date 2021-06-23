import Sample from './Sample';

class Container {
  private readonly _name: string;
  private readonly _rows: number;
  private readonly _columns: number;
  private readonly matrix: (Sample | undefined)[][] = [];

  constructor(name: string, rows: number, columns: number) {
    this._name = name;
    this._rows = rows;
    this._columns = columns;
    this.initSamplesMatrix();
  }

  get name(): string {
    return this._name;
  }

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  addSample(sample: Sample, row: number, column: number): boolean {
    if (this.matrix[row][column] || sample.container) {
      return false;
    }

    this.matrix[row][column] = sample;
    sample.container = this;

    return true;
  }

  getMatrixCell(row: number, column: number): Sample | undefined {
    return this.matrix[row][column];
  }

  getMatrix(): (Sample | undefined)[][] {
    return this.matrix;
  }

  getMatrixSize(): number {
    return this.rows * this.columns;
  }

  getAmountOfEmptySlots(): number {
    return this.getMatrixSize() - this.getAmountOfStoredSamples();
  }

  getAmountOfStoredSamples(): number {
    let count = 0;

    this.matrix.forEach((row) =>
      row.forEach((item) => {
        if (item) {
          count++;
        }
      })
    );

    return count;
  }

  private initSamplesMatrix() {
    for (let $i = 0; $i < this._rows; $i++) {
      this.matrix.push(Array(this._columns).fill(undefined));
    }
  }
}

export default Container;
