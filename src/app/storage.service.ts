import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as slug from 'slug';
import { containers, samples } from './AppStoreExampleData.data';
import Container from './shared/models/Container';
import Sample from './shared/models/Sample';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private samples: Map<string, Sample>;
  private containers: Map<string, Container>;

  private readonly samples$: BehaviorSubject<Map<string, Sample>>;
  private readonly container$: BehaviorSubject<Map<string, Container>>;

  constructor() {
    this.samples = samples;
    this.containers = containers;
    this.samples$ = new BehaviorSubject(this.samples);
    this.container$ = new BehaviorSubject(this.containers);
  }

  getSamplesStream(): BehaviorSubject<Map<string, Sample>> {
    return this.samples$;
  }

  getContainersStream(): BehaviorSubject<Map<string, Container>> {
    return this.container$;
  }

  updateStream(): void {
    this.samples$.next(this.samples);
    this.container$.next(this.containers);
  }

  addSample(sample: Sample): boolean {
    if (this.hasSample(sample)) {
      return false;
    }

    this.samples.set(sample.number, sample);
    this.samples$.next(this.samples);
    return true;
  }

  addContainer(container: Container): boolean {
    if (this.hasContainer(container)) {
      return false;
    }

    this.containers.set(slug(container.name), container);
    this.container$.next(this.containers);
    return true;
  }

  getContainer(key: string): Container | undefined {
    return this.containers.get(key);
  }

  clear(): void {
    this.samples = new Map<string, Sample>();
    this.containers = new Map<string, Container>();
    this.updateStream();
  }

  private hasSample(sample: Sample): boolean {
    return this.samples.has(sample.number);
  }

  private hasContainer(container: Container): boolean {
    return this.containers.has(slug(container.name));
  }
}
