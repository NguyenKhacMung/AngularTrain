import { ValidatorTitleService } from './../../services/validators/validator-title.service';

import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../directive-validators/validator/forbidden-name.directive';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
})
export class ReactiveFormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private DataService: DataService,
    private AsyncValidateTitle: ValidatorTitleService
  ) {}

  todoForm: FormGroup;

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: [
        '',
        {
          validators: [Validators.required, Validators.minLength(4)],
          asyncValidators: [
            this.AsyncValidateTitle.validate.bind(this.AsyncValidateTitle),
          ],
          // updateOn: 'blur',
        },
      ],
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          forbiddenNameValidator(/a/),
        ],
      ],
      completed: [false],
    });
  }
  get todoFormControl() {
    return this.todoForm.controls;
  }
  onSubmit() {
    this.DataService.submitData(this.todoForm);
  }
}
