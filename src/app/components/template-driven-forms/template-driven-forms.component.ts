import { DataService } from './../../data.service';
import { Subscription } from 'rxjs';
import { Todo } from './../../interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.scss'],
})
export class TemplateDrivenFormsComponent implements OnInit {
  // subscription: Subscription;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {}

  todo: Todo = {
    id: '',
    title: '',
    user: '',
    completed: false,
  };
  @Output() submitTodo = new EventEmitter<object>();

  onSubmit(todoForm: NgForm) {
    this.dataService.submitData(todoForm);
  }
}
