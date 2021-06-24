import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './board/board.component';
import { BoardService } from './board/board.service';
import { ProcessRoutingModule } from './process-routing.module';
import { ProcessComponent } from './process.component';

@NgModule({
  declarations: [ProcessComponent, BoardComponent],
  imports: [CommonModule, ProcessRoutingModule, SharedModule],
  providers: [BoardService],
})
export class ProcessModule {}
