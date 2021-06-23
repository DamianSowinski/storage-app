import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ProcessComponent } from './process.component';

const routes: Routes = [
  {
    path: 'process',
    component: ProcessComponent,
    children: [
      { path: '', component: BoardComponent },
      { path: ':slug', component: BoardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessRoutingModule {}
