import { LoginService } from './../../services/login/login.service';
import { TodosService } from '../../services/todos/todos.service';
import { DataService } from '../../data.service';
import { Todo } from '../../interface';
import { Component, OnInit } from '@angular/core';
import {
  Subject,
  Observable,
  switchMap,
  distinctUntilChanged,
  debounceTime,
  of,
} from 'rxjs';
// import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  withRefresh = false;
  packages$!: Observable<any>;
  private searchText$ = new Subject<string>();
  constructor(
    private dataService: DataService,
    private todoService: TodosService,
    private loginService: LoginService
  ) {}

  todos: Todo[] = [];
  searchText: string = '';
  ngOnInit(): void {
    this.getAllTodos();

    // this.packages$ = this.searchText$.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   switchMap((packageName:any) => {
    //     console.log(packageName);
    //     return of(packageName);
    //   })
    // );

    this.dataService.dataSubmit$.subscribe((todoForm: any) => {
      // console.log('todoForm', todoForm);
      if (todoForm) {
        // this.addTodo(todoForm);
        this.login(todoForm);
      }
    });
  }
  // ngOnDestroy() {
  //   this.data$.unsubscribe();
  // }
  login(todoForm: any): void {
    const data = {
      username: todoForm.value.title,
      password: todoForm.value.user,
    };

    this.loginService.login(data).subscribe((response) => {
      console.log('response', response);
      console.log(response.headers('set-cookie'));
    });
  }

  getAllTodos(): void {
    // this.todoService.getTodos().subscribe((data: Todo[]) => {
    //   this.todos = data;
    // });
    this.todoService
      .getTodos()
      .then((data: Todo[]) => {
        this.todos = data;
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  addTodo(todoForm: any): void {
    const id: string = Math.random().toString();
    const todo = {
      id,
      ...todoForm.value,
    };
    this.todoService.postTodo(todo).subscribe((data: Todo) => {
      console.log(data);
      this.todos.push(data);
      todoForm.reset();
    });
  }

  onDeleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(
      (data: Todo) => {
        console.log(data);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      // (error) => {
      //   console.log('error', error);
      // }
    );
  }

  onToggleTodoComplete({ id, completed }: any): void {
    this.todoService.putTodo(id, { completed }).subscribe((data: Todo) => {
      this.todos = this.todos.map((todo) => {
        if (todo.id === data.id) {
          todo.completed = data.completed;
        }
        return todo;
      });
    });
  }

  searchTodo(): void {
    // this.searchText$.next(this.searchText);
    this.todoService.searchTodos(this.searchText).subscribe((data: Todo[]) => {
      console.log(data);
      this.todos = data;
    });
  }
}
