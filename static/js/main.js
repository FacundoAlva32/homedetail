// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }

    initMobileMenu();
    initComparisonSliders();
    initFAQAccordion();
    initServiceSelection();
    initContactForm();
    initSmoothScroll(); // Agregar esta función
});

// Smooth Scroll para navegación - FUNCIÓN CORREGIDA
function initSmoothScroll() {
    document.addEventListener('click', function(e) {
        // Verificar si el click fue en un enlace de la navegación
        if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
            e.preventDefault();
            
            const targetId = e.target.getAttribute('href') || e.target.closest('a[href^="#"]').getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular la posición considerando el header fijo
                const headerHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileBtn = document.getElementById('mobile-menu-btn');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    mobileBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
                }
            }
        }
    });
}

// Menú Móvil - VERSIÓN MEJORADA
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenir que el click se propague
            const isOpen = menu.classList.toggle('open');
            btn.innerHTML = isOpen ? 
                '<i class="fa-solid fa-xmark text-2xl"></i>' : 
                '<i class="fa-solid fa-bars text-2xl"></i>';
        });

        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !btn.contains(e.target)) {
                menu.classList.remove('open');
                btn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
            }
        });

        // Prevenir que los clicks dentro del menú cierren el menú
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Sliders de Comparación
function initComparisonSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach((slider) => {
        const afterImage = slider.querySelector('.comparison-item-after');
        const handle = slider.querySelector('.handle');
        let isDown = false;

        function moveSlider(e) {
            const rect = slider.getBoundingClientRect();
            let x;
            
            if (e.type.includes('touch')) {
                x = e.touches[0].clientX - rect.left;
            } else {
                x = e.clientX - rect.left;
            }
            
            // Limites
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            const percentage = (x / rect.width) * 100;
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            handle.style.left = `${percentage}%`;
        }

        // Eventos para mouse
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            moveSlider(e);
        });
        
        window.addEventListener('mouseup', () => isDown = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            moveSlider(e);
        });

        // Eventos para touch
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            moveSlider(e);
        });
        
        window.addEventListener('touchend', () => isDown = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            moveSlider(e);
        });
        
        // Inicializar en 50%
        afterImage.style.clipPath = 'inset(0 50% 0 0)';
        handle.style.left = '50%';
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Cerrar otros FAQs abiertos
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) {
                    item.classList.add('hidden');
                    const otherIcon = item.previousElementSibling.querySelector('i');
                    if (otherIcon) otherIcon.classList.remove('rotate-180');
                }
            });

            // Toggle actual
            content.classList.toggle('hidden');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });
}

// Selección de Servicios
function initServiceSelection() {
    // Usar event delegation para manejar todos los clicks
    document.addEventListener('click', function(e) {
        // Verificar si el click fue en un service-option o dentro de él
        const serviceOption = e.target.closest('.service-option');
        if (serviceOption) {
            // Encontrar el checkbox dentro de este service-option
            const checkbox = serviceOption.querySelector('.service-checkbox');
            if (checkbox) {
                // Cambiar el estado del checkbox
                checkbox.checked = !checkbox.checked;
                
                // Actualizar la apariencia visual
                serviceOption.classList.toggle('selected', checkbox.checked);
            }
        }
    });

    // También manejar cambios directos en el checkbox (por si el usuario hace click directamente en él)
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('service-checkbox')) {
            const serviceOption = e.target.closest('.service-option');
            if (serviceOption) {
                serviceOption.classList.toggle('selected', e.target.checked);
            }
        }
    });
}

// Formulario de Contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-300');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-300');
                }
            });

            // Validar que al menos un servicio esté seleccionado
            const selectedServices = this.querySelectorAll('input[name="services"]:checked');
            if (selectedServices.length === 0) {
                alert('Por favor, seleccioná al menos un servicio.');
                isValid = false;
            }
            
            if (!isValid) {
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Mostrar estado de carga
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75');
            
            // Simular envío
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showSuccessMessage();
                
                // Resetear formulario
                this.reset();
                
                // Resetear selección de servicios
                document.querySelectorAll('.service-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                // Restaurar botón
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75');
            }, 2000);
        });
    }
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    const successHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center fade-in">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-check text-green-500 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                <p class="text-gray-600 mb-4">Te contactaremos dentro de las próximas 24 horas para coordinar una visita y darte el presupuesto exacto.</p>
                <button onclick="closeSuccessMessage()" class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors">
                    Aceptar
                </button>
            </div>
        </div>
    `;
    
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = successHTML;
    messageDiv.id = 'success-message';
    document.body.appendChild(messageDiv);
}

function closeSuccessMessage() {
    const message = document.getElementById('success-message');
    if (message) {
        message.remove();
    }
}

// Navegación activa al hacer scroll (opcional)
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.getElementById('navbar').offsetHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'font-semibold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary', 'font-semibold');
            }
        });
    });
}

// Carrusel del Hero
function initHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Ocultar todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar slide actual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto advance
    let carouselInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });

    // Touch support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// En el DOMContentLoaded, agregar:
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    initHeroCarousel(); // Agregar esta línea
});