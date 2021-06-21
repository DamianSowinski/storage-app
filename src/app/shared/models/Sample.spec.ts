import Container from './Container';
import Sample from './Sample';

describe('Sample', () => {
  it('should create an instance', () => {
    expect(new Sample('1-1', 'Blood', '1ml')).toBeTruthy();
  });

  it('should set container', () => {
    const sample = new Sample('1-1', 'Blood', '1ml');
    const obj = new Container('Box', 2, 2);

    sample.container = obj;

    expect(sample.container).toBeTruthy();
    expect(sample.container).toEqual(obj);
  });
});
