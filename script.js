let tasks = [];
const STORAGE_KEY = 'todo_tasks';

// ? ========================== Navbar ======================== //
const Navbar = () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling Down - Hide Nav
            nav.classList.add("nav-hidden");
        } else {
            // Scrolling Up - Show Nav
            nav.classList.remove("nav-hidden");
        }

        lastScrollY = currentScrollY;
    });
};

// ? ========================== Bento Page ======================== //
const bentoPage = () => {
    const triggers = document.querySelectorAll('.elem')
    const pages = document.querySelectorAll('.bento-pages')

    const openPage = (target) => {
        pages.forEach(page => {
            const isActive = page.dataset.page === target;
            page.classList.toggle('active', isActive);

            if (isActive) {
                page.focus();
            }
        });
        if (target === 'todo') {
            loadTasks();
            renderTasks();
        }

    };

    document.addEventListener('click', (e) => {
        const backBtn = e.target.closest('.back');
        if (!backBtn) return;

        const closePage = backBtn.closest('.bento-pages');
        if (!closePage) return;

        closePage.classList.remove('active');
    });


    triggers.forEach(trigger => {
        // Mouse click
        trigger.addEventListener('click', () => {
            openPage(trigger.dataset.page);
        });

        // Keyboard support
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // prevent page scroll on Space
                openPage(trigger.dataset.page);
            }
        });
    })
};

// ? ========================== Todo Page ======================== //

const initTodoTasks = () => {
    const taskList = document.querySelector('.task-list');
    const emptyState = document.querySelector('.task-empty');
    const panel = document.querySelector('.task-panel');

    const titleInput = document.querySelector('.task-title');
    const descInput = document.querySelector('.task-desc');
    const prioritySelect = document.querySelector('.task-list-select');
    const dueInput = document.querySelector('.task-due');
    const tagList = document.querySelector('.tag-list');

    if (!taskList) return;

    taskList.addEventListener('click', (e) => {
        const checkbox = e.target.closest('input[type="checkbox"]');
        const item = e.target.closest('li');
        if (!item) return;

        if (checkbox) {
            const id = item.dataset.id;
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            task.completed = checkbox.checked;
            item.classList.toggle('completed', checkbox.checked);
            saveTasks();
            return;
        }

        // Remove previous selection
        taskList.querySelectorAll('li').forEach(li =>
            li.classList.remove('active')
        );

        // Select current
        item.classList.add('active');

        // Show panel
        emptyState.style.display = 'none';
        panel.style.display = 'flex';

        // Load data into panel
        const id = item.dataset.id;
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        titleInput.value = task.title;
        descInput.value = task.desc;
        prioritySelect.value = task.priority;
        dueInput.value = task.due;


        // Render tags
        tagList.querySelectorAll('.tag').forEach(t => t.remove());
        task.tags.forEach(tag => {
            tagList.insertAdjacentHTML('beforeend', `<span class="tag">${tag}</span>`)
        });
    });
};

const loadTasks = () => {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

const saveTasks = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

const renderTasks = () => {
    const list = document.querySelector('.task-list');
    const emptyMsg = document.querySelector('.task-list-empty');
    if (!list || !emptyMsg) return;

    list.innerHTML = '';

    if (tasks.length === 0) {
        emptyMsg.hidden = false;
        return;
    }
    emptyMsg.hidden = true;

    tasks.forEach(t => {
        list.insertAdjacentHTML(
            'beforeend',
            `<li data-id="${t.id}" tabindex="0" class="${t.completed ? 'completed' : ''}">
                <input type="checkbox" ${t.completed ? 'checked' : ''}>
                <span>${t.title}</span>
            </li>`
        );
    });
};

const addTask = () => {
    const taskInput = document.querySelector('.add-task input');
    const taskList = document.querySelector('.task-list');

    if (!taskInput || !taskList) return;

    taskInput.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();
        const title = taskInput.value.trim();
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

        saveTasks();
        renderTasks();

        // Clear input
        taskInput.value = '';
    });
};

const initTags = () => {
    const tagBtn = document.querySelector('.tags .btn');
    const tagList = document.querySelector('.tag-list');

    if (!tagBtn || !tagList) return;

    tagBtn.addEventListener('click', () => {
        const input = prompt('Enter tag name (comma separated for multiple):');
        if (!input) return;

        const tags = input
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        tags.forEach(tagName => {
            // prevent duplicates
            const exists = [...tagList.querySelectorAll('.tag')]
                .some(tag => tag.textContent === tagName);
            if (exists) return;

            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tagName;

            tagList.insertBefore(span, tagBtn);
        });
    });
};

const initSaveTask = () => {
    const saveBtn = document.querySelector('.task-actions .save');

    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
        const activeTask = document.querySelector('.task-list li.active');
        if (!activeTask) return;

        const activeId = activeTask.dataset.id;
        const task = tasks.find(t => t.id == activeId);
        if (!task) return;

        task.title = document.querySelector('.task-title').value.trim();
        task.desc = document.querySelector('.task-desc').value;
        task.priority = document.querySelector('.task-list-select').value;
        task.due = document.querySelector('.task-due').value;
        task.tags = [...document.querySelectorAll('.tag')].map(t => t.textContent);
        saveTasks();
        renderTasks();

        // Optional feedback
        const restored = document.querySelector(
            `.task-list li[data-id="${activeId}"]`
        );
        if (restored) restored.classList.add('active');

        saveBtn.textContent = 'Saved';
        setTimeout(() => saveBtn.textContent = 'Save changes', 1000);
    });
};

const initDeleteTask = () => {
    const deleteBtn = document.querySelector('.task-actions .delete');
    const panel = document.querySelector('.task-panel');
    const emptyState = document.querySelector('.task-empty');

    if (!deleteBtn) return;

    deleteBtn.addEventListener('click', () => {
        const activeItem = document.querySelector('.task-list li.active');
        if (!activeItem) return;

        const id = activeItem.dataset.id;

        // remove from state
        tasks = tasks.filter(t => t.id !== id);

        saveTasks();
        renderTasks();

        // reset panel
        panel.style.display = 'none';
        emptyState.style.display = 'block';
    });
}

Navbar();
bentoPage();
initTodoTasks();
addTask();
initTags();
initSaveTask();
initDeleteTask();