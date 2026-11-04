// ==========================================================================
// 0. DARK / LIGHT THEME SWITCHER (PERSISTENT)
// ==========================================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

function syncThemeUI() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (themeIcon) {
        themeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    if (themeLabel) {
        themeLabel.textContent = isLight ? 'DARK' : 'LIGHT';
    }
}

function toggleTheme() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('portfolio-theme', 'light');
    }
    syncThemeUI();
}

syncThemeUI();
themeToggle?.addEventListener('click', toggleTheme);

// ==========================================================================
// 1. BILINGUAL LANGUAGE TOGGLE (EN / ID — PERSISTENT)
// ==========================================================================
const langToggle = document.getElementById('langToggle');
const langLabel = document.getElementById('langLabel');

const enTextCache = new Map();
const enHtmlCache = new Map();

document.querySelectorAll('[data-i18n]').forEach(el => {
    enTextCache.set(el, el.textContent);
});
document.querySelectorAll('[data-i18n-html]').forEach(el => {
    enHtmlCache.set(el, el.innerHTML);
});

const i18nID = {
    text: {
        nav_about: 'TENTANG',
        nav_stack: 'STACK',
        nav_exp: 'PENGALAMAN',
        nav_projects: 'PROYEK',
        nav_edu: 'EDUKASI',
        nav_playbook: 'PLAYBOOK',
        nav_connect: 'KONTAK',
        hero_h1_1: 'MEMBANGUN &',
        hero_h1_2: 'MENGOTOMASI',
        hero_h1_3: 'INFRASTRUKTUR CLOUD.',
        btn_projects: 'LIHAT PROYEK',
        btn_cv: 'UNDUH CV',
        hero_open: 'UTC+7 // SIAP BEKERJA',
        sec_about_title: '001 // TENTANG_SAYA',
        sec_about_sub: '// ARSITEKTUR, OTOMASI & KEANDALAN SISTEM',
        about_tag: 'RINGKASAN_PROFIL',
        about_status: '● TERBUKA UNTUK PELUANG KARIR',
        sec_stack_sub: '// MATRIKS INFRASTRUKTUR CLOUD & DEVOPS',
        matrix_badge: 'MATRIKS KEAHLIAN TEKNIS',
        matrix_heading: 'Stack Lengkap Cloud & DevOps',
        tab_all: 'Semua Stack',
        sec_exp_sub: '// OPERASIONAL & WORKLOAD PRODUCTION',
        exp1_date: 'JUL 2026 - SEKARANG',
        exp2_date: 'AGU 2025 - JUL 2026',
        sec_prj_title: '004 // PROYEK_PRIBADI',
        sec_prj_sub: '// LAB PIPELINE CI/CD, DEVSECOPS & K8S',
        prj1_sub: 'Pipeline CI DevSecOps Otomatis Berbasis Jenkins',
        prj2_sub: 'Continuous Delivery K3s & Observability End-to-End',
        sec_edu_sub: '// PENDIDIKAN, BOOTCAMP & SERTIFIKASI RESMI',
        edu_tag_deg: 'PENDIDIKAN',
        edu_deg1: 'Sarjana (S1), Sistem Informasi',
        edu_date1: 'Jakarta, Indonesia | AGU 2026 - SEKARANG',
        edu_deg2: 'Diploma (D3), Sistem Informasi',
        edu_date2: 'Bekasi, Indonesia | AGU 2018 - NOV 2021',
        edu_boot_title: 'Pelatihan Intensif',
        edu_cert_title: 'Sertifikasi',
        sec_play_sub: '// STANDAR OPERASIONAL & OTOMASI DI PRODUCTION',
        play1_title: 'Triage K8s & Operasional Zero-Downtime',
        play2_title: 'Pipeline CI/CD Shift-Left DevSecOps',
        play3_title: 'Telemetri Server, WAF & Backup DR',
        footer_status: 'STATUS: TERBUKA UNTUK POSISI DEVOPS & CLOUD ENGINEER'
    },
    html: {
        hero_desc: 'Halo, saya <strong>Devin Jodiyudanto</strong> — membangun infrastruktur cloud yang andal, mengotomasi deployment CI/CD, dan menjaga sistem production tetap stabil.',
        about_p1: 'Saya seorang <strong>DevOps Engineer</strong> yang berfokus pada <strong>Cloud Engineering, Multi-Cloud Kubernetes, dan DevSecOps</strong>. Saat ini menangani cluster Kubernetes production di <strong>GKE, EKS, dan TKE</strong> pada PT Link Net Tbk untuk menjembatani kecepatan rilis developer dan stabilitas production melalui otomasi CI/CD, manajemen secret, dan penanganan insiden.',
        about_p2: 'Mulai dari otomasi agen monitoring di server Linux menggunakan <strong>Ansible</strong> hingga penerapan security gate (<strong>SonarQube, Gitleaks, Trivy</strong>) di dalam workflow CI, saya fokus membangun infrastruktur cloud-native yang terukur, terpantau, dan konsisten.',
        exp1_b1: 'Mengelola dan memelihara cluster Kubernetes production lintas environment <strong>GKE, EKS, dan TKE</strong> untuk aplikasi berkeandalan tinggi.',
        exp1_b2: 'Mengelola dan memelihara <strong>pipeline CI/CD Azure DevOps</strong> guna mengotomasi proses build, deployment, dan rilis aplikasi.',
        exp1_b3: 'Mengadministrasi resource Kubernetes—Deployments, Services, Ingress, ConfigMaps, dan Secrets—yang terintegrasi aman dengan <strong>Azure Key Vault</strong>.',
        exp1_b4: 'Mendiagnosis dan menyelesaikan insiden Kubernetes di production, termasuk <span class="code-chip">CrashLoopBackOff</span>, <span class="code-chip">ImagePullBackOff</span>, dan <span class="code-chip">CreateContainerConfigError</span>.',
        exp1_b5: 'Berkolaborasi dengan tim Developer, QA, DBA, dan Infrastruktur untuk mengeksekusi rolling update, restart pod, validasi rilis, dan pembaruan konfigurasi.',
        exp2_b1: 'Membangun dan mengonfigurasi monitoring sistem serta analitik log menggunakan <strong>Prometheus, Grafana, Kibana, FortiWeb, dan FortiGate</strong> untuk visibilitas infrastruktur menyeluruh.',
        exp2_b2: 'Mengotomasi instalasi agen monitoring (<strong>Node Exporter, cAdvisor</strong>) di <strong>7 server Linux</strong> menggunakan playbook <strong>Ansible</strong>.',
        exp2_b3: 'Mengonfigurasi dan mengelola keamanan firewall <strong>FortiGate</strong>, aturan web filtering, security profile, pembaruan firmware, serta kebijakan Data Loss Prevention (DLP).',
        exp2_b4: 'Menyusun aturan alerting <strong>Prometheus</strong> serta kustomisasi dashboard <strong>Grafana</strong> untuk pemantauan ambang batas infrastruktur secara real-time.',
        exp2_b5: 'Membuat script <strong>Bash</strong> otomatis dan jadwal cron job untuk backup berkala ke NAS demi menjaga integritas data dan kesiapan disaster recovery.',
        prj1_b1: 'Membangun dan melakukan kontainerisasi aplikasi full-stack multi-tier (React, Node.js, PostgreSQL) menggunakan <strong>Docker &amp; Docker Compose</strong>.',
        prj1_b2: 'Merancang pipeline <strong>Jenkins CI</strong> otomatis dengan tahapan keamanan ketat: analisis SAST <strong>SonarQube</strong>, deteksi secret <strong>Gitleaks</strong>, dan pemindaian celah kontainer <strong>Trivy</strong>.',
        prj1_b3: 'Mengonfigurasi proses build dan push image otomatis ke <strong>Docker Hub</strong> hanya apabila seluruh pemeriksaan keamanan dinyatakan lolos.',
        prj2_b1: 'Membangun pipeline <strong>Jenkins CI/CD</strong> end-to-end yang mengotomasi pemaketan kontainer dan deployment ke cluster <strong>Kubernetes (K3s)</strong>.',
        prj2_b2: 'Mengelola workload aplikasi di K3s lengkap dengan aturan routing Ingress dan isolasi resource berbasis namespace.',
        prj2_b3: 'Menyiapkan pemantauan cluster menggunakan <strong>Prometheus, Node Exporter, dan dashboard kustom Grafana</strong> untuk telemetri host secara real-time.',
        play1_desc: 'Menjaga ketersediaan tinggi workload di <strong>GKE, EKS, dan TKE</strong>—mengelola Ingress, ConfigMaps, dan secret <strong>Azure Key Vault</strong> sekaligus menangani insiden <span class="code-chip">CrashLoopBackOff</span> &amp; <span class="code-chip">ImagePullBackOff</span> secara cepat.',
        play2_desc: 'Mengotomasi alur build-hingga-rilis di <strong>Azure DevOps &amp; Jenkins</strong> dengan pemeriksaan secret <strong>Gitleaks</strong>, quality gate SAST <strong>SonarQube</strong>, dan pemindaian image <strong>Trivy</strong> sebelum push ke registry.',
        play3_desc: 'Menyebarkan agen monitoring ke seluruh host Linux via <strong>Ansible</strong>, alerting kustom <strong>Prometheus &amp; Grafana</strong>, kebijakan DLP <strong>FortiGate / FortiWeb</strong>, serta backup NAS terjadwal dengan <strong>Bash + Cron</strong>.'
    }
};

