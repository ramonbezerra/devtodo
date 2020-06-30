import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
    headers: any = new Headers({ 'Content-Type': 'application/json' });
    options: any = new RequestOptions({ headers: this.headers });

    constructor(private http:Http) { }

    getTodo() {
        return this.http.get('/todos')
                        .pipe(map(response => response.json().data));
    }
}