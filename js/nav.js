// Mobile navigation (hamburger) behavior
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    // Validar que existen los elementos
    if (!hamburger || !mobileMenu) return;

    const icon = hamburger.querySelector('i');

    // Función para abrir el menú
    function openMenu() {
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
        hamburger.classList.add('active');
        mobileMenu.classList.add('open');
        mobileMenu.classList.remove('hidden');
        hamburger.setAttribute('aria-expanded', 'true');
    }

    // Función para cerrar el menú
    function closeMenu() {
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('hidden');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Toggle del menú al hacer clic en el botón hamburguesa
    hamburger.addEventListener('click', function () {
        const isExpanded = hamburger.classList.contains('active');
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar el menú al presionar la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
            hamburger.focus();
        }
    });

    // Cerrar el menú cuando se hace clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('click', function (e) {
        const isClickInsideMenu = mobileMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        const isMenuOpen = mobileMenu.classList.contains('open');

        if (!isClickInsideMenu && !isClickOnHamburger && isMenuOpen) {
            closeMenu();
        }
    });
});