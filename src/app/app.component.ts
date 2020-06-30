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
  public createdTodos: Todo[] = [];
  public startedTodos: Todo[] = [];
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
    const id = this.createdTodos.length + 1;
    this.createdTodos.push(new Todo(id, name, false));
    this.todoForm.reset();
    console.log(this.createdTodos);
  }

  remove(todo:Todo) {
    const index = this.createdTodos.indexOf(todo);
    index !== -1 ? this.createdTodos.splice(index, 1) : null;
  }

  start(todo:Todo) {
    const index = this.createdTodos.indexOf(todo);
    index !== -1 ? this.createdTodos.splice(index, 1) : null;
    index !== -1 ? this.startedTodos.push(todo) : null;
  }

  markAsDone(todo:Todo) {
    todo.done = true;
  }

  markAsUndone(todo:Todo) {
    todo.done = false;
    const index = this.startedTodos.indexOf(todo);
    index !== -1 ? this.startedTodos.splice(index, 1) : null;
    index !== -1 ? this.createdTodos.push(todo) : null;
  }
}
