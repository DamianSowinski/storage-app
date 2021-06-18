import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProcessRoutingModule } from './process-routing.module';
import { ProcessComponent } from './process.component';

@NgModule({
  declarations: [ProcessComponent],
  imports: [CommonModule, ProcessRoutingModule],
})
export class ProcessModule {}
