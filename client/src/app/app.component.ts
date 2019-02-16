import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { AppService } from './app-service/app.service';
import { Todolist, Task, TaskState, TaskPriority } from './app.models';
import { first } from 'rxjs/operators';
import moment from 'moment-es6';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    public todoLists?: Array<Todolist>;
    public selectedTodoList?: Todolist;
    public editPlaceholderTask?: Task;
    public readonly m = moment;
    public readonly taskState = TaskState;

    constructor(
        private readonly api: AppService,
        private readonly cdr: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        this.subscribeToTodoLists();
    }

    private subscribeToTodoLists(): void {
        this.api.getTodoLists()
            .pipe(first())
            .subscribe(todoLists => {
                this.todoLists = todoLists;
                this.cdr.detectChanges();
            });
    }

    public selectList(selectedList: Todolist): void {
        this.selectedTodoList = selectedList;
        this.cdr.detectChanges();
    }

    public removeSelectedList(): void {
        this.selectedTodoList = undefined;
        this.cdr.detectChanges();
    }

    public addList(): void {
        const todoList = new Todolist({
            name: 'New list'
        });

        if (this.todoLists) {
            this.todoLists.push(todoList);
        } else {
            this.todoLists = [todoList];
        }

        this.cdr.detectChanges(); // Eagerly display results

        this.api.createTodoList(todoList).subscribe(
            newTodoList => {
                if (newTodoList === undefined || this.todoLists === undefined) { return; }

                this.todoLists.pop();
                this.todoLists.push(newTodoList);

                this.cdr.detectChanges();

            }, // Success
            error => { // Rollback
                if (this.todoLists === undefined) { return; }

                this.todoLists.splice(-1, 1);
                console.error(error);

                this.cdr.detectChanges();
            });
    }

    public deleteList(todoList: Todolist): void {
        if (todoList.id == null || this.todoLists == null) { return; }

        const listToDeleteIndex = this.todoLists.findIndex(t => t.id === todoList.id);

        if (listToDeleteIndex === -1) { return; }

        const deletedTodoList = this.todoLists.splice(listToDeleteIndex, 1)[0];

        this.cdr.detectChanges(); // Eagerly display results

        this.api.deleteTodoList(todoList.id).subscribe(
            () => { }, // Success
            error => { // Rollback
                if (this.todoLists === undefined) { return; }

                this.todoLists.splice(listToDeleteIndex, 0, deletedTodoList);
                console.error(error);

                this.cdr.detectChanges();
            });
    }

    public toggleTaskState(todoList: Todolist, task: Task, checked: boolean): void {
        const rollbackTask = task.clone();

        if (checked) {
            task.completionTime = moment();
            task.state = TaskState.COMPLETED;

        } else {
            task.completionTime = undefined;
            task.state = TaskState.PLANNED;
        }

        this.cdr.detectChanges(); // Eagerly display results

        this.api.updateTodoList(todoList).subscribe(
            () => { }, // Success
            error => { // Rollback
                task = rollbackTask;
                console.error(error);

                this.cdr.detectChanges();
            });
    }

    public toggleEditor(): void {
        if (this.editPlaceholderTask) {
            this.editPlaceholderTask = undefined;

        } else {
            this.editPlaceholderTask = new Task({
                name: '',
                priority: TaskPriority.MEDIUM,
                state: TaskState.PLANNED
            });
        }

        this.cdr.detectChanges();
    }

    public saveEditorTask(): void {
        if (this.selectedTodoList === undefined ||
            this.editPlaceholderTask === undefined ||
            this.editPlaceholderTask.name === undefined ||
            this.editPlaceholderTask.description === undefined
        ) { return; }

        this.selectedTodoList.tasks.push(this.editPlaceholderTask); // Eagerly display results
        this.toggleEditor(); // Eagerly display results

        this.api.updateTodoList(this.selectedTodoList).subscribe(
            updatedList => {
                if (updatedList === undefined || this.todoLists === undefined) { return; }

                this.todoLists.splice(
                    this.todoLists.findIndex(t => t.id === updatedList.id),
                    1,
                    updatedList
                );
                this.selectedTodoList = updatedList;

                this.cdr.detectChanges();

            }, // Success
            error => { // Rollback
                if (this.selectedTodoList === undefined) { return; }

                this.selectedTodoList.tasks.pop();

                console.error(error);

                this.cdr.detectChanges();
            });
    }

    public updateTodoList(todoList: Todolist): void {
        this.api.updateTodoList(todoList).subscribe(
            updatedList => {
                if (updatedList === undefined) { return; }

                todoList = updatedList;
                this.cdr.detectChanges();

            }, // Success
            error => { // Rollback
                console.error(error);

                this.cdr.detectChanges();
            });
    }

    public deleteTask(task: Task): void {
        if (task.id == null || this.selectedTodoList == null) { return; }

        const taskToDeleteIndex = this.selectedTodoList.tasks.findIndex(t => t.id === task.id);

        if (taskToDeleteIndex === -1) { return; }

        const taskToDelete = this.selectedTodoList.tasks.splice(taskToDeleteIndex, 1);

        this.cdr.detectChanges(); // Eagerly display results

        this.api.updateTodoList(this.selectedTodoList).subscribe(
            updatedList => {
                if (updatedList === undefined || this.todoLists === undefined) { return; }

                this.todoLists.splice(
                    this.todoLists.findIndex(t => t.id === updatedList.id),
                    1,
                    updatedList
                );
                this.selectedTodoList = updatedList;

                this.cdr.detectChanges();

            }, // Success
            error => { // Rollback
                if (this.selectedTodoList === undefined) { return; }

                this.selectedTodoList.tasks.splice(taskToDeleteIndex, 0, ...taskToDelete);

                console.error(error);

                this.cdr.detectChanges();
            });
    }
}
