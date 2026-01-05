export const MODES = {
    pomodoro: 50,
    short: 10,
    long: 25
};

export const state = {
    mode: 'pomodoro',
    duration: MODES.pomodoro * 60,
    remaining: MODES.pomodoro * 60,
    running: false,
    digital: false,
    intervalId: null,
    view: 'timer'
};


export const setMode = (mode) => {
    state.mode = mode;
    state.duration = MODES[mode] * 60;
    state.remaining = state.duration;
    state.running = false;
};
