import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private todo = new BehaviorSubject(null);
  // currentTodo = this.todo.asObservable();
  dataSubmit$ = this.todo.asObservable();
  constructor() {}

  submitData(data: any) {
    this.todo.next(data);
  }
}
