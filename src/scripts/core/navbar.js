// ? ========================== Navbar ======================== //
export const initNavbar = () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        nav.classList.toggle('nav-hidden', currentScrollY > lastScrollY && currentScrollY > 100);
        lastScrollY = currentScrollY;
    });
};