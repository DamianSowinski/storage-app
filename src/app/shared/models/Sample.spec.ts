import Container from './Container';
import Sample from './Sample';

describe('Sample', () => {
  it('should create an instance', () => {
    expect(new Sample('1', 'a', 'aa')).toBeTruthy();
  });

  it('should set container', () => {
    const sample = new Sample('1', 'a', 'aa');
    const container = new Container('A', 1, 1);
    sample.container = container;

    expect(sample.container).toBeTruthy();
    expect(sample.container).toEqual(container);
  });
});
