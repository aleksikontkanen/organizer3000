import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Todolist, ITodolistDto, Task, ITaskDto } from '../app.models';
import { IAppService } from './app.service.model';

@Injectable({
    providedIn: 'root'
})
export class AppService implements IAppService {

    constructor(
        private readonly http: HttpClient
    ) { }

    private getTodoListEndpoint(): string {
        return environment.server.baseUrl + environment.server.endpoints.todolist;
    }

    private getTaskEndpoint(): string {
        return environment.server.baseUrl + environment.server.endpoints.task;
    }

    /* TodoList */

    public getTodoList(id: number): Observable<Todolist | undefined> {
        return this.http
            .get<ITodolistDto | undefined>(this.getTodoListEndpoint() + `/${id}`)
            .pipe(map(todolist => todolist ? Todolist.create(todolist) : undefined));
    }

    public getTodoLists(): Observable<Array<Todolist>> {
        return this.http
            .get<Array<ITodolistDto>>(this.getTodoListEndpoint())
            .pipe(map(todolists => todolists.map(t => Todolist.create(t))));
    }

    public createTodoList(todoList: Todolist): Observable<Todolist | undefined> {
        return this.http
            .post<ITodolistDto | undefined>(this.getTodoListEndpoint(), todoList)
            .pipe(map(newTodoList => newTodoList ? Todolist.create(newTodoList) : undefined));
    }

    public deleteTodoList(todoListOrId: Todolist | number): Observable<void> {
        const id: number | undefined = todoListOrId instanceof Todolist ? todoListOrId.id : todoListOrId;

        if (id == null) { throw new Error('Cannot delete a todo list without an ID.'); }

        return this.http
            .delete<void>(this.getTodoListEndpoint() + `/${id}`);
    }

    public updateTodoList(todoList: Todolist): Observable<Todolist | undefined> {
        return this.http
            .put<ITodolistDto | undefined>(this.getTodoListEndpoint(), todoList)
            .pipe(map(updatedTodoList => updatedTodoList ? Todolist.create(updatedTodoList) : undefined));
    }

    /* Task */

    public getTask(id: number): Observable<Task | undefined> {
        return this.http
            .get<ITaskDto | undefined>(this.getTaskEndpoint() + `/${id}`)
            .pipe(map(task => task ? Task.create(task) : undefined));
    }

    public getTasks(): Observable<Array<Task>> {
        return this.http
            .get<Array<ITaskDto>>(this.getTaskEndpoint())
            .pipe(map(tasks => tasks.map(t => Task.create(t))));
    }

    public createTask(task: Task): Observable<Task | undefined> {
        return this.http
            .post<ITaskDto | undefined>(this.getTaskEndpoint(), task)
            .pipe(map(newTask => newTask ? Task.create(newTask) : undefined));
    }

    public deleteTask(taskOrId: Task | number): Observable<void> {
        const id: number | undefined = taskOrId instanceof Task ? taskOrId.id : taskOrId;

        if (id == null) { throw new Error('Cannot delete a task list without an ID.'); }

        return this.http
            .delete<void>(this.getTaskEndpoint() + `/${id}`);
    }

    public updateTask(task: Task): Observable<Task | undefined> {
        return this.http
            .put<ITaskDto | undefined>(this.getTaskEndpoint(), task)
            .pipe(map(updatedTask => updatedTask ? Task.create(updatedTask) : undefined));
    }
}
