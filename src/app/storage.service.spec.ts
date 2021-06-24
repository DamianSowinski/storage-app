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
    const size = samples.size;
    const isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeTrue();
    expect(samples).toHaveSize(size + 1);
  });

  it('should store unique samples', () => {
    let samples = service.getSamples().value;
    const size = samples.size;

    let isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeTrue();
    expect(samples).toHaveSize(size + 1);

    isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeFalse();
    expect(samples).toHaveSize(size + 1);

    isAdd = service.addSample(new Sample('1-2', 'Blood', '10ml'));
    samples = service.getSamples().value;
    expect(isAdd).toBeTrue();
    expect(samples).toHaveSize(size + 2);
  });

  it('should store containers', () => {
    let containers = service.getContainers().value;
    const size = containers.size;

    const isAdd = service.addContainer(new Container('Main Tray', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeTrue();
    expect(containers).toHaveSize(size + 1);
    expect(containers.get('main-tray')).toBeTruthy();
  });

  it('should store unique containers', () => {
    let containers = service.getContainers().value;
    const size = containers.size;

    let isAdd = service.addContainer(new Container('Small fridge', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeTrue();
    expect(containers).toHaveSize(size + 1);
    expect(containers.get('small-fridge')).toBeTruthy();

    isAdd = service.addContainer(new Container('Small Fridge', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeFalse();
    expect(containers).toHaveSize(size + 1);
    expect(containers.get('small-fridge')).toBeTruthy();

    isAdd = service.addContainer(new Container('Tray', 12, 12));
    containers = service.getContainers().value;
    expect(isAdd).toBeTrue();
    expect(containers).toHaveSize(size + 2);
  });

  it('should get a container by key', function () {
    service.addContainer(new Container('Small fridge', 12, 12));

    expect(service.getContainer('small-fridge')).toBeTruthy();
  });
});
