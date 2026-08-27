// ===========================
// NAVIGATION TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// ===========================
// TERMINAL LOG SIMULATION
// ===========================
const terminalLogs = document.getElementById('terminalLogs');

const logs = [
    '<span class="mac-prompt">$</span><span class="mac-cmd">cat /etc/profile</span>',
    '<br>',
    '<span class="mac-key">name:</span><span class="mac-val">Devin Jodiyudanto</span>',
    '<br>',
    '<span class="mac-key">role:</span><span class="mac-val" id="role-text"></span><span id="role-cursor" style="color: #c9d1d9; opacity: 1;">|</span>',
    '<br>',
    '<span class="mac-key">location:</span><span class="mac-val">Bekasi, Indonesia</span>',
    '<br>',
    '<span class="mac-key">status:</span><span class="mac-status-pill">available</span>'
];

let logIndex = 0;

function appendLog() {
    if (logIndex >= logs.length) {
        startRoleAnimation();
        return; 
    }

    const logEl = document.createElement('div');
    if (logs[logIndex] === '<br>') {
        logEl.style.height = '14px'; 
    } else {
        logEl.innerHTML = logs[logIndex];
    }
    
    terminalLogs.appendChild(logEl);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;

    logIndex++;
    
    const delay = Math.random() * 300 + 200;
    setTimeout(appendLog, delay);
}

const roles = ["DevOps Engineer", "Cloud Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startRoleAnimation() {
    const roleEl = document.getElementById("role-text");
    const cursorEl = document.getElementById("role-cursor");
    
    // Blinking cursor
    setInterval(() => {
        cursorEl.style.opacity = cursorEl.style.opacity === "0" ? "1" : "0";
    }, 500);

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing new word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Clear initial HTML logs and start
terminalLogs.innerHTML = '';
setTimeout(appendLog, 800);

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));
