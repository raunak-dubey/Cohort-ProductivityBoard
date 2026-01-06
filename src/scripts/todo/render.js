import { tasks } from './state.js';

export const renderTasks = () => {
    const list = document.querySelector('.task-list');
    const empty = document.querySelector('.task-list-empty');
    if (!list || !empty) return;

    list.innerHTML = '';

    if (!tasks.length) {
        empty.hidden = false;
        return;
    }

    empty.hidden = true;

    tasks.forEach(t => {
        list.insertAdjacentHTML(
            'beforeend',
            `<li data-id="${t.id}" class="${t.completed ? 'completed' : ''}">
                <input type="checkbox" ${t.completed ? 'checked' : ''}>
                <span>${t.title}</span>
            </li>`
        );
    });
};