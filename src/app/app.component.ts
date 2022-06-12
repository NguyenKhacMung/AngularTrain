import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo-app-train';
  name: string = '';
  inputFormControl = new FormControl('');
  addTodo() {
    console.log(this.name);
  }
  onclick(){
    console.log(this.inputFormControl);
  }
}
