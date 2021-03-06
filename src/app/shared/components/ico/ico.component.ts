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
      .o-ico {
        width: 1rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: currentColor;
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