let currentLang = localStorage.getItem('portfolio-lang') === 'id' ? 'id' : 'en';

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);

    if (langLabel) {
        langLabel.textContent = lang.toUpperCase();
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (lang === 'id' && i18nID.text[key]) {
            el.textContent = i18nID.text[key];
        } else if (enTextCache.has(el)) {
            el.textContent = enTextCache.get(el);
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (lang === 'id' && i18nID.html[key]) {
            el.innerHTML = i18nID.html[key];
        } else if (enHtmlCache.has(el)) {
            el.innerHTML = enHtmlCache.get(el);
        }
    });
}

function toggleLanguage() {
    applyLanguage(currentLang === 'en' ? 'id' : 'en');
}

if (currentLang === 'id') {
    applyLanguage('id');
}
langToggle?.addEventListener('click', toggleLanguage);

// ==========================================================================
// 2. NAVBAR, SCROLL PROGRESS BAR, SECTION SPY & BACK TO TOP
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const sections = document.querySelectorAll('section[id]');
const spyLinks = document.querySelectorAll('.nav-menu a:not(.nav-connect-btn)');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
    }
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
});

function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // 1. Top deployment progress bar
    if (scrollProgress) {
        const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
        scrollProgress.style.width = `${pct}%`;
    }

    // 2. Floating Back-to-Top visibility
    if (backToTop) {
        backToTop.classList.toggle('visible', scrollTop > 420);
    }

    // 3. Active navbar link spy
    const scrollPos = scrollTop + 180;
    let currentId = '';

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            currentId = section.getAttribute('id');
        }
    });

    spyLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`);
    });
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================================
// 3. MAC TERMINAL LOG SIMULATION (jodyys.web.id STYLE)
// ==========================================================================
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
    if (!terminalLogs) return;
    if (logIndex >= logs.length) {
        startRoleAnimation();
        return;
    }

    const logEl = document.createElement('div');
    if (logs[logIndex] === '<br>') {
        logEl.style.height = '10px';
    } else {
        logEl.innerHTML = logs[logIndex];
    }

    terminalLogs.appendChild(logEl);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;

    logIndex++;

    const delay = Math.random() * 260 + 180;
    setTimeout(appendLog, delay);
}

const roles = ['DevOps Engineer', 'Cloud Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startRoleAnimation() {
    const roleEl = document.getElementById('role-text');
    const cursorEl = document.getElementById('role-cursor');
    if (!roleEl || !cursorEl) return;

    setInterval(() => {
        cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
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
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

if (terminalLogs) {
    terminalLogs.innerHTML = '';
    setTimeout(appendLog, 600);
}

// ==========================================================================
// 4. INTERACTIVE TECH STACK FILTER
// ==========================================================================
const filterTabs = document.querySelectorAll('.filter-tab');
const stackModules = document.querySelectorAll('.stack-module');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        filterTabs.forEach(t => t.classList.toggle('active', t === tab));

        stackModules.forEach(mod => {
            const show = filter === 'all' || mod.dataset.cat === filter;
            mod.classList.toggle('hidden', !show);
        });
    });
});

// ==========================================================================
// 5. ONE-CLICK COPY EMAIL HELPER & FOOTER BUTTON
// ==========================================================================
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyEmailText = document.getElementById('copyEmailText');

async function copyPortfolioEmail() {
    const email = 'devinjody@gmail.com';
    try {
        await navigator.clipboard.writeText(email);
        if (copyEmailBtn && copyEmailText) {
            const defaultLabel = 'devinjody@gmail.com';
            copyEmailText.textContent = 'COPIED!';
            copyEmailBtn.style.background = 'var(--accent-cyan)';
            copyEmailBtn.style.color = 'var(--ink-dark)';
            setTimeout(() => {
                copyEmailText.textContent = defaultLabel;
                copyEmailBtn.style.background = '';
                copyEmailBtn.style.color = '';
            }, 2000);
        }
        return true;
    } catch {
        window.location.href = `mailto:${email}`;
        return false;
    }
}

copyEmailBtn?.addEventListener('click', copyPortfolioEmail);

// ==========================================================================
// 6. PIPELINE & YAML SPEC MODAL VIEWER
// ==========================================================================
const specModal = document.getElementById('specModal');
const specModalTitle = document.getElementById('specModalTitle');
const specTabs = document.getElementById('specTabs');
const specCodeContent = document.getElementById('specCodeContent');
const specClose = document.getElementById('specClose');
const specCopyBtn = document.getElementById('specCopyBtn');
const specCopyLabel = document.getElementById('specCopyLabel');

const projectSpecs = {
    travel: {
        title: 'PRJ_01 // TRAVEL DESTINATION HUB — PIPELINE SPEC',
        files: [
            {
                name: 'Jenkinsfile',
                code: `pipeline {
    agent any
    environment {
        IMAGE_REPO = "jodyys/travel-destination-hub"
        IMAGE_TAG  = "\${env.BUILD_NUMBER}"
    }
    stages {
        stage('01 // Secret Scan (Gitleaks)') {
            steps {
                sh 'gitleaks detect --source . --no-git --exit-code 1'
            }
        }
        stage('02 // SAST & Quality Gate (SonarQube)') {
            steps {
                withSonarQubeEnv('SonarQube-Server') {
                    sh 'sonar-scanner -Dsonar.projectKey=travel-hub'
                }
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('03 // Build Container Image') {
            steps {
                sh "docker build -t \${IMAGE_REPO}:\${IMAGE_TAG} ."
            }
        }
        stage('04 // Container Vulnerability Scan (Trivy)') {
            steps {
                sh "trivy image --exit-code 1 --severity HIGH,CRITICAL \${IMAGE_REPO}:\${IMAGE_TAG}"
            }
        }
        stage('05 // Push Verified Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo "$PASS" | docker login -u "$USER" --password-stdin'
                    sh "docker push \${IMAGE_REPO}:\${IMAGE_TAG}"
                }
            }
        }
    }
}`
            },
            {
                name: 'docker-compose.yml',
                code: `version: "3.9"
services:
  frontend:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    image: jodyys/travel-destination-hub:latest
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_NAME: travel_db
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      retries: 5

volumes:
  pgdata:`
            }
        ]
    },
    track: {
        title: 'PRJ_02 // TRACK APP — K3S & OBSERVABILITY SPEC',
        files: [
            {
                name: 'k8s-deployment.yaml',
                code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: track-app
  namespace: track-prod
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: track-app
  template:
    metadata:
      labels:
        app: track-app
    spec:
      containers:
        - name: track-app
          image: jodyys/track-app:latest
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "300m"
              memory: "256Mi"
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: track-app-ingress
  namespace: track-prod
spec:
  rules:
    - host: track.jodyys.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: track-app-svc
                port:
                  number: 80`
            },
            {
                name: 'prometheus.yml',
                code: `global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus-core'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'k3s-node-exporter'
    static_configs:
      - targets: ['node-exporter.monitoring.svc:9100']
        labels:
          cluster: 'k3s-lab'
          env: 'production'`
            }
        ]
    }
};

let activeSpecCode = '';

function openSpecModal(specKey) {
    const spec = projectSpecs[specKey];
    if (!spec || !specModal || !specTabs || !specCodeContent) return;

    if (specModalTitle) specModalTitle.textContent = spec.title;
    specTabs.innerHTML = '';

    spec.files.forEach((file, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `spec-tab-btn${idx === 0 ? ' active' : ''}`;
        btn.textContent = file.name;
        btn.addEventListener('click', () => {
            specTabs.querySelectorAll('.spec-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeSpecCode = file.code;
            specCodeContent.textContent = file.code;
        });
        specTabs.appendChild(btn);
    });

    activeSpecCode = spec.files[0].code;
    specCodeContent.textContent = activeSpecCode;

    specModal.classList.add('open');
    specModal.setAttribute('aria-hidden', 'false');
}

function closeSpecModal() {
    if (!specModal) return;
    specModal.classList.remove('open');
    specModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.spec-btn').forEach(btn => {
    btn.addEventListener('click', () => openSpecModal(btn.dataset.spec));
});

