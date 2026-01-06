let apiKey = import.meta.env.VITE_WEATHER_API_KEY;
let weatherInitialized = false;

// ? ============== Time and Date ============== //
const timeEl = document.querySelector('.now-time');
const dayEl = document.querySelector('.now-date .day');
const dateEl = document.querySelector('.now-date .date');
const yearEl = document.querySelector('.now-date .year');

const updateTime = () => {
    const now = new Date();

    // ---- Time (12-hour) ----
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    hours = hours % 12 || 12;
    timeEl.textContent = `${hours}:${minutes}`;

    // ---- Date ----
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long'
    });
    const year = now.getFullYear();

    dayEl.textContent = day;
    dateEl.textContent = date;
    yearEl.textContent = year;
};

export const initTime = () => {
    updateTime();
    setInterval(updateTime, 1000);
};
// ? ============== Weather API ============== //

export const initWeather = () => {
    const tempEl = document.querySelector('.weather .temp');
    const cityEl = document.querySelector('.weather .city');
    const iconEl = document.querySelector('.weather-icon');

    const requestWeather = () => {
        if (weatherInitialized) return;
        weatherInitialized = true;

        if (!navigator.geolocation) {
            cityEl.textContent = 'Location unavailable';
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const res = await fetch(
                        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${coords.latitude},${coords.longitude}`
                    );

                    if (!res.ok) throw new Error('Weather fetch failed');

                    const data = await res.json();
                    const { temp_c, condition } = data.current;

                    const locationName = data.location.name;

                    tempEl.textContent = `${Math.round(temp_c)}°`;
                    cityEl.textContent = locationName;

                    const text = condition.text.toLowerCase();

                    iconEl.className = text.includes('sun')
                        ? 'ri-sun-line weather-icon'
                        : text.includes('cloud')
                            ? 'ri-cloudy-line weather-icon'
                            : text.includes('rain')
                                ? 'ri-rainy-line weather-icon'
                                : 'ri-cloud-line weather-icon';
                } catch (err) {
                    tempEl.textContent = '--°';
                    cityEl.textContent = 'Weather error';
                    iconEl.className = 'ri-error-warning-line weather-icon';
                }
            },
            () => {
                cityEl.textContent = 'Permission denied';
                tempEl.textContent = '--°';
                iconEl.className = 'ri-error-warning-line weather-icon';
            }
        );
    };

    const triggerEvents = ['click', 'keydown', 'mousemove', 'touchstart'];

    triggerEvents.forEach(event => {
        window.addEventListener(event, requestWeather, { once: true });
    });
}