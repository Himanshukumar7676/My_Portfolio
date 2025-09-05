document.getElementById('mobile-menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let smokeTimeout;

function createSmoke(x, y) {
    const smokeParticle = document.createElement('div');
    smokeParticle.className = 'smoke-particle';
    const size = Math.random() * 10 + 5;
    smokeParticle.style.width = `${size}px`;
    smokeParticle.style.height = `${size}px`;
    smokeParticle.style.left = `${x + (Math.random() - 0.5) * 20}px`;
    smokeParticle.style.top = `${y + (Math.random() - 0.5) * 20}px`;
    document.body.appendChild(smokeParticle);
    setTimeout(() => smokeParticle.remove(), 1000);
}

window.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorOutline.style.left = e.clientX + 'px';
    cursorOutline.style.top = e.clientY + 'px';

    if (!smokeTimeout) {
        createSmoke(e.clientX, e.clientY);
        smokeTimeout = setTimeout(() => { smokeTimeout = null; }, 50);
    }
});

document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseover', () => {
        cursorDot.classList.add('hovered');
        cursorOutline.classList.add('hovered');
    });
    el.addEventListener('mouseout', () => {
        cursorDot.classList.remove('hovered');
        cursorOutline.classList.remove('hovered');
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-modal-target]').forEach(card => {
    card.addEventListener('click', () => {
        const target = document.getElementById(card.dataset.modalTarget);
        target.classList.add('active');
    });
});
document.querySelectorAll('.modal-close, .modal').forEach(el => {
    el.addEventListener('click', (e) => {
        if (e.target === el) {
            el.closest('.modal').classList.remove('active');
        }
    });
});

particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#64ffda" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#64ffda", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
});