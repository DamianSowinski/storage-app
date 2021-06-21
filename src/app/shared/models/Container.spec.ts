import Container from './Container';
import Sample from './Sample';

describe('Container', () => {
  it('should create an instance', () => {
    expect(new Container('Box', 2, 2)).toBeTruthy();
  });

  it('should init empty samples matrix', () => {
    const obj = new Container('Box', 2, 2);
    const samples = obj.getSamples();

    expect(samples.length).toEqual(2);
    expect(samples[0].length).toEqual(2);
    expect(obj.getSample(0, 1)).toBeUndefined();
  });

  it('should add sample', () => {
    const obj = new Container('Box', 2, 2);
    const sample = new Sample('1-1', 'Blood', '1ml');

    obj.addSample(sample, 1, 0);

    expect(obj.getSample(1, 0)).toBeTruthy();
    expect(obj.getSample(1, 0)).toEqual(sample);
  });

  it('should set sample container property when add sample', () => {
    const obj = new Container('Box', 2, 2);
    const sample = new Sample('1-1', 'Blood', '1ml');

    obj.addSample(sample, 1, 0);

    expect(sample.container).toEqual(obj);
  });
});
