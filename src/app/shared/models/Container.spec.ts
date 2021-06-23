import Container from './Container';
import Sample from './Sample';

describe('Container', () => {
  it('should create an instance', () => {
    expect(new Container('Box', 2, 2)).toBeTruthy();
  });

  it('should init empty samples matrix', () => {
    const obj = new Container('Box', 2, 2);
    const samples = obj.getMatrix();

    expect(samples.length).toEqual(2);
    expect(samples[0].length).toEqual(2);
    expect(obj.getMatrixCell(0, 1)).toBeUndefined();
  });

  it('should add sample', () => {
    const obj = new Container('Box', 2, 2);
    const sample = new Sample('1-1', 'Blood', '1ml');

    obj.addSample(sample, 1, 0);

    expect(obj.getMatrixCell(1, 0)).toBeTruthy();
    expect(obj.getMatrixCell(1, 0)).toEqual(sample);
    expect(obj.getAmountOfStoredSamples()).toEqual(1);
  });

  it('should set sample container property when add sample', () => {
    const container = new Container('Box', 2, 2);
    const sample = new Sample('1-1', 'Blood', '1ml');

    container.addSample(sample, 1, 0);

    expect(sample.container).toEqual(container);
    expect(container.getMatrixCell(1, 0)).toEqual(sample);
  });

  it('should not allow add sample to non empty slot', () => {
    const container = new Container('Box', 2, 2);
    const sample = new Sample('1-1', 'Blood', '1ml');

    container.addSample(sample, 1, 0);

    expect(sample.container).toEqual(container);
    expect(container.getMatrixCell(1, 0)).toEqual(sample);

    const sample2 = new Sample('2', 'Serum', '10ml');
    container.addSample(sample2, 1, 0);

    expect(sample2.container).toBeFalsy();
    expect(container.getMatrixCell(1, 0)).toEqual(sample);
  });

  it('should not allow add sample to more than one container', () => {
    const container = new Container('Box', 2, 2);
    const sample = new Sample('1-1', 'Blood', '1ml');

    container.addSample(sample, 1, 0);

    expect(sample.container).toEqual(container);
    expect(container.getMatrixCell(1, 0)).toEqual(sample);

    const container2 = new Container('Shelve', 4, 4);
    container2.addSample(sample, 1, 0);

    expect(container.getMatrixCell(1, 0)).toEqual(sample);
    expect(container2.getMatrixCell(1, 0)).toBeFalsy();
  });
});
