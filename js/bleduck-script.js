// Initialize Lucide icons
lucide.createIcons();

// Stars generation
const starsContainer = document.getElementById('stars');
const starCount = 150;

if (starsContainer) {
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1.5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = Math.random();

        if (Math.random() > 0.8) {
            star.style.animation = `twinkle ${2 + Math.random() * 5}s infinite`;
        }
        starsContainer.appendChild(star);
    }
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});
