import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    headers: any = new Headers({ 'Content-Type': 'application/json' });
    options: any = new RequestOptions({ headers: this.headers });

    constructor(private http:Http) { }

    getAllTodos() : Observable<any> {
        return this.http.get('/todos')
                        .pipe(map(response => response.json().data));
    }

    addTodo(data) {
        this.http.post('/todos', data, { headers: this.headers }).subscribe();
    }
}