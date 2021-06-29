import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_NAME } from '../../../../environments/environment';
import Sample from '../../../shared/models/Sample';
import { ValidatePattern } from '../../../shared/validators/pattern.validator';
import { ValidateUnique } from '../../../shared/validators/unique.validator';
import { StorageService } from '../../../storage.service';

declare const $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {
  title = 'Add Sample';
  prevTitle = '';
  form: FormGroup;
  typesHelper: Set<string> = new Set();
  samplesSubscription: Subscription;

  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.prevTitle = titleService.getTitle();
    titleService.setTitle(`${this.title} | ${APP_NAME}`);

    this.form = this.createForm();

    this.samplesSubscription = this.storageService.getSamplesStream().subscribe((samples) => {
      this.typesHelper = this.createHint(samples);
    });
  }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    $('#modal')
      .modal('show')
      .on('hidden.bs.modal', () => this.goBack());
  }

  ngOnDestroy(): void {
    this.samplesSubscription.unsubscribe();
    this.titleService.setTitle(this.prevTitle);
  }

  handleFormSubmit(): void {
    const { number, type, volume } = this.form.value;
    const sample = new Sample(number, type, volume);

    if (this.form.valid && this.storageService.addSample(sample)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      $('#modal').modal('hide');
    }
  }

  private createForm(): FormGroup {
    const { required, minLength } = Validators;
    const samples = this.storageService.getSamplesStream().value;

    return this.formBuilder.group({
      number: [
        '',
        {
          validators: [
            required,
            ValidateUnique(samples),
            ValidatePattern(/^[0-9]+(-?[0-9]+)*$/, 'Only number with a optional minus separator allowed eg. 1 or 1-1'),
          ],
        },
      ],
      type: ['', { validators: [required, minLength(1)] }],
      volume: [
        '',
        {
          validators: [
            required,
            ValidatePattern(
              /^[0-9]+((,|.)?[0-9]+)?(l|ml|µl|nl|pl)$/,
              'Only number with a volume unit allowed eg: 10ml or 0.1µl'
            ),
          ],
        },
      ],
    });
  }

  private createHint(samples: Map<string, Sample>): Set<string> {
    const tmpArray: string[] = [];
    samples.forEach((sample) => tmpArray.push(sample.type));
    return new Set(tmpArray.sort());
  }

  private goBack(): void {
    void this.router.navigate(['..'], { relativeTo: this.route });
  }
}