specClose?.addEventListener('click', closeSpecModal);
specModal?.addEventListener('click', (e) => {
    if (e.target === specModal) closeSpecModal();
});

specCopyBtn?.addEventListener('click', async () => {
    if (!activeSpecCode) return;
    try {
        await navigator.clipboard.writeText(activeSpecCode);
        if (specCopyLabel) specCopyLabel.textContent = 'COPIED!';
        setTimeout(() => {
            if (specCopyLabel) specCopyLabel.textContent = 'COPY';
        }, 1800);
    } catch {
        // Ignore clipboard errors in restricted contexts
    }
});

// ==========================================================================
// 7. COMMAND PALETTE (CTRL + K / CMD + K)
// ==========================================================================
const cmdTrigger = document.getElementById('cmdTrigger');
const cmdModal = document.getElementById('cmdModal');
const cmdInput = document.getElementById('cmdInput');
const cmdList = document.getElementById('cmdList');
const cmdClose = document.getElementById('cmdClose');

const paletteCommands = [
    {
        icon: 'fa-solid fa-file-pdf',
        label: 'Download Resume / CV (PDF)',
        hint: 'OPEN PDF',
        keywords: 'cv resume pdf download unduh',
        action: () => window.open('CV_Devin_Jodiyudanto.pdf', '_blank', 'noopener')
    },
    {
        icon: 'fa-brands fa-whatsapp',
        label: 'Chat via WhatsApp',
        hint: '+62 838-7250-2379',
        keywords: 'whatsapp wa chat contact kontak',
        action: () => window.open('https://wa.me/6283872502379', '_blank', 'noopener')
    },
    {
        icon: 'fa-regular fa-copy',
        label: 'Copy Email (devinjody@gmail.com)',
        hint: 'CLIPBOARD',
        keywords: 'email mail copy salin kontak',
        action: () => copyPortfolioEmail()
    },
    {
        icon: 'fa-solid fa-circle-half-stroke',
        label: 'Switch Theme (Dark / Light)',
        hint: 'TOGGLE',
        keywords: 'theme dark light mode tema terang gelap',
        action: () => toggleTheme()
    },
    {
        icon: 'fa-solid fa-globe',
        label: 'Switch Language (English / Indonesia)',
        hint: 'EN / ID',
        keywords: 'language bahasa indonesia english id en',
        action: () => toggleLanguage()
    },
    {
        icon: 'fa-solid fa-file-code',
        label: 'Inspect Spec: Travel Destination Hub (Jenkinsfile)',
        hint: 'YAML / CI',
        keywords: 'spec jenkinsfile sonarqube trivy gitleaks docker',
        action: () => openSpecModal('travel')
    },
    {
        icon: 'fa-solid fa-cubes',
        label: 'Inspect Spec: Track App (K3s & Prometheus YAML)',
        hint: 'K8S SPEC',
        keywords: 'spec k3s kubernetes yaml prometheus grafana',
        action: () => openSpecModal('track')
    },
    {
        icon: 'fa-solid fa-microchip',
        label: 'Jump to Tech Stack Matrix',
        hint: '#skills',
        keywords: 'stack skills tools cloud k8s',
        action: () => { window.location.hash = '#skills'; }
    },
    {
        icon: 'fa-solid fa-briefcase',
        label: 'Jump to Work Experience',
        hint: '#experience',
        keywords: 'experience work kerja link net buana',
        action: () => { window.location.hash = '#experience'; }
    },
    {
        icon: 'fa-solid fa-terminal',
        label: 'Jump to Operational Playbook',
        hint: '#playbook',
        keywords: 'playbook runbook ops production',
        action: () => { window.location.hash = '#playbook'; }
    },
    {
        icon: 'fa-brands fa-github',
        label: 'Open GitHub (@jodyys)',
        hint: 'EXTERNAL',
        keywords: 'github repo git code',
        action: () => window.open('https://github.com/jodyys', '_blank', 'noopener')
    },
    {
        icon: 'fa-brands fa-linkedin',
        label: 'Open LinkedIn Profile',
        hint: 'EXTERNAL',
        keywords: 'linkedin profile social',
        action: () => window.open('https://linkedin.com/in/devinjodiyudanto', '_blank', 'noopener')
    }
];

