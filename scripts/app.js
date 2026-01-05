import { initNavbar } from './core/navbar.js';
import { initBento } from './core/bento.js';
import { initTodo, addTask, renderTasks, initSaveTask, initDeleteTask, initTags } from './todo/handlers.js';
import { initQuoteActions } from './qoute/handlers.js';

initNavbar();
initBento();

initTodo();
addTask();
initSaveTask();
initDeleteTask();
initTags();
renderTasks();

initQuoteActions();