import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from './components/card/card.component';
import { FabComponent } from './components/fab/fab.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { HeaderComponent } from './components/header/header.component';
import { IcoListComponent } from './components/ico/ico-list.component';
import { IcoComponent } from './components/ico/ico.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    IcoComponent,
    FabComponent,
    IcoListComponent,
    ModalComponent,
    FormFieldComponent,
    CardComponent,
  ],
  imports: [AppRoutingModule, CommonModule],
  exports: [
    HeaderComponent,
    TableComponent,
    IcoComponent,
    FabComponent,
    IcoListComponent,
    ModalComponent,
    FormFieldComponent,
    CardComponent,
  ],
})
export class SharedModule {}
