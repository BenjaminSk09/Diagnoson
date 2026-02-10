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

document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');

    if (videoContainer) {
        const vids = [
            'pic/VideoDiag.mp4', 
            'pic/VideoDiag1.mp4', 
            'pic/VideoDiag2.mp4', 
            'pic/VideoDiag3.mp4', 
            'pic/VideoDiag4.mp4',
            'pic/VideoDiag5.mp4'
        ];

        const shuffledVids = vids.sort(() => Math.random() - 0.5);
        let currentIndex = 0;

        const video = document.createElement('video');
        video.playsInline = true;
        video.loop = false;
        video.muted = true; // Obligatorio para que inicie solo al hacer scroll
        video.volume = 0.2; // Tu volumen bajo solicitado
        video.classList.add('w-full', 'h-full', 'object-cover'); 
        video.src = shuffledVids[currentIndex];

        // --- LÓGICA DE SONIDO INTELIGENTE ---
        // Intentar activar sonido al primer clic en cualquier parte de la página
        const enableSound = () => {
            video.muted = false;
            // Una vez activado, eliminamos el listener para no repetir
            document.removeEventListener('click', enableSound);
        };
        document.addEventListener('click', enableSound);

        // Alternar mute con clic directo en el video (como ya te gustaba)
        video.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflicto con el listener global
            video.muted = !video.muted;
        });
        // ------------------------------------

        video.onended = () => {
            currentIndex = (currentIndex + 1) % shuffledVids.length;
            video.src = shuffledVids[currentIndex];
            video.play();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(error => console.log("Play prevenido"));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        videoContainer.appendChild(video);
        observer.observe(videoContainer);
    }
});