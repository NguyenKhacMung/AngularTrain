import { Todo } from './../../interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() todo: any;
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() onToggleTodoComplete = new EventEmitter<object>();

  onDelete(id: string) {
    this.deleteTodo.emit(id);
  }
  toggleTodoComplete(id: string, completed: boolean) {
    this.onToggleTodoComplete.emit({ id, completed });
  }
}
