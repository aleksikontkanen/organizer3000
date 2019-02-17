export const environment = {
    production: true,
    server: {
        baseUrl: window.location.href + '/api/',
        endpoints: {
            todolist: 'todolist',
            task: 'task'
        }
    }
};
