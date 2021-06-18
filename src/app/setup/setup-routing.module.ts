import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { SamplesComponent } from './samples/samples.component';
import { SetupComponent } from './setup.component';

const routes: Routes = [
  {
    path: 'setup',
    redirectTo: 'setup/containers',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    component: SetupComponent,
    children: [
      { path: 'containers', component: ContainersComponent },
      { path: 'samples', component: SamplesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
