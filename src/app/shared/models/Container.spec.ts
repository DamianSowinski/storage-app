import Container from './Container';
import Sample from './Sample';

describe('Container', () => {
  it('should create an instance', () => {
    expect(new Container('A', 1, 1)).toBeTruthy();
  });

  it('should init empty samples matrix', () => {
    const container = new Container('A', 2, 2);
    const samples = container.getMatrix();

    expect(samples.length).toEqual(2);
    expect(samples[0].length).toEqual(2);
    expect(container.getMatrixCell(0, 0)).toBeUndefined();
  });

  it('should add sample', () => {
    const container = new Container('A', 2, 2);
    const sample = new Sample('1', 'a', 'aa');
    container.addSample(sample, 1, 0);

    expect(sample.container).toEqual(container);
    expect(container.getMatrixCell(1, 0)).toEqual(sample);
    expect(container.getAmountOfStoredSamples()).toEqual(1);
  });

  it('should not allow add sample to non empty slot', () => {
    const container = new Container('A', 2, 2);
    const sample = new Sample('1', 'a', 'aa');
    container.addSample(sample, 1, 0);

    expect(sample.container).toEqual(container);
    expect(container.getMatrixCell(1, 0)).toEqual(sample);

    const sample2 = new Sample('2', 'b', 'bb');
    container.addSample(sample2, 1, 0);

    expect(sample2.container).toBeFalsy();
    expect(container.getMatrixCell(1, 0)).toEqual(sample);
  });

  it('should not allow add sample to more than one container', () => {
    const container = new Container('A', 2, 2);
    const sample = new Sample('1', 'a', 'aa');
    container.addSample(sample, 1, 0);

    expect(sample.container).toEqual(container);
    expect(container.getMatrixCell(1, 0)).toEqual(sample);

    const container2 = new Container('B', 2, 2);
    container2.addSample(sample, 1, 0);

    expect(container.getMatrixCell(1, 0)).toEqual(sample);
    expect(container2.getMatrixCell(1, 0)).toBeFalsy();
  });

  it('should remove sample', () => {
    const container = new Container('A', 2, 2);
    const sample = new Sample('1', 'a', 'aa');
    container.addSample(sample, 0, 0);
    const isRemove = container.removeSample(sample);

    expect(isRemove).toBeTrue();
    expect(sample.container).toEqual(undefined);
    expect(container.getMatrixCell(0, 0)).toEqual(undefined);
  });

  it('should return matrix cell', () => {
    const container = new Container('A', 2, 2);
    const sample = new Sample('1', 'a', 'aa');

    expect(container.getMatrixCell(0, 0)).toEqual(undefined);

    container.addSample(sample, 0, 0);

    expect(container.getMatrixCell(0, 0)).toEqual(sample);
  });

  it('should return matrix size', () => {
    const container = new Container('A', 2, 2);

    expect(container.getMatrixSize()).toEqual(4);
  });

  it('should return amount of empty slots', () => {
    const container = new Container('A', 2, 2);
    const sample = new Sample('1', 'a', 'aa');

    expect(container.getAmountOfEmptySlots()).toEqual(4);

    container.addSample(sample, 0, 0);

    expect(container.getAmountOfEmptySlots()).toEqual(3);
  });

  it('should return amount of stored samples', () => {
    const container = new Container('A', 2, 2);
    const sample = new Sample('1', 'a', 'aa');

    expect(container.getAmountOfStoredSamples()).toEqual(0);

    container.addSample(sample, 0, 0);

    expect(container.getAmountOfStoredSamples()).toEqual(1);
  });
});
