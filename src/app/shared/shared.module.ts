import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [HeaderComponent, TableComponent],
  imports: [AppRoutingModule, CommonModule],
  exports: [HeaderComponent, TableComponent],
})
export class SharedModule {}
