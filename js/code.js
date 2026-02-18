// Carousel behavior for header
document.addEventListener('DOMContentLoaded', function () {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const indicatorsContainer = document.querySelector('.indicators');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let current = 0;
    let interval = null;


    if (!slides.length || !indicatorsContainer || !prevBtn || !nextBtn) return;

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

    
    function update() {
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
        });

        const dots = Array.from(indicatorsContainer.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === current);
        });
    }

  
    function goTo(index) {
        current = (index + slides.length) % slides.length;
        update();
    }

   
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

  
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
        // 1. Lista de videos
        const vids = [
            'pic/VideoDiag.mp4',
            'pic/VideoDiag2.mp4', 
            'pic/VideoDiag3.mp4', 
            'pic/VideoDiag4.mp4', 
            'pic/VideoDiag5.mp4'
        ];

        // 2. Mezcla aleatoria
        const shuffledVids = vids.sort(() => Math.random() - 0.5);
        let currentIndex = 0;
        let userInteracted = false; // Variable para saber si ya podemos usar sonido

        const video = document.createElement('video');
        video.playsInline = true;
        video.muted = true; // El video inicia muted x politicas de el navegador
        video.volume = 0.2; // VOLUMEN OJO
        video.classList.add('w-full', 'h-full', 'object-cover'); 
        video.src = shuffledVids[currentIndex];

        // --- LÓGICA DE SONIDO ---
        const enableSound = () => {
            video.muted = false;
            userInteracted = true;
            document.removeEventListener('click', enableSound);
            document.removeEventListener('touchstart', enableSound);
        };

        //sonido al primer clic o toque en el celular
        document.addEventListener('click', enableSound);
        document.addEventListener('touchstart', enableSound);

        video.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
        });

        // 3. Cambio de video automático
        video.onended = () => {
            currentIndex = (currentIndex + 1) % shuffledVids.length;
            video.src = shuffledVids[currentIndex];
            
            // Si el usuario ya interactuó, el siguiente video sale con sonido
            if (userInteracted) {
                video.muted = false;
            }
            video.play();
        };

        // 4. Reproducción al hacer scroll (Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Intentar reproducir
                    const promise = video.play();
                    if (promise !== undefined) {
                        promise.catch(() => {
                            // Si falla por el sonido, silencia y reintenta.
                            video.muted = true;
                            video.play();
                        });
                    }
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.2 }); // Se activa cuando el 20% es visible

        videoContainer.appendChild(video);
        observer.observe(videoContainer);
    }
});