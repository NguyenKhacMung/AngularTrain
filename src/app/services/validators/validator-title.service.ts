import { Todo } from './../../interface';
import {
  Observable,
  map,
  switchMap,
  catchError,
  of,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TodosService } from '../todos/todos.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorTitleService {
  constructor(private todoService: TodosService) {}
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.todoService.getTodoByTitle(control.value).pipe(
      // debounceTime(5000),
      // distinctUntilChanged(),
      map((todo: Todo) => {
        console.log('todo', todo);
        return todo ? { forbiddenName: { value: control.value } } : null;
      }),
      catchError(() => of(null))
    );
  }
}
