import { state } from './state.js';
import { renderTime, renderControls } from './render.js';

export const startTimer = () => {
    if (state.running) {
        pauseTimer();
        renderControls();
        return;
    }

      if (state.remaining <= 0) return;
    state.running = true;
    renderControls();
    state.intervalId = setInterval(() => {
        if (state.remaining <= 0) {
            pauseTimer();
            renderControls();
            return;
        }
        state.remaining--;
        renderTime();
    }, 1000);
};

const pauseTimer = () => {
    state.running = false;
    clearInterval(state.intervalId);
    state.intervalId = null;
};

export const resetTimer = () => {
    pauseTimer();
    state.remaining = state.duration;
    renderTime();
    renderControls();
};