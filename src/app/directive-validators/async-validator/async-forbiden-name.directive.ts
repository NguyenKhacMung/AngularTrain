import { ValidatorTitleService } from '../../services/validators/validator-title.service';
import { Directive, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appAsyncForbidenName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AsyncForbidenNameDirective),
      multi: true,
    },
  ],
})
export class AsyncForbidenNameDirective implements AsyncValidator {
  constructor(private validator: ValidatorTitleService) {}
  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
