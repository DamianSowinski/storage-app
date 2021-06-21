import Sample from './Sample';

class Container {
  private readonly _name: string;
  private readonly _rows: number;
  private readonly _columns: number;
  private readonly samples: (Sample | undefined)[][] = [];

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

  addSample(sample: Sample, row: number, column: number): void {
    this.samples[row][column] = sample;
    sample.container = this;
  }

  getSample(row: number, column: number): Sample | undefined {
    return this.samples[row][column];
  }

  getSamples(): (Sample | undefined)[][] {
    return this.samples;
  }

  private initSamplesMatrix() {
    for (let $i = 0; $i < this._rows; $i++) {
      this.samples.push(Array(this._columns).fill(undefined));
    }
  }
}

export default Container;
