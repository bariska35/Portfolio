const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
        document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menüyü aç');
        document.body.classList.remove('menu-open');
    }));
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('active'));
}

const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(anchor => anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`));
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
}
