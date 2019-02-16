import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todolist, ITodolistDto } from '../app.models';
import { IAppService } from './app.service.model';

@Injectable({
    providedIn: 'root'
})
export class AppServiceMock implements IAppService {

    constructor() { }

    public getTodoList(id: number): Observable<Todolist | undefined> {
        return of();
    }

    public getTodoLists(): Observable<Array<Todolist>> {
        return of([]);
    }

    public createTodoList(todoList: Todolist): Observable<Todolist | undefined> {
        return of();
    }

    public deleteTodoList(todoListOrId: Todolist | number): Observable<void> {
        return of();
    }

    public updateTodoList(todoList: Todolist): Observable<Todolist | undefined> {
        return of();
    }
}
