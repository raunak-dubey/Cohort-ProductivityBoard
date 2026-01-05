import { tasks } from './state.js';
import { saveTasks, loadTasks as load } from './storage.js';
import { renderTasks } from './render.js';

let activeTaskId = null;

export const loadTasks = load;
export { renderTasks };

export const initTodo = () => {
    const list = document.querySelector('.task-list');
    if (!list) return;

    list.addEventListener('click', e => {
        const li = e.target.closest('li');
        const checkbox = e.target.closest('input[type="checkbox"]');
        if (!li) return;

        const task = tasks.find(t => t.id === li.dataset.id);
        if (!task) return;

        if (checkbox) {
            task.completed = checkbox.checked;
            saveTasks(tasks);
            renderTasks();
            return;
        }

         list.querySelectorAll('li').forEach(li =>
            li.classList.remove('active')
        );
        li.classList.add('active');

        activeTaskId = task.id;
        openPanel(task);
    });
};

export const addTask = () => {
    const input = document.querySelector('.add-task input');
    if (!input) return;

    input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const title = input.value.trim();
        if (!title) return;

        tasks.push({
            id: crypto.randomUUID(),
            title,
            completed: false,
            desc: '',
            priority: 'High',
            due: '',
            tags: []
        });

        saveTasks(tasks);
        renderTasks();
        input.value = '';
    });
};

const openPanel = task => {
    document.querySelector('.task-empty').style.display = 'none';
    const panel = document.querySelector('.task-panel');
    panel.style.display = 'flex';

    panel.querySelector('.task-title').value = task.title;
    panel.querySelector('.task-desc').value = task.desc;
    panel.querySelector('.task-due').value = task.due;
    panel.querySelector('.task-list-select').value = task.priority;

    const tagList = panel.querySelector('.tag-list');
    tagList.querySelectorAll('.tag').forEach(t => t.remove());

    task.tags.forEach(tag => {
        tagList.insertAdjacentHTML(
            'beforeend',
            `<span class="tag">${tag}</span>`
        );
    });
};

export const initTags = () => {
    const tagBtn = document.querySelector('.tags .btn');
    const tagList = document.querySelector('.tag-list');
    if (!tagBtn || !tagList) return;

    tagBtn.addEventListener('click', () => {
        const input = prompt('Enter tags (comma separated)');
        if (!input) return;

        input
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
            .forEach(tag => {
            const exists = [...tagList.querySelectorAll('.tag')]
                .some(t => t.textContent === tag);
            if (exists) return;

            tagList.insertAdjacentHTML(
                'beforeend',
                `<span class="tag">${tag}</span>`
            );
        });
    });
};

export const initSaveTask = () => {
    const saveBtn = document.querySelector('.task-actions .save');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
        if (!activeTaskId) return;

        const panel = document.querySelector('.task-panel');
        const task = tasks.find(t => t.id === activeTaskId);
        if (!task) return;

        task.title = panel.querySelector('.task-title').value.trim();
        task.desc = panel.querySelector('.task-desc').value;
        task.due = panel.querySelector('.task-due').value;
        task.priority = panel.querySelector('.task-list-select').value;

        // tags
        task.tags = [...panel.querySelectorAll('.tag')]
            .map(t => t.textContent);

        saveTasks(tasks);
        renderTasks();

        saveBtn.textContent = 'Saved';
        setTimeout(() => (saveBtn.textContent = 'Save changes'), 1000);

        // keep selection
        const li = document.querySelector(
            `.task-list li[data-id="${activeTaskId}"]`
        );
        if (li) li.classList.add('active');
    });
};

export const initDeleteTask = () => {
    const deleteBtn = document.querySelector('.task-actions .delete');
    if (!deleteBtn) return;

    deleteBtn.addEventListener('click', () => {
        if (!activeTaskId) return;

        const index = tasks.findIndex(t => t.id === activeTaskId);
        if (index === -1) return;

        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();

        activeTaskId = null;

        document.querySelector('.task-panel').style.display = 'none';
        document.querySelector('.task-empty').style.display = 'block';
    });
};