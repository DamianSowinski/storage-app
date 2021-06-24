import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Sample from '../../shared/models/Sample';
import { ValidateUnique } from '../../shared/validators/unique.validator';
import { StorageService } from '../../storage.service';

declare const $: any;

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
})
export class SamplesComponent implements OnDestroy {
  title = 'Samples';
  tableColumns = ['Number', 'Type', 'Volume'];
  tableData: (number | string)[][] = [];
  form: FormGroup;
  samplesSubscription: Subscription;
  typesHelper: Set<string> = new Set([]);

  constructor(private storageService: StorageService, private formBuilder: FormBuilder) {
    this.samplesSubscription = this.storageService.getSamples().subscribe((samples) => {
      this.fillTableData(samples);
      this.fillTypesHelepr(samples);
    });
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.samplesSubscription.unsubscribe();
  }

  addSample(): void {
    this.form.reset();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    $('#modal').modal('show');
  }

  handleFormSubmit(): void {
    const { number, type, volume } = this.form.value;
    const sample = new Sample(number, type, volume);

    if (this.form.valid && this.storageService.addSample(sample)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      $('#modal').modal('hide');
      this.form.reset();
    }
  }

  private fillTableData(samples: Map<string, Sample>): void {
    this.tableData = [];
    samples.forEach((sample) => {
      const { number, type, volume } = sample;
      this.tableData.push([number, type, volume]);
    });
  }

  private createForm(): FormGroup {
    const { required, minLength, pattern } = Validators;
    const samples = this.storageService.getSamples().value;

    return this.formBuilder.group({
      number: ['', { validators: [required, minLength(1), ValidateUnique(samples)] }],
      type: ['', { validators: [required, minLength(1)] }],
      volume: ['', { validators: [required, pattern('^[0-9]+((,|.)?[0-9]+)?(l|ml|µl|nl|pl){1}$')] }],
    });
  }

  private fillTypesHelepr(samples: Map<string, Sample>) {
    const tmpArray: string[] = [];
    samples.forEach((sample) => tmpArray.push(sample.type));
    this.typesHelper = new Set(tmpArray.sort());
  }
}
