import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Container from '../../shared/models/Container';
import { StorageService } from '../../storage.service';

const TITLE = 'SoftSystem';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  container: Container | undefined = undefined;
  title = TITLE;

  constructor(private route: ActivatedRoute, private storageService: StorageService) {
    this.route.params.subscribe((params) => {
      this.container = this.storageService.getContainer(params.slug);
      this.updateTitle();
    });
  }

  private updateTitle(): void {
    if (this.container) {
      this.title = `${TITLE} / ${this.container.name}`;
    }
  }

  createSampleInfo(): string {
    const samples = this.container?.getAmountOfStoredSamples() ?? 0;
    const slots = this.container?.getMatrixSize() ?? 0;
    const empty = this.container?.getAmountOfEmptySlots() ?? 0;

    const sampleTxt = samples === 1 ? 'Sample' : 'Samples';

    return `${samples} ${sampleTxt} / ${slots} slots / ${empty} empty`;
  }
}
