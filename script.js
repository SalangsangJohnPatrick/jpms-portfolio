// CURSOR
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
}
animCursor();

// PRELOADER
const counter = document.getElementById('preloader-counter');
const line = document.getElementById('preloader-line');
const loader = document.getElementById('preloader');
let count = 0;
line.style.transform = 'scaleX(1)';
const interval = setInterval(() => {
    count += Math.floor(Math.random() * 8) + 2;
    if (count >= 100) { count = 100; clearInterval(interval); }
    counter.textContent = count;
    if (count === 100) {
        setTimeout(() => { loader.classList.add('done'); }, 400);
    }
}, 60);

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => observer.observe(el));

// PARALLAX HERO BG TEXT
const bgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (bgText) bgText.style.transform = `translate(-50%, calc(-50% + ${y * 0.3}px))`;
});

// THEME TOGGLE
const html = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    // Brief flash overlay on switch
    const flash = document.createElement('div');
    const flashBg = next === 'light' ? 'rgba(245,240,232,0.3)' : 'rgba(6,6,6,0.3)';
    flash.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:8500;background:' + flashBg + ';opacity:1;transition:opacity 0.35s ease;';
    document.body.appendChild(flash);
    requestAnimationFrame(() => { flash.style.opacity = '0'; });
    setTimeout(() => flash.remove(), 400);
});