import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { SamplesComponent } from './samples/samples.component';
import { SetupComponent } from './setup.component';

const routes: Routes = [
  {
    path: 'setup',
    redirectTo: 'setup/samples',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    component: SetupComponent,
    children: [
      { path: 'samples', component: SamplesComponent },
      { path: 'containers', component: ContainersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
