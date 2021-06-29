import { Component, Input } from '@angular/core';
import Page from '../../types/Page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() title = '';

  pages: Page[] = [
    { path: 'process', title: 'Process' },
    { path: 'setup', title: 'Setup' },
  ];
}
