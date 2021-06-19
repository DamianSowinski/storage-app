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
    expect(service.getSamples().size).toEqual(3);

    const isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    expect(isAdd).toBeTrue();
    expect(service.getSamples().size).toEqual(4);
  });

  it('should store unique samples', () => {
    expect(service.getSamples().size).toEqual(3);

    let isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    expect(isAdd).toBeTrue();
    expect(service.getSamples().size).toEqual(4);

    isAdd = service.addSample(new Sample('1-1', 'Blood', '10ml'));
    expect(isAdd).toBeFalse();
    expect(service.getSamples().size).toEqual(4);

    isAdd = service.addSample(new Sample('1-2', 'Blood', '10ml'));
    expect(isAdd).toBeTrue();
    expect(service.getSamples().size).toEqual(5);
  });

  it('should store containers', () => {
    expect(service.getContainers().size).toEqual(3);

    const isAdd = service.addContainer(new Container('Fridge', 12, 12));
    expect(isAdd).toBeTrue();
    expect(service.getContainers().size).toEqual(4);
  });

  it('should store unique containers', () => {
    expect(service.getContainers().size).toEqual(3);

    let isAdd = service.addContainer(new Container('Fridge', 12, 12));
    expect(isAdd).toBeTrue();
    expect(service.getContainers().size).toEqual(4);

    isAdd = service.addContainer(new Container('Fridge', 12, 12));
    expect(isAdd).toBeFalse();
    expect(service.getContainers().size).toEqual(4);

    isAdd = service.addContainer(new Container('Tray', 12, 12));
    expect(isAdd).toBeTrue();
    expect(service.getContainers().size).toEqual(5);
  });
});
