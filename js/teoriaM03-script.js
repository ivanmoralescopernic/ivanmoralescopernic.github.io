/* ===================================
   Teoria M03 - JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Stars Background =====
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const NUM_STARS = 80;
        for (let i = 0; i < NUM_STARS; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (2 + Math.random() * 3) + 's';
            const size = Math.random() * 2 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            starsContainer.appendChild(star);
        }
    }

    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next    = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ===== Reading Progress Bar =====
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop    = window.scrollY;
            const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = Math.min(scrolled, 100) + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ===== Section Fade-in on scroll =====
    const sections = document.querySelectorAll('.theory-section, .summary-card');

    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // ===== Image fallback: show placeholder label when image is missing =====
    document.querySelectorAll('.theory-img').forEach(img => {
        const label = img.nextElementSibling;
        if (!label) return;

        // If the image loads successfully, hide the label
        img.addEventListener('load', () => {
            label.style.display = 'none';
            img.style.position  = 'relative';
        });

        // If the image fails, hide the img and show the label
        img.addEventListener('error', () => {
            img.style.display  = 'none';
            label.style.display = 'flex';
            label.style.position = 'static';
        });

        // Start checking if already broken (cached error)
        if (img.complete && img.naturalWidth === 0) {
            img.style.display   = 'none';
            label.style.display = 'flex';
            label.style.position = 'static';
        } else if (img.complete && img.naturalWidth > 0) {
            label.style.display = 'none';
        }
    });

});
