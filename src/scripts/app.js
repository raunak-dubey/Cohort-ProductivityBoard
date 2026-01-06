import { initNavbar } from './core/navbar.js';
import { initBento } from './core/bento.js';
import { initTodo, addTask, renderTasks, initSaveTask, initDeleteTask, initTags } from './todo/handlers.js';
import { initQuoteActions } from './qoute/handlers.js';
import { initPomodoro } from './pomodoro/handlers.js';
import { initTime, initWeather } from './core/banner.js';

initNavbar();
initBento();

initTime();
initWeather();

initTodo();
addTask();
initSaveTask();
initDeleteTask();
initTags();
renderTasks();

initQuoteActions();

initPomodoro();