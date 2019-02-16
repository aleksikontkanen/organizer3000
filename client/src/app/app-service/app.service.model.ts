import { Observable } from 'rxjs';
import { Todolist, ITodolistDto } from '../app.models';

export interface IAppService {
    getTodoList: (id: number) => Observable<Todolist | undefined>;
    getTodoLists: () => Observable<Array<Todolist>>;
    createTodoList: (todoList: Todolist) => Observable<Todolist | undefined>;
    deleteTodoList: (todoListOrId: Todolist | number) => Observable<void>;
    updateTodoList: (todoList: Todolist) => Observable<Todolist | undefined>;
}
