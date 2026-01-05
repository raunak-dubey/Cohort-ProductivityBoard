import { setTasks } from './state.js';

const TODO_KEY = 'todo_tasks';

export const loadTasks = () => {
    setTasks(JSON.parse(localStorage.getItem(TODO_KEY)) || []);
};

export const saveTasks = (tasks) => {
    localStorage.setItem(TODO_KEY, JSON.stringify(tasks));
};