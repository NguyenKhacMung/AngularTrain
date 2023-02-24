import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './views/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { TemplateDrivenFormsComponent } from './components/template-driven-forms/template-driven-forms.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AsyncForbidenNameDirective } from './directive-validators/async-validator/async-forbiden-name.directive';
import { ForbiddenValidatorDirective } from './directive-validators/validator/forbidden-name.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    HomeComponent,
    PageNotFoundComponent,
    TemplateDrivenFormsComponent,
    ReactiveFormsComponent,
    ForbiddenValidatorDirective,
    AsyncForbidenNameDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
