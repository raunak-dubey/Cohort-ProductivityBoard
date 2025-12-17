const bento = document.querySelectorAll('.elem')
const bentoPages = document.querySelectorAll('.bento-pages')

bento.forEach(bentoElem => {
    bentoElem.addEventListener('click', () => {
        bentoPages[bentoElem.id].style.display = "block";
    })
})

// ? ========================== Navbar ======================== //
const nav = document.querySelector("nav");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling Down - Hide Nav
        nav.classList.add("nav-hidden");
    } else {
        // Scrolling Up - Show Nav
        nav.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
});