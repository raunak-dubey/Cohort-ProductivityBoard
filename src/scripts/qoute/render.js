export const renderQuote = (data) => {
    if (!data) return;
    const { quote, author, liked } = data;

    document.querySelector('.quote-text').textContent = `“${quote}”`;
    document.querySelector('.quote-author').textContent = `— ${author}`;

    const icon = document.querySelector('[aria-label="Like quote"] i');
    icon.className = liked
        ? 'ri-heart-fill'
        : 'ri-heart-line';
};