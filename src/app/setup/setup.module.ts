import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ContainersComponent } from './containers/containers.component';
import { FormComponent as ContainerFormComponent } from './containers/form/form.component';
import { FormComponent as SampleFormComponent } from './samples/form/form.component';
import { SamplesComponent } from './samples/samples.component';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';

@NgModule({
  declarations: [SamplesComponent, ContainersComponent, SetupComponent, SampleFormComponent, ContainerFormComponent],
  imports: [CommonModule, SetupRoutingModule, SharedModule, ReactiveFormsModule],
})
export class SetupModule {}
