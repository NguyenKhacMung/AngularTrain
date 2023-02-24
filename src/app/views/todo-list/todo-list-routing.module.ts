import { ReactiveFormsComponent } from './../../components/reactive-forms/reactive-forms.component';
import { TemplateDrivenFormsComponent } from './../../components/template-driven-forms/template-driven-forms.component';
import { TodoListComponent } from './todo-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    title: 'Todo List',
    children: [
      {
        path: 'template-driven-forms',
        component: TemplateDrivenFormsComponent,
        title: ' TemplateDrivenForms',
      },
      {
        path: 'reactive-forms',
        component: ReactiveFormsComponent,
        title: 'ReactiveForms',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListRoutingModule {}
