import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { ProcessRoutingModule } from './process-routing.module';
import { ProcessComponent } from './process.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [ProcessComponent, BoardComponent],
  imports: [CommonModule, ProcessRoutingModule, SharedModule],
})
export class ProcessModule {}
