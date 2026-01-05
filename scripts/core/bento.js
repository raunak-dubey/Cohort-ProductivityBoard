// ? ========================== Bento Page ======================== //
import { loadTasks, renderTasks } from '../todo/handlers.js';
import { loadQuote } from '../qoute/handlers.js';

export const initBento = () => {
    const triggers = document.querySelectorAll('.elem')
    const pages = document.querySelectorAll('.bento-pages')

    const openPage = (target) => {
        pages.forEach(page => {
            const isActive = page.dataset.page === target;
            page.classList.toggle('active', isActive);
            if (isActive) page.focus();
        });

        if (target === 'todo') {
            loadTasks();
            renderTasks();
        }
        if (target === 'quote') {
            loadQuote();
        }
    };

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
    document.addEventListener('click', (e) => {
        const backBtn = e.target.closest('.back');
        if (backBtn) backBtn.closest('.bento-pages')?.classList.remove('active');
    });
};