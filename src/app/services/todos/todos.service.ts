import { Todo } from '../../interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  retry,
  throwError,
  tap,
  delay,
  retryWhen,
  take,
  concatMap,
  timeout,
  timer,
} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'http://localhost:3001/todos';
  // httpOptions.headers =
  // httpOptions.headers.set('Authorization', 'my-new-auth-token');

  //getTodos
  // getTodos(): Observable<Todo[]> {
  //   return this.http
  //     .get<Todo[]>(this.apiUrl, httpOptions)
  //     .pipe(retry(3), catchError(this.handleError));
  // }

  getTodos(): Promise<Todo[]> {
    let promise = new Promise<Todo[]>((resolve, reject) => {
      this.http
        .get(this.apiUrl)
        .toPromise()
        .then(
          (res: any) => {
            console.log('res', res);
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  }

  //addTodo
  postTodo(data: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(this.apiUrl, data)
      .pipe(catchError(this.handleError));
  }

  //UpdateTodo
  putTodo(id: string, data: any): Observable<Todo> {
    return this.http
      .patch<Todo>(`${this.apiUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  // deleteTodo

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}sdsd`).pipe(
      retry({count: 5, delay: 2000}),
      // retry({
      //   count: 5,
      //   delay: (error, retryCount): any =>
      //     retryCount == 1 ? timer(2000) : of({}),
      // }),
      catchError(this.handleError)
    );
  }

  // deleteTodo(id: string): Observable<Todo> {
  //   return this.http.delete<Todo>(`${this.apiUrl}/${id}sdfd`).pipe(
  //     retryWhen((errors) =>
  //       errors.pipe(
  //         delay(2000),
  //         take(4),
  //         concatMap(throwError)
  //       )
  //     ),
  //     catchError(this.handleError)
  //   );
  // }

  //searchTodo
  searchTodos(text: string): Observable<Todo[]> {
    text = text.trim();
    const params = new HttpParams({ fromString: `title_like=${text}` });
    const options = text
      ? { params: new HttpParams().set('title_like', text) }
      : {};

    return this.http
      .get<Todo[]>(this.apiUrl, options)
      .pipe(catchError(this.handleError));
  }

  getTodoByTitle(value: string): Observable<Todo> {
    return this.http
      .get<Todo[]>(`${this.apiUrl}?title=${value}`, { observe: 'body' })
      .pipe(
        tap((data: Todo[]) => console.log(data)),
        map((todo: Todo[]) => todo[0]),
        catchError(this.handleError)
      );
  }

  //handleError
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