let filteredCommands = [...paletteCommands];
let activeCmdIdx = 0;

function renderCommandList() {
    if (!cmdList) return;
    cmdList.innerHTML = '';

    if (filteredCommands.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'cmd-empty';
        empty.textContent = 'No matching command found.';
        cmdList.appendChild(empty);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = `cmd-item${idx === activeCmdIdx ? ' active' : ''}`;
        item.innerHTML = `
            <span class="cmd-item-left"><i class="${cmd.icon}"></i> <span>${cmd.label}</span></span>
            <span class="cmd-item-hint">${cmd.hint}</span>
        `;
        item.addEventListener('mouseenter', () => {
            activeCmdIdx = idx;
            cmdList.querySelectorAll('.cmd-item').forEach((el, i) => {
                el.classList.toggle('active', i === activeCmdIdx);
            });
        });
        item.addEventListener('click', () => {
            closeCmdModal();
            cmd.action();
        });
        cmdList.appendChild(item);
    });
}

function openCmdModal() {
    if (!cmdModal) return;
    closeSpecModal();
    cmdModal.classList.add('open');
    cmdModal.setAttribute('aria-hidden', 'false');
    if (cmdInput) {
        cmdInput.value = '';
        filteredCommands = [...paletteCommands];
        activeCmdIdx = 0;
        renderCommandList();
        setTimeout(() => cmdInput.focus(), 40);
    }
}

function closeCmdModal() {
    if (!cmdModal) return;
    cmdModal.classList.remove('open');
    cmdModal.setAttribute('aria-hidden', 'true');
}

cmdTrigger?.addEventListener('click', openCmdModal);
cmdClose?.addEventListener('click', closeCmdModal);
cmdModal?.addEventListener('click', (e) => {
    if (e.target === cmdModal) closeCmdModal();
});

cmdInput?.addEventListener('input', () => {
    const q = cmdInput.value.trim().toLowerCase();
    filteredCommands = paletteCommands.filter(cmd =>
        cmd.label.toLowerCase().includes(q) || cmd.keywords.includes(q)
    );
    activeCmdIdx = 0;
    renderCommandList();
});

document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K toggles Command Palette
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdModal?.classList.contains('open')) {
            closeCmdModal();
        } else {
            openCmdModal();
        }
        return;
    }

    if (e.key === 'Escape') {
        if (cmdModal?.classList.contains('open')) closeCmdModal();
        if (specModal?.classList.contains('open')) closeSpecModal();
        return;
    }

    if (cmdModal?.classList.contains('open') && filteredCommands.length > 0) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeCmdIdx = (activeCmdIdx + 1) % filteredCommands.length;
            renderCommandList();
            cmdList?.querySelector('.cmd-item.active')?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeCmdIdx = (activeCmdIdx - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommandList();
            cmdList?.querySelector('.cmd-item.active')?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const chosen = filteredCommands[activeCmdIdx];
            closeCmdModal();
            chosen?.action();
        }
    }
});

// ==========================================================================
// 8. SCROLL REVEAL OBSERVER
// ==========================================================================
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
