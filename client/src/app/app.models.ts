import moment from 'moment-es6';

export class Todolist {
    public readonly id?: number;
    public name: string;
    public tasks: Array<Task>;

    constructor(options: {
        id?: number,
        name: string,
        tasks?: Array<Task>
    }) {
        this.id = options.id;
        this.name = options.name;
        this.tasks = options.tasks || [];
    }

    public static create(dto: ITodolistDto): Todolist {
        return new Todolist({
            id: dto.id,
            name: dto.name,
            tasks: dto.tasks.map(t => Task.create(t))
        });
    }

    public createDto(): ITodolistDto {
        return {
            id: this.id,
            name: this.name,
            tasks: this.tasks.map(t => t.createDto())
        };
    }

    public clone(): Todolist {
        return Todolist.create(this.createDto());
    }
}

export interface ITodolistDto {
    id?: number;
    name: string;
    tasks: Array<ITaskDto>;
}


export class Task {
    public readonly id?: number;
    public name: string;
    public description?: string;
    public priority: TaskPriority;
    public state: TaskState;
    public startTime: moment.Moment;
    public completionTime?: moment.Moment;
    public expirationTime?: moment.Moment;

    constructor(options: {
        id?: number,
        name: string,
        description?: string,
        priority: TaskPriority,
        state: TaskState,
        startTime?: Iso8601,
        completionTime?: Iso8601,
        expirationTime?: Iso8601
    }) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.priority = options.priority;
        this.state = options.state;
        this.startTime = options.startTime ? moment(options.startTime) : moment();
        this.completionTime = options.completionTime ? moment(options.completionTime) : undefined;
        this.expirationTime = options.expirationTime ? moment(options.expirationTime) : undefined;
    }

    public static create(dto: ITaskDto): Task {
        return new Task({
            id: dto.id,
            name: dto.name,
            description: dto.description,
            priority: dto.priority,
            state: dto.state,
            startTime: dto.startTime,
            completionTime: dto.completionTime,
            expirationTime: dto.expirationTime
        });
    }

    public createDto(): ITaskDto {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            priority: this.priority,
            state: this.state,
            startTime: this.startTime.toISOString(),
            completionTime: this.completionTime ? this.completionTime.toISOString() : undefined,
            expirationTime: this.expirationTime ? this.expirationTime.toISOString() : undefined
        };
    }

    public clone(): Task {
        return Task.create(this.createDto());
    }
}

export interface ITaskDto {
    id?: number;
    name: string;
    description?: string;
    priority: TaskPriority;
    state: TaskState;
    startTime: Iso8601;
    completionTime?: Iso8601;
    expirationTime?: Iso8601;
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export enum TaskState {
    PLANNED = 'PLANNED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}

export type Iso8601 = string;
