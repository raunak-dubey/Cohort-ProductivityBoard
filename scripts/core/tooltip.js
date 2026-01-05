// ? ========================== Tooltip ======================== //
export const showTooltip = (message, duration = 1500) => {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;

    tooltip.textContent = message;
    tooltip.hidden = false;

    requestAnimationFrame(() => {
        tooltip.classList.add('show');
    });

    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => (tooltip.hidden = true), 200);
    }, duration);
};