import * as slug from 'slug';
import Container from './shared/models/Container';
import Sample from './shared/models/Sample';

export const samples: Map<string, Sample> = new Map([
  ['21-1', new Sample('21-1', 'Blood', '10ml')],
  ['21-2', new Sample('21-2', 'Serum', '3ml')],
  ['21-3', new Sample('21-3', 'DNA', '2ql')],
]);

export const containers: Map<string, Container> = new Map([
  [slug('Box'), new Container('Box', 10, 12)],
  [slug('Shelve'), new Container('Shelve', 5, 3)],
  [slug('Main box'), new Container('Main box', 6, 6)],
]);
