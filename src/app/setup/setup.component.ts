import { Component } from '@angular/core';
import Page from '../shared/types/Page';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  title = 'Setup';
  pages: Page[] = [
    { path: 'samples', title: 'Samples' },
    { path: 'containers', title: 'Containers' },
  ];
}
