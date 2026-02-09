// Carousel behavior for header
document.addEventListener('DOMContentLoaded', function () {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const indicatorsContainer = document.querySelector('.indicators');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let current = 0;
    let interval = null;

  
// Validate that the carousel exists
    if (!slides.length || !indicatorsContainer || !prevBtn || !nextBtn) return;

    // Build indicators
    slides.forEach((slide, index) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', `Ir al slide ${index + 1}`);
        btn.addEventListener('click', () => goTo(index));
        if (index === 0) btn.classList.add('active');
        indicatorsContainer.appendChild(btn);
    });

    // Update visual status
    function update() {
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
        });
        
        const dots = Array.from(indicatorsContainer.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === current);
        });
    }

    // Navigate to a specific slide
    function goTo(index) {
        current = (index + slides.length) % slides.length;
        update();
    }

  // Event listeners for manual navigation
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-play TO carousel
    const AUTO_DELAY = 7000;

    function startAuto() {
        stopAuto();
        interval = setInterval(() => goTo(current + 1), AUTO_DELAY);
    }

    function stopAuto() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // Pausar auto-play cuando el usuario interactúa
    const container = document.querySelector('.overflow-hidden');
    if (container) {
        container.addEventListener('mouseenter', stopAuto);
        container.addEventListener('focusin', stopAuto);
        container.addEventListener('mouseleave', startAuto);
        container.addEventListener('focusout', startAuto);
    }

    // Iniciar auto-play
    startAuto();
});