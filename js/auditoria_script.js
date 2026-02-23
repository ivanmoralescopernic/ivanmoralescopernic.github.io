// ===================================
// Auditoria Automàtica - Scripting
// ===================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        // Theme system already partially managed by shared CSS/HTML
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(savedTheme);

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                const current = this.html.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                this.applyTheme(next);
            });
        }
    }

    applyTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}

class StarsGenerator {
    constructor() {
        this.container = document.getElementById('stars');
        this.count = 150;
        if (this.container) this.generate();
    }

    generate() {
        for (let i = 0; i < this.count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            this.container.appendChild(star);
        }
    }
}

class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxLen = 20;
        this.lastX = 0;
        this.lastY = 0;
        this.cursor = null;
        this.init();
    }

    init() {
        this.createCursor();
        document.body.style.cursor = 'none';

        document.addEventListener('mousemove', (e) => {
            this.updateCursor(e.clientX, e.clientY);
            this.addPoint(e.clientX, e.clientY);
        });

        document.addEventListener('mouseleave', () => {
            if (this.cursor) this.cursor.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            if (this.cursor) this.cursor.style.display = 'block';
        });

        this.animate();
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.updateCursorStyle();
        document.body.appendChild(this.cursor);

        // Update on theme change
        const observer = new MutationObserver(() => this.updateCursorStyle());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    updateCursorStyle() {
        if (!this.cursor) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = isDark ? '#f1f5f9' : '#1a202c';
        const bg = isDark ? '#1a202c' : '#ffffff';
        this.cursor.style.cssText = `
            position: fixed;
            width: 16px; height: 16px;
            background: radial-gradient(circle at center, ${bg} 25%, ${color} 25%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        `;
    }

    updateCursor(x, y) {
        if (this.cursor) {
            this.cursor.style.left = x + 'px';
            this.cursor.style.top = y + 'px';
        }
    }

    addPoint(x, y) {
        const dist = Math.sqrt(Math.pow(x - this.lastX, 2) + Math.pow(y - this.lastY, 2));
        if (dist < 5) return;
        this.lastX = x; this.lastY = y;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = isDark ? '#f1f5f9' : '#1a202c';

        const point = document.createElement('div');
        point.className = 'trail-point';
        point.style.cssText = `
            position: fixed;
            left: ${x}px; top: ${y}px;
            width: 10px; height: 10px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(point);
        this.trail.push({ el: point, life: 1 });

        if (this.trail.length > this.maxLen) {
            const old = this.trail.shift();
            if (old.el.parentNode) old.el.parentNode.removeChild(old.el);
        }
    }

    animate() {
        this.trail.forEach((p, i) => {
            p.life -= 0.05;
            if (p.life <= 0) {
                if (p.el.parentNode) p.el.parentNode.removeChild(p.el);
                this.trail.splice(i, 1);
            } else {
                p.el.style.opacity = p.life;
                p.el.style.transform = `translate(-50%, -50%) scale(${0.5 + p.life * 0.5})`;
            }
        });
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    new ThemeManager();
    new StarsGenerator();
    new MouseTrail();

    // Smooth scroll for internal links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle scroll indicator
    const scrollInd = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) scrollInd?.classList.add('hidden');
        else scrollInd?.classList.remove('hidden');
    });
});
