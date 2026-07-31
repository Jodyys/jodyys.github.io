// ===========================
// TYPING EFFECT
// ===========================
const typingTexts = ['DevOps Engineer', 'Cloud Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(typeEffect, speed);
}

// Start typing after a short delay
setTimeout(typeEffect, 800);

// ===========================
// NAVBAR SCROLL BEHAVIOR
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation for elements that appear together
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
