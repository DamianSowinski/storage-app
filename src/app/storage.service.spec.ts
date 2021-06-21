import { TestBed } from '@angular/core/testing';
import Container from './shared/models/Container';
import Sample from './shared/models/Sample';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store samples', () => {
    let samples = service.getSamples().value;
    expect(samples.size).toEqual(3);

    const isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeTrue();
    expect(samples.size).toEqual(4);
  });

  it('should store unique samples', () => {
    let samples = service.getSamples().value;
    expect(samples.size).toEqual(3);

    let isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeTrue();
    expect(samples.size).toEqual(4);

    isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeFalse();
    expect(samples.size).toEqual(4);

    isAdd = service.addSample(new Sample('1-2', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeTrue();
    expect(samples.size).toEqual(5);
  });

  it('should store containers', () => {
    let containers = service.getContainers().value;
    expect(containers.size).toEqual(3);

    const isAdd = service.addContainer(new Container('Fridge', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeTrue();
    expect(containers.size).toEqual(4);
  });

  it('should store unique containers', () => {
    let containers = service.getContainers().value;
    expect(containers.size).toEqual(3);

    let isAdd = service.addContainer(new Container('Fridge', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeTrue();
    expect(containers.size).toEqual(4);

    isAdd = service.addContainer(new Container('Fridge', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeFalse();
    expect(containers.size).toEqual(4);

    isAdd = service.addContainer(new Container('Tray', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeTrue();
    expect(containers.size).toEqual(5);
  });
});
