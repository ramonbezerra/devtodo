import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: String = 'Dev Todo';
  public todos: Todo[] = [];
  public todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required
      ])]
    });
  }

  add() {
    const name = this.todoForm.controls['name'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, name, false));
    this.todoForm.reset();
  }
}
