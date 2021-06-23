import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Container from './shared/models/Container';
import Sample from './shared/models/Sample';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly samples: Map<string, Sample>;
  private readonly containers: Map<string, Container>;

  private readonly samplesSubject: BehaviorSubject<Map<string, Sample>>;
  private readonly containerSubject: BehaviorSubject<Map<string, Container>>;

  constructor() {
    this.samples = new Map<string, Sample>();
    this.containers = new Map<string, Container>();
    this.samplesSubject = new BehaviorSubject(this.samples);
    this.containerSubject = new BehaviorSubject(this.containers);
    this.fillWithSampleData();
  }

  getSamples(): BehaviorSubject<Map<string, Sample>> {
    return this.samplesSubject;
  }

  getContainer(key: string): Container | undefined {
    return this.containers.get(key);
  }

  getContainers(): BehaviorSubject<Map<string, Container>> {
    return this.containerSubject;
  }

  addSample(sample: Sample): boolean {
    if (this.checkSampleExist(sample)) {
      return false;
    }

    this.samples.set(sample.number.toLowerCase(), sample);
    this.samplesSubject.next(this.samples);
    return true;
  }

  addContainer(container: Container): boolean {
    if (this.checkContainerExist(container)) {
      return false;
    }

    this.containers.set(container.name.toLowerCase(), container);
    this.containerSubject.next(this.containers);
    return true;
  }

  checkSampleExist(sample: Sample): boolean {
    return this.samples.has(sample.number.toLowerCase());
  }

  checkContainerExist(container: Container): boolean {
    return this.containers.has(container.name.toLowerCase());
  }

  private fillWithSampleData(): void {
    this.addSample(new Sample('21-1', 'Blood', '10ml'));
    this.addSample(new Sample('21-2', 'Serum', '3ml'));
    this.addSample(new Sample('21-3', 'DNA', '2ql'));

    this.addContainer(new Container('Box', 10, 12));
    this.addContainer(new Container('Shelve', 5, 3));
    this.addContainer(new Container('Main box', 6, 6));
  }
}
