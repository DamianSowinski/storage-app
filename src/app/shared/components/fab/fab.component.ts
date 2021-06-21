import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare const $: any;

export type FabMode = 'add' | 'save';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit, AfterViewInit {
  @Input() mode: FabMode = 'add';
  @Output() clickEvent = new EventEmitter();

  name = '';
  tooltip = '';
  cssClass = '';

  ngOnInit(): void {
    this.initButton();
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    $('[data-tooltip="tooltip"]').tooltip();
  }

  handleClick(): void {
    this.clickEvent.emit();

    setTimeout(() => {
      this.initButton();
      this.updateTooltip();
    }, 0);
  }

  private initButton() {
    switch (this.mode) {
      case 'add':
        this.name = 'plus';
        this.tooltip = 'Add';
        this.cssClass = 'btn-primary';
        break;
      case 'save':
        this.name = 'save';
        this.tooltip = 'Save';
        this.cssClass = 'btn-success';
        break;
    }
  }

  private updateTooltip() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    $('[data-tooltip="tooltip"]').attr('data-original-title', this.tooltip).tooltip('show');
  }
}
