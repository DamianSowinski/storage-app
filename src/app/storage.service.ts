import { Injectable } from '@angular/core';
import Container from './shared/models/Container';
import Sample from './shared/models/Sample';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly samples: Map<string, Sample>;
  private readonly containers: Map<string, Container>;

  constructor() {
    this.samples = new Map<string, Sample>();
    this.containers = new Map<string, Container>();
    this.fillWithSampleData();
  }

  getSamples(): Map<string, Sample> {
    return this.samples;
  }

  getContainers(): Map<string, Container> {
    return this.containers;
  }

  addSample(sample: Sample): boolean {
    if (this.checkSampleExist(sample)) {
      return false;
    }

    this.samples.set(sample.number, sample);
    return true;
  }

  addContainer(container: Container): boolean {
    if (this.checkContainerExist(container)) {
      return false;
    }

    this.containers.set(container.name, container);
    return true;
  }

  checkSampleExist(sample: Sample): boolean {
    return this.samples.has(sample.number);
  }

  checkContainerExist(container: Container): boolean {
    return this.containers.has(container.name);
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
