import { TestBed } from '@angular/core/testing';
import Container from './shared/models/Container';
import Sample from './shared/models/Sample';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return samples stream', () => {
    expect(service.getSamplesStream).toBeTruthy();
  });

  it('should return containers stream', () => {
    expect(service.getSamplesStream).toBeTruthy();
  });

  it('should add sample', () => {
    let samples = service.getSamplesStream().value;
    const size = samples.size;
    const isAdd = service.addSample(new Sample('1', 'a', 'aa'));
    samples = service.getSamplesStream().value;

    expect(isAdd).toBeTrue();
    expect(samples).toHaveSize(size + 1);
    expect(samples.has('1')).toBeTrue();
  });

  it('should store unique samples', () => {
    let samples = service.getSamplesStream().value;
    const size = samples.size;
    let isAdd = service.addSample(new Sample('1', 'a', 'aa'));
    samples = service.getSamplesStream().value;

    expect(isAdd).toBeTrue();
    expect(samples).toHaveSize(size + 1);

    isAdd = service.addSample(new Sample('1', 'a', 'aa'));
    samples = service.getSamplesStream().value;

    expect(isAdd).toBeFalse();
    expect(samples).toHaveSize(size + 1);

    isAdd = service.addSample(new Sample('2', 'b', 'bb'));
    samples = service.getSamplesStream().value;

    expect(isAdd).toBeTrue();
    expect(samples).toHaveSize(size + 2);
  });

  it('should add containers', () => {
    let containers = service.getContainersStream().value;
    const size = containers.size;
    const isAdd = service.addContainer(new Container('A', 1, 1));
    containers = service.getContainersStream().value;

    expect(isAdd).toBeTrue();
    expect(containers).toHaveSize(size + 1);
    expect(containers.has('a')).toBeTrue();
  });

  it('should store unique containers', () => {
    let containers = service.getContainersStream().value;
    const size = containers.size;
    let isAdd = service.addContainer(new Container('A', 1, 1));
    containers = service.getContainersStream().value;

    expect(isAdd).toBeTrue();
    expect(containers).toHaveSize(size + 1);

    isAdd = service.addContainer(new Container('A', 1, 1));
    containers = service.getContainersStream().value;

    expect(isAdd).toBeFalse();
    expect(containers).toHaveSize(size + 1);

    isAdd = service.addContainer(new Container('B', 1, 1));
    containers = service.getContainersStream().value;

    expect(isAdd).toBeTrue();
    expect(containers).toHaveSize(size + 2);
  });

  it('should get a container by key', function () {
    service.addContainer(new Container('A', 1, 1));

    expect(service.getContainer('a')).toBeTruthy();
  });
});
