import { state } from './state.js';

const pad = n => String(n).padStart(2, '0');

const getDigitalTime = () => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';

    h = h % 12 || 12;

    return `${pad(h)}:${pad(m)} ${ampm}`;
};

export const renderTime = () => {
    const el = document.querySelector('.clock .time');
    if (!el) return;

    if (state.view === 'clock') {
        el.textContent = getDigitalTime();
        return;
    }
    // TIMER MODE
    const m = Math.floor(state.remaining / 60);
    const s = state.remaining % 60;
    el.textContent = `${pad(m)}:${pad(s)}`;
};

export const renderModes = () => {
    document.querySelectorAll('.mode').forEach(btn => {
        btn.classList.toggle(
            'active',
            btn.textContent.toLowerCase().includes(state.mode)
        );
    });
};

export const renderView = () => {
    const page = document.querySelector('.timer-page');
    if (!page) return;

    page.classList.toggle('digital-view', state.view === 'clock');
    renderTime();
};

export const renderControls = () => {
    const startBtn = document.querySelector('.timer-controls .primary');
    const resetBtn = document.querySelector('.timer-controls .btn:not(.primary)')

    if (!startBtn || !resetBtn) return;

    if (state.running) {
        startBtn.innerHTML = '<i class="ri-pause-line"></i> Pause';
        resetBtn.hidden = false;
    } else {
        startBtn.innerHTML = '<i class="ri-play-line"></i> Start';
        resetBtn.hidden = true;
    }
};