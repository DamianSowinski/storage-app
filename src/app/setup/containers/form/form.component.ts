import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_NAME } from '../../../../environments/environment';
import Container from '../../../shared/models/Container';
import { ValidateUnique } from '../../../shared/validators/unique.validator';
import { StorageService } from '../../../storage.service';

declare const $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {
  title = 'Add Container';
  prevTitle = '';
  form: FormGroup;

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
  }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    $('#modal')
      .modal('show')
      .on('hidden.bs.modal', () => this.goBack());
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.prevTitle);
  }

  handleFormSubmit(): void {
    const { name, rows, columns } = this.form.value;
    const container = new Container(name, rows, columns);

    if (this.form.valid && this.storageService.addContainer(container)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      $('#modal').modal('hide');
    }
  }

  private createForm(): FormGroup {
    const { required, minLength, min } = Validators;
    const containers = this.storageService.getContainersStream().value;

    return this.formBuilder.group({
      name: ['', { validators: [required, minLength(1), ValidateUnique(containers, true)] }],
      rows: [1, { validators: [required, min(1)] }],
      columns: [1, { validators: [required, min(1)] }],
    });
  }

  private goBack(): void {
    void this.router.navigate(['..'], { relativeTo: this.route });
  }
}
