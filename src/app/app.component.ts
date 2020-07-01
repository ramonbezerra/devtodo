import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: String = 'Dev Todo';
  private errorMessage: String;
  public createdTodos: Todo[] = [];
  public startedTodos: Todo[] = [];
  public todoForm: FormGroup;

  constructor(private service: AppService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.load()
  }

  load() {
    this.service.getAllTodos()
                .subscribe(data => this.createdTodos = data,
                  error => this.errorMessage = <any>error);
  }

  add() {
    const name = this.todoForm.controls['name'].value;
    const newTodo = new Todo(name, false);
    this.service.addTodo(JSON.stringify({"name": name, "done": false}));
    this.todoForm.reset();
    this.load();
  }

  remove(todo:Todo) {
    const index = this.createdTodos.indexOf(todo);
    index !== -1 ? this.createdTodos.splice(index, 1) : null;
    index !== -1 ? this.service.deleteTodo({ id: todo.id }) : null;
    return index;
  }

  start(todo:Todo) {
    const index = this.remove(todo);
    index !== -1 ? this.startedTodos.push(todo) : null;
  }

  markAsDone(todo:Todo) {
    this.service.updateTodo({id: todo.id, done: true});
    todo.done = true;
  }

  markAsUndone(todo:Todo) {
    this.service.updateTodo({id: todo.id, done: false});
    todo.done = false;
    const index = this.startedTodos.indexOf(todo);
    index !== -1 ? this.startedTodos.splice(index, 1) : null;
    index !== -1 ? this.createdTodos.push(todo) : null;    
  }
}
