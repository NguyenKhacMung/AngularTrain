import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'todo',
    loadChildren: () =>
      import('./views/todo-list/todo-list-routing.module').then(
        (m) => m.TodoListRoutingModule
      ),
  },
  { path: '**', component: PageNotFoundComponent, title: 'NotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
