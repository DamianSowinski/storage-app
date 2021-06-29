import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { FormComponent as ContainerFormComponent } from './containers/form/form.component';
import { FormComponent as SampleFormComponent } from './samples/form/form.component';
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
      {
        path: 'samples',
        component: SamplesComponent,
        children: [
          {
            path: 'add',
            component: SampleFormComponent,
          },
        ],
      },
      {
        path: 'containers',
        component: ContainersComponent,
        children: [
          {
            path: 'add',
            component: ContainerFormComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
