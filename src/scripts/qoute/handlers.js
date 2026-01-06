import { QUOTE_KEY, today } from './storage.js';
import { renderQuote } from './render.js';
import { showTooltip } from '../core/tooltip.js';

const setQuoteLoading = (isLoading) => {
    const card = document.querySelector('.quote-card');
    if (!card) return;

    card.classList.toggle('loading', isLoading);

    if (isLoading) {
        document.querySelector('.quote-text').textContent =
            'Fetching a new quote';
        document.querySelector('.quote-author').textContent = '';
    }
};

export const loadQuote = async (force = false) => {
    const stored = JSON.parse(localStorage.getItem(QUOTE_KEY));
    if (stored && stored.date === today() && !force) {
        renderQuote(stored);
        return;
    }
    setQuoteLoading(true);

    try {
        const res = await fetch('https://dummyjson.com/quotes/random');
        const data = await res.json();

        const quote = {
            quote: data.quote,
            author: data.author,
            date: today(),
            liked: false
        };

        localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
        renderQuote(quote);
    } catch (e) {
        document.querySelector('.quote-text').textContent =
            'Failed to fetch quote. Please try again.';
        document.querySelector('.quote-author').textContent = '';
    } finally {
        setQuoteLoading(false);
    }
};

export const initQuoteActions = () => {
    document.querySelector('[aria-label="Refresh quote"]')
        ?.addEventListener('click', () => loadQuote(true));

    document.querySelector('[aria-label="Like quote"]')
        ?.addEventListener('click', () => {
            const q = JSON.parse(localStorage.getItem(QUOTE_KEY));
            if (!q) return;
            q.liked = !q.liked;
            localStorage.setItem(QUOTE_KEY, JSON.stringify(q));
            renderQuote(q);
            showTooltip(q.liked ? 'Added to favorites' : 'Removed from favorites');
        });

    document.querySelector('[aria-label="Copy quote"]')
        ?.addEventListener('click', () => {
            const text = document.querySelector('.quote-text')?.textContent;
            const author = document.querySelector('.quote-author')?.textContent;
            navigator.clipboard.writeText(`${text} ${author}`);
            showTooltip('Quote copied');
        });
};