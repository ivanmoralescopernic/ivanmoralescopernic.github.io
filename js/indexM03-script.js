// ===================================
// Theme Management
// ===================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        this.init();
    }

    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme || 'dark'; // Default to dark theme
        this.setTheme(initialTheme);

        // Event listeners
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#f0f4f8');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);

        // Add fun animation to the button
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 300);
    }
}

// ===================================
// Stars Generator (for dark mode)
// ===================================

class StarsGenerator {
    constructor() {
        this.starsContainer = document.getElementById('stars');
        this.starCount = 150; // Increased for better visibility

        this.generate();
    }

    generate() {
        for (let i = 0; i < this.starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Random position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            // Random size
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Random animation delay
            star.style.animationDelay = `${Math.random() * 3}s`;

            this.starsContainer.appendChild(star);
        }
    }
}

// ===================================
// Smooth Scroll & Animations
// ===================================

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        // Observe elements for scroll animations
        this.setupIntersectionObserver();

        // Add entrance animations
        this.animateOnLoad();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // Observe elements (can be expanded for future sections)
        document.querySelectorAll('.hero-text, .hero-image').forEach(el => {
            observer.observe(el);
        });
    }

    animateOnLoad() {
        // Stagger animation for hero elements
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');

        if (heroText) {
            setTimeout(() => {
                heroText.style.opacity = '0';
                heroText.style.transform = 'translateY(30px)';
                heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

                setTimeout(() => {
                    heroText.style.opacity = '1';
                    heroText.style.transform = 'translateY(0)';
                }, 100);
            }, 100);
        }

        if (heroImage) {
            setTimeout(() => {
                heroImage.style.opacity = '0';
                heroImage.style.transform = 'translateY(30px)';
                heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

                setTimeout(() => {
                    heroImage.style.opacity = '1';
                    heroImage.style.transform = 'translateY(0)';
                }, 100);
            }, 300);
        }
    }
}

// ===================================
// Interactive Elements
// ===================================

class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupResumeButton();
        this.setupNotifications();
        this.setupParallax();
    }

    setupResumeButton() {
        const resumeBtn = document.getElementById('resume-btn');

        if (resumeBtn) {
            resumeBtn.addEventListener('click', (e) => {
                e.preventDefault();

                // Add download animation
                const originalText = resumeBtn.innerHTML;
                resumeBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    Descarregant...
                `;

                // Simulate download
                setTimeout(() => {
                    resumeBtn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Descarregat!
                    `;

                    setTimeout(() => {
                        resumeBtn.innerHTML = originalText;
                    }, 2000);
                }, 1500);
            });
        }
    }

    setupNotifications() {
        const notifBtn = document.querySelector('.notifications-btn');

        if (notifBtn) {
            notifBtn.addEventListener('click', () => {
                // Simple notification effect
                const badge = notifBtn.querySelector('.notification-badge');
                if (badge) {
                    badge.style.animation = 'ping 1s ease-out';
                    setTimeout(() => {
                        badge.style.animation = '';
                    }, 1000);
                }
            });
        }
    }

    setupParallax() {
        // Subtle parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

            const floatingIcons = document.querySelectorAll('.floating-icon');
            floatingIcons.forEach((icon, index) => {
                const speed = (index + 1) * 0.5;
                icon.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });

            const circles = document.querySelectorAll('.floating-circle');
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.3;
                circle.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        });
    }
}

// ===================================
// Mouse Trail Effect
// ===================================

class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.lastX = 0;
        this.lastY = 0;
        this.cursor = null;
        this.init();
    }

    init() {
        // Create custom cursor
        this.createCursor();

        // Hide default cursor
        document.body.style.cursor = 'none';

        document.addEventListener('mousemove', (e) => {
            this.updateCursor(e.clientX, e.clientY);
            this.addTrailPoint(e.clientX, e.clientY);
        });

        document.addEventListener('mouseleave', () => {
            if (this.cursor) this.cursor.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            if (this.cursor) this.cursor.style.display = 'block';
        });

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            this.updateCursorStyle();
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        // Animation loop
        this.animate();
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.updateCursorStyle();
        document.body.appendChild(this.cursor);
    }

    updateCursorStyle() {
        if (!this.cursor) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const mainColor = isDark ? '#f1f5f9' : '#1a202c';
        const centerColor = isDark ? '#1a202c' : 'white';

        this.cursor.style.cssText = `
            position: fixed;
            width: 16px;
            height: 16px;
            background: radial-gradient(circle at center, ${centerColor} 25%, ${mainColor} 25%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        `;
    }

    updateCursor(x, y) {
        if (this.cursor) {
            this.cursor.style.left = x + 'px';
            this.cursor.style.top = y + 'px';
        }
    }

    addTrailPoint(x, y) {
        // Only add if mouse has moved enough
        const distance = Math.sqrt(Math.pow(x - this.lastX, 2) + Math.pow(y - this.lastY, 2));
        if (distance < 5) return;

        this.lastX = x;
        this.lastY = y;

        // Get current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const trailColor = isDark ? '#f1f5f9' : '#1a202c';

        const point = document.createElement('div');
        point.className = 'trail-point';
        point.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 12px;
            height: 12px;
            background: ${trailColor};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            opacity: 1;
        `;

        document.body.appendChild(point);
        this.trail.push({
            element: point,
            life: 1
        });

        // Remove old trail points
        if (this.trail.length > this.maxTrailLength) {
            const old = this.trail.shift();
            if (old.element.parentNode) {
                old.element.parentNode.removeChild(old.element);
            }
        }
    }

    animate() {
        this.trail.forEach((point, index) => {
            point.life -= 0.05;

            if (point.life <= 0) {
                if (point.element.parentNode) {
                    point.element.parentNode.removeChild(point.element);
                }
                this.trail.splice(index, 1);
            } else {
                // Fade out completely opaque
                point.element.style.opacity = point.life;
                point.element.style.transform = `translate(-50%, -50%) scale(${0.5 + point.life * 0.5})`;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}


// ===================================
// Add custom CSS for animations
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes ping {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// ===================================
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    const themeManager = new ThemeManager();
    const starsGenerator = new StarsGenerator();
    const animationController = new AnimationController();
    const interactiveElements = new InteractiveElements();
    const mouseTrail = new MouseTrail();

    // Log success
    console.log('🚀 Portfolio loaded successfully!');
    console.log('✨ Theme system active');
    console.log('⭐ Stars generated');
    console.log('🎨 Animations initialized');
    console.log('✨ Mouse trail active');

    // Hide scroll indicator on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
}, 250));
