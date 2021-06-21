import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico',
  template: `
    <svg class="o-ico" xmlns="http://www.w3.org/2000/svg">
      <use [attr.xlink:href]="absUrl + '#' + name + '-ico'"></use>
    </svg>
  `,
  styles: [
    `
      :host {
        line-height: 0;
      }
    `,
  ],
})
export class IcoComponent {
  @Input() name = '';

  get absUrl(): string {
    return window.location.href.split('#')[0];
  }
}
