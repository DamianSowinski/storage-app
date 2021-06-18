import { Component } from '@angular/core';
import Page from '../shared/types/Page';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  pages: Page[] = [
    { path: 'containers', title: 'Containers' },
    { path: 'samples', title: 'Samples' },
  ];
}
