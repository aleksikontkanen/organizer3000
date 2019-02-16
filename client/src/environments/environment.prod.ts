export const environment = {
    production: true,
    server: {
        baseUrl: window.location.host + '/api/',
        endpoints: {
            todolist: 'todolist',
            task: 'task'
        }
    }
};
