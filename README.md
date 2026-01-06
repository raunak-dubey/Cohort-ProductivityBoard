# Productivity Board

A modern, distraction-free **Productivity Board** built with **Vanilla JavaScript + Vite**, designed to bring essential daily tools—**time, weather, tasks, pomodoro timer, and qoutes**—into a single clean dashboard.

This project focuses on **performance, accessibility, and user experience**, following industry best practices and optimized using Lighthouse.

🔗 **Live Demo (Vercel):** [https://cohort-productivity-board.vercel.app/](https://cohort-productivity-board.vercel.app/)

---

## ✨ Features

- **Live Time & Date** — Auto-updating, locale-aware
- **Weather by Location** — Uses browser geolocation (no manual city input)
- **Task / Todo System** — Add, delete, tag, and persist tasks
- **Pomodoro Timer** — Built-in focus workflow
- **Motivational Quotes** — Dynamic quote fetching
- **Minimal UI** — Clean, modern, and distraction-free design
- **Fast & Lightweight** — Built with Vanilla JS + Vite

---

## 🚀 Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom styling, responsive layout
- **JavaScript (ES Modules)** — Modular, maintainable code
- **Vite** — Development & build tool
- **WeatherAPI** — Real-time weather data
- **GitHub Pages** — Deployment

---

## 📦 Project Structure

```txt
Cohort-ProductivityBoard/
├─ src/
│ ├─ assets/ # Images, icons, fonts
│ ├─ scripts/
│ │ ├─ app.js # global initialization
| | |── core/
│ | │ ├─ navbar.js
│ | │ ├─ bento.js
│ │ │ ├─ banner.js # Time & weather logic
│ │ │ └─ navbar.js # Navbar interactions
│ │ ├─ todo/ # To-Do feature (handlers, state)
│ │ ├─ pomodoro/ # Pomodoro timer logic
│ │ └─ quote/ # Quote fetching & UI actions
│ └─ style.css # Global styles
├─ index.html
├─ .env.example
├─ package.json
└─ README.md
```

---

## 🔐 Environment Variables

This project uses **Vite environment variables**.

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_weatherapi_key_here
```

> ⚠️ **Note:**
>
> - Variables must start with `VITE_`
> - `.env` should **not** be committed to GitHub

---

## 🌍 Weather & Location Handling

- You need your api key to use weather feature
- Uses `navigator.geolocation` **after user interaction** (to avoid UX & Lighthouse issues)
- Falls back gracefully if permission is denied
- No hardcoded city — fully dynamic

---

## ♿ Accessibility

- Semantic HTML elements
- Proper button labels and roles
- ARIA used only where appropriate
- Tested with Lighthouse Accessibility audits

---

## ⚡ Performance

- Optimized images (`.webp`)
- Font loading with `font-display: swap`
- Minimal render-blocking resources
- Lighthouse Performance Score: **99**

---

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

---

## 📌 Future Improvements

- Dark / Light theme toggle
- Offline support (Service Workers)
- Better mobile-first enhancements
- Data persistence via IndexedDB

---

## 👤 Author

**Raunak Dubey**
Aspiring Web Developer | Productivity Tools Enthusiast

- GitHub: [https://github.com/raunak-dubey](https://github.com/raunak-dubey)

---

## ⭐ Feedback

If you find this project useful or have suggestions, feel free to open an issue or star the repository.

---

> This project is built with a strong focus on **clarity, performance, and real-world usability**—not just features.
