import { state, setMode } from './state.js';
import { renderTime, renderModes, renderView, renderControls } from './render.js';
import { startTimer, resetTimer } from './timer.js';

export const initPomodoro = () => {
    const page = document.querySelector('.timer-page');
    if (!page) return;

    /* -------- Mode switch -------- */
    page.querySelectorAll('.mode').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.toLowerCase();
            if (text.includes('short')) setMode('short');
            else if (text.includes('long')) setMode('long');
            else setMode('pomodoro');

            renderModes();
            renderTime();
            renderControls();
        });
    });

    /* -------- Controls -------- */
    page.querySelector('.primary')?.addEventListener('click', startTimer);
    page.querySelector('.btn:not(.primary)')?.addEventListener('click', resetTimer);

    /* -------- +/- buttons -------- */
    page.querySelector('.time-adjust.left')?.addEventListener('click', () => {
        if (state.running || state.digital) return;
        state.remaining = Math.max(60, state.remaining - 60);
        state.duration = state.remaining;
        renderTime();
    });

    page.querySelector('.time-adjust.right')?.addEventListener('click', () => {
        if (state.running || state.digital) return;
        state.remaining += 60;
        state.duration = state.remaining;
        renderTime();
    });

    /* -------- Keyboard input -------- */
    const timeEl = page.querySelector('.clock .time');
    timeEl.setAttribute('contenteditable', true);

    timeEl.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        e.preventDefault();

        const raw = timeEl.textContent.trim();
        const [m, s = 0] = raw.split(':').map(n => parseInt(n, 10));
        if (!Number.isFinite(m) || m <= 0) {
            renderTime(); // restore
            timeEl.blur();
            return;
        }
        const seconds = (m * 60) + (Number.isFinite(s) ? s : 0);
        state.duration = seconds;
        state.remaining = seconds;

        renderTime();
        renderControls();
        timeEl.blur();
    });

    /* -------- View toggle -------- */
    let digitalInterval = null;

    page.querySelector('.timer-view-toggle input')
        ?.addEventListener('change', e => {
            const isClock = e.target.checked;
            state.digital = isClock;
            state.view = isClock ? 'clock' : 'timer';

            // if (state.digital) {
            //     if (digitalInterval) clearInterval(digitalInterval);
            //     digitalInterval = setInterval(renderTime, 1000);
            // } else {
            //     clearInterval(digitalInterval);
            //     digitalInterval = null;
            // }

            renderView();
        });


    renderTime();
    renderModes();
    renderControls();
    renderView();
};