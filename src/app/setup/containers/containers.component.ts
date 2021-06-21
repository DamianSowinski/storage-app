import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Container from '../../shared/models/Container';
import { StorageService } from '../../storage.service';

declare const $: any;

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
})
export class ContainersComponent implements OnDestroy {
  title = 'Containers';
  tableColumns = ['Name', 'Rows', 'Columns'];
  tableData: (number | string)[][] = [];
  form: FormGroup;
  containersSubscription: Subscription;

  constructor(private storageService: StorageService, private formBuilder: FormBuilder) {
    this.containersSubscription = this.storageService
      .getContainers()
      .subscribe((containers) => this.fillTableData(containers));
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.containersSubscription.unsubscribe();
  }

  addContainer(): void {
    this.form.reset();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    $('#modal').modal('show');
  }

  handleFormSubmit(): void {
    const { name, rows, columns } = this.form.value;
    const container = new Container(name, rows, columns);

    if (this.storageService.addContainer(container)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      $('#modal').modal('hide');
      this.form.reset();
    }
  }

  private fillTableData(containers: Map<string, Container>): void {
    this.tableData = [];

    containers.forEach((item) => {
      const { name, rows, columns } = item;
      this.tableData.push([name, rows, columns]);
    });
  }

  private createForm(): FormGroup {
    const { required, minLength, min } = Validators;

    return this.formBuilder.group({
      name: ['', { validators: [required, minLength(3)] }],
      rows: [1, { validators: [required, min(1)] }],
      columns: [1, { validators: [required, min(1)] }],
    });
  }
}
