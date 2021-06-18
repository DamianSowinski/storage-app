import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainersComponent } from './containers/containers.component';
import { SamplesComponent } from './samples/samples.component';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';

@NgModule({
  declarations: [SamplesComponent, ContainersComponent, SetupComponent],
  imports: [CommonModule, SetupRoutingModule],
})
export class SetupModule {}
