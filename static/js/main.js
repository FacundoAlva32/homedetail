// Home Detail - JavaScript optimizado para móvil
// ==============================================

// Configuración global
const CONFIG = {
    carouselAutoAdvance: 5000, // 5 segundos
    successMessageDuration: 5000, // 5 segundos
    scrollOffset: 80, // Offset para scroll suave (header height)
    debounceDelay: 50, // Delay para eventos de scroll/resize
};

// Cache de elementos DOM frecuentemente usados
let DOM_CACHE = {
    mobileMenu: null,
    mobileMenuBtn: null,
    contactForm: null,
    heroCarousel: null,
    backToTopBtn: null,
    navbar: null,
};

// ========================================
// 1. INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Home Detail - Hidrolavado Profesional cargado');
    
    // Cachear elementos DOM
    cacheDOMElements();
    
    // Inicializar todas las funcionalidades
    initAll();
    
    // Inicializar listeners de performance
    initPerformanceListeners();
});

function cacheDOMElements() {
    DOM_CACHE = {
        mobileMenu: document.getElementById('mobile-menu'),
        mobileMenuBtn: document.getElementById('mobile-menu-btn'),
        contactForm: document.getElementById('contact-form'),
        heroCarousel: document.getElementById('hero-carousel'),
        backToTopBtn: document.querySelector('.back-to-top'),
        navbar: document.getElementById('navbar'),
    };
}

function initAll() {
    // Core functionalities
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initNavbarScroll();
    
    // Interactive components
    initHeroCarousel();
    initComparisonSliders();
    initFAQAccordion();
    initServiceSelection();
    
    // Forms
    initContactForm();
    
    // External integrations
    initWhatsAppButtons();
    initPhoneButtons();
    
    // AOS initialization
    initAOS();
}

function initPerformanceListeners() {
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            handleResize();
        }, CONFIG.debounceDelay);
    });
    
    // Lazy load images
    initLazyLoading();
    
    // Preconnect to external domains
    preconnectExternalResources();
}

// ========================================
// 2. CORE FUNCTIONALITIES
// ========================================

// Mobile Menu - CERRAR AL HACER CLIC EN OPCIÓN
function initMobileMenu() {
    const { mobileMenu, mobileMenuBtn } = DOM_CACHE;
    
    if (!mobileMenu || !mobileMenuBtn) return;
    
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    // Función para cerrar el menú
    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
    
    // Función para abrir/alternar el menú
    function toggleMenu() {
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            mobileMenu.classList.add('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Evento en el botón del menú
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Cerrar menú al hacer clic en CUALQUIER enlace dentro del menú
    mobileMenu.addEventListener('click', function(e) {
        // Verificar si el clic fue en un enlace
        const link = e.target.closest('a');
        if (link) {
            const href = link.getAttribute('href');
            
            // Solo cerrar si es un enlace interno (#)
            if (href && href.startsWith('#')) {
                closeMenu();
            }
            // Para enlaces externos, dejar que se abran normalmente
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al cambiar a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });
}

// Smooth Scroll - Mejorado
function initSmoothScroll() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        
        if (target && target.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetId = target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = DOM_CACHE.navbar ? DOM_CACHE.navbar.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (DOM_CACHE.mobileMenu && DOM_CACHE.mobileMenu.classList.contains('open')) {
                    closeMobileMenu();
                }
            }
        }
    });
}

// Función auxiliar para cerrar menú
function closeMobileMenu() {
    const { mobileMenu, mobileMenuBtn } = DOM_CACHE;
    
    if (!mobileMenu || !mobileMenuBtn) return;
    
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenu.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    if (menuIcon) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
    
    document.body.style.overflow = '';
}

// Back to Top Button
function initBackToTop() {
    const { backToTopBtn } = DOM_CACHE;
    
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }
    
    // Scroll listener debounced
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(toggleBackToTop, CONFIG.debounceDelay);
    });
    
    // Initial check
    toggleBackToTop();
    
    // Click handler
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const { navbar } = DOM_CACHE;
    
    if (!navbar) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            navbar.classList.add('shadow-lg');
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backdropFilter = 'blur(0px)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// ========================================
// 3. INTERACTIVE COMPONENTS
// ========================================

// Hero Carousel - Optimizado para mobile
function initHeroCarousel() {
    const carousel = DOM_CACHE.heroCarousel;
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let autoAdvanceInterval;
    
    function showSlide(index) {
        // Validar índice
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Ocultar todas las slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar slide actual
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startAutoAdvance() {
        if (window.innerWidth > 768) { // Solo en desktop
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = setInterval(nextSlide, CONFIG.carouselAutoAdvance);
        }
    }
    
    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoAdvance();
            nextSlide();
            startAutoAdvance();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoAdvance();
            prevSlide();
            startAutoAdvance();
        });
    }
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoAdvance();
            showSlide(index);
            startAutoAdvance();
        });
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoAdvance();
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoAdvance();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Auto-advance management
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    carousel.addEventListener('touchstart', stopAutoAdvance, { passive: true });
    carousel.addEventListener('touchend', startAutoAdvance, { passive: true });
    
    // Initial setup
    showSlide(0);
    startAutoAdvance();
    
    // Pause on visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoAdvance();
        } else {
            startAutoAdvance();
        }
    });
}

// Comparison Sliders - Touch optimized
function initComparisonSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    if (!sliders.length) return;
    
    sliders.forEach((slider, index) => {
        const afterImage = slider.querySelector('.comparison-item-after');
        const handle = slider.querySelector('.handle');
        let isDragging = false;
        
        // Inicializar en 50%
        afterImage.style.clipPath = 'inset(0 50% 0 0)';
        if (handle) handle.style.left = '50%';
        
        function updateSlider(x) {
            const rect = slider.getBoundingClientRect();
            
            // Calcular porcentaje
            let percentage = ((x - rect.left) / rect.width) * 100;
            
            // Limitar entre 0 y 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            // Aplicar cambios
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            if (handle) handle.style.left = `${percentage}%`;
        }
        
        // Mouse events
        slider.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return; // Solo botón izquierdo
            isDragging = true;
            updateSlider(e.clientX);
            slider.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            slider.style.cursor = 'ew-resize';
        });
        
        // Touch events
        slider.addEventListener('touchstart', function(e) {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
            e.preventDefault();
        }, { passive: false });
        
        slider.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
            e.preventDefault();
        }, { passive: false });
        
        slider.addEventListener('touchend', function() {
            isDragging = false;
        });
        
        // Keyboard support
        slider.setAttribute('tabindex', '0');
        slider.setAttribute('role', 'slider');
        slider.setAttribute('aria-valuemin', '0');
        slider.setAttribute('aria-valuemax', '100');
        slider.setAttribute('aria-valuenow', '50');
        slider.setAttribute('aria-label', `Comparador de imágenes ${index + 1}`);
        
        slider.addEventListener('keydown', function(e) {
            let newValue = 50;
            
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    newValue = Math.max(0, 50 - 5);
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    newValue = Math.min(100, 50 + 5);
                    break;
                case 'Home':
                    newValue = 0;
                    break;
                case 'End':
                    newValue = 100;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            const rect = slider.getBoundingClientRect();
            const x = rect.left + (rect.width * newValue / 100);
            updateSlider(x);
            slider.setAttribute('aria-valuenow', newValue);
        });
    });
}

// FAQ Accordion - Mejorado
function initFAQAccordion() {
    const faqButtons = document.querySelectorAll('.faq-button');
    if (!faqButtons.length) return;
    
    faqButtons.forEach(button => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');
        
        // Inicializar cerrado
        content.classList.add('hidden');
        
        button.addEventListener('click', function() {
            const isOpening = content.classList.contains('hidden');
            
            // Cerrar todos los demás
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
                if (isOpening) {
                    icon.classList.add('rotate-180');
                } else {
                    icon.classList.remove('rotate-180');
                }
            }
            
            // Actualizar aria-expanded
            button.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
        });
        
        // Keyboard support
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-expanded', 'false');
        
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

// Service Selection - Touch optimized
function initServiceSelection() {
    const serviceOptions = document.querySelectorAll('.service-option');
    if (!serviceOptions.length) return;
    
    // Usar event delegation para mejor performance
    document.addEventListener('click', function(e) {
        const serviceOption = e.target.closest('.service-option');
        
        if (serviceOption) {
            const checkbox = serviceOption.querySelector('.service-checkbox');
            
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                updateServiceOption(serviceOption, checkbox.checked);
            }
        }
    });
    
    // También manejar cambios directos en el checkbox
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('service-checkbox')) {
            const serviceOption = e.target.closest('.service-option');
            if (serviceOption) {
                updateServiceOption(serviceOption, e.target.checked);
            }
        }
    });
    
    // Touch feedback
    serviceOptions.forEach(option => {
        option.addEventListener('touchstart', function() {
            this.classList.add('active-touch');
        }, { passive: true });
        
        option.addEventListener('touchend', function() {
            this.classList.remove('active-touch');
        }, { passive: true });
    });
    
    function updateServiceOption(element, isChecked) {
        element.classList.toggle('selected', isChecked);
        
        // Actualizar atributos ARIA
        const checkbox = element.querySelector('.service-checkbox');
        if (checkbox) {
            checkbox.setAttribute('aria-checked', isChecked.toString());
        }
    }
}

// ========================================
// 4. FORMS & SUBMISSIONS
// ========================================

// Contact Form - Validación mejorada
function initContactForm() {
    const { contactForm } = DOM_CACHE;
    if (!contactForm) return;
    
    // Configuración de validación
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        },
        phone: {
            required: true,
            pattern: /^[\d\s\+\-\(\)]{7,20}$/
        },
        email: {
            required: false,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        zone: {
            required: true
        },
        services: {
            required: true
        }
    };
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        showLoadingState(submitBtn, 'Enviando...');
        
        try {
            // Simular envío (en producción sería una petición real)
            await simulateFormSubmission(formData);
            
            // Mostrar éxito
            showSuccessMessage();
            
            // Resetear formulario
            contactForm.reset();
            
            // Resetear selección de servicios
            document.querySelectorAll('.service-option').forEach(option => {
                option.classList.remove('selected');
            });
            
        } catch (error) {
            showErrorMessage('Hubo un error al enviar el formulario. Por favor, intentá nuevamente.');
        } finally {
            // Restaurar botón
            restoreButtonState(submitBtn, originalContent);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Validación functions
    function validateForm() {
        let isValid = true;
        const requiredServices = contactForm.querySelectorAll('input[name="services"]:checked');
        
        // Validar campos individuales
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        // Validar servicios
        if (requiredServices.length === 0) {
            showFieldError(contactForm.querySelector('.service-option'), 'Seleccioná al menos un servicio');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const fieldName = field.name;
        const rules = validationRules[fieldName];
        if (!rules) return true;
        
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Validación de campo requerido
        if (rules.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        }
        
        // Validación de longitud mínima
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Mínimo ${rules.minLength} caracteres`;
        }
        
        // Validación de longitud máxima
        if (isValid && rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `Máximo ${rules.maxLength} caracteres`;
        }
        
        // Validación de patrón
        if (isValid && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = 'Formato inválido';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        const fieldContainer = field.closest('div') || field.closest('.service-option');
        field.classList.add('error');
        
        // Crear o actualizar mensaje de error
        let errorElement = fieldContainer.querySelector('.error-text');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-text';
            fieldContainer.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const fieldContainer = field.closest('div') || field.closest('.service-option');
        const errorElement = fieldContainer.querySelector('.error-text');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// ========================================
// 5. EXTERNAL INTEGRATIONS
// ========================================

// WhatsApp Buttons
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    
    whatsappButtons.forEach(button => {
        // Añadir analytics tracking
        button.addEventListener('click', function() {
            trackEvent('whatsapp_click', {
                location: this.closest('section')?.id || 'unknown',
                text: this.textContent.trim()
            });
        });
    });
}

// Phone Buttons
function initPhoneButtons() {
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    
    phoneButtons.forEach(button => {
        // Añadir analytics tracking
        button.addEventListener('click', function() {
            trackEvent('phone_click', {
                location: this.closest('section')?.id || 'unknown',
                phone_number: this.getAttribute('href').replace('tel:', '')
            });
        });
    });
}

// ========================================
// 6. PERFORMANCE & OPTIMIZATION
// ========================================

// Lazy Loading para imágenes
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Preconnect to external resources
function preconnectExternalResources() {
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com',
        'https://unpkg.com',
        'https://images.unsplash.com'
    ];
    
    preconnectLinks.forEach(link => {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = link;
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
    });
}

// Handle resize events
function handleResize() {
    // Actualizar carrusel si es necesario
    const carousel = DOM_CACHE.heroCarousel;
    if (carousel && window.innerWidth <= 768) {
        // Pausar auto-advance en mobile
        const slides = carousel.querySelectorAll('.carousel-slide');
        if (slides.length > 0) {
            // Mantener solo una slide activa
            slides.forEach((slide, index) => {
                if (index !== 0) slide.style.display = 'none';
            });
        }
    }
}

// AOS initialization
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 50,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
    }
}

// ========================================
// 7. UTILITY FUNCTIONS
// ========================================

// Simulate form submission
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // En producción, aquí iría una petición fetch real
            console.log('Form data:', Object.fromEntries(formData));
            
            // Simular éxito 95% del tiempo
            if (Math.random() > 0.05) {
                resolve();
            } else {
                reject(new Error('Simulated error'));
            }
        }, 1500);
    });
}

// Show success message
function showSuccessMessage() {
    const successHTML = `
        <div id="success-message" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-fade-in">
            <div class="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-check text-green-500 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                <p class="text-gray-600 mb-6">Te contactaremos dentro de las próximas 24 horas para coordinar una visita y darte el presupuesto exacto.</p>
                <button onclick="window.closeSuccessMessage()" 
                        class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full active:scale-95">
                    Aceptar
                </button>
            </div>
        </div>
    `;
    
    const existingMessage = document.getElementById('success-message');
    if (existingMessage) existingMessage.remove();
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    // Auto-close después de 5 segundos
    setTimeout(() => {
        window.closeSuccessMessage();
    }, CONFIG.successMessageDuration);
}

// Close success message (global function)
window.closeSuccessMessage = function() {
    const message = document.getElementById('success-message');
    if (message) {
        message.style.opacity = '0';
        message.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            message.remove();
        }, 300);
    }
};

// Show error message
function showErrorMessage(message) {
    const errorHTML = `
        <div id="error-message" class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-[100] animate-slide-in-left max-w-xs">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-exclamation-circle"></i>
                <span class="font-medium">${message}</span>
            </div>
        </div>
    `;
    
    const existingError = document.getElementById('error-message');
    if (existingError) existingError.remove();
    
    document.body.insertAdjacentHTML('beforeend', errorHTML);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        const error = document.getElementById('error-message');
        if (error) error.remove();
    }, 5000);
}

// Show loading state
function showLoadingState(button, loadingText) {
    button.disabled = true;
    button.classList.add('opacity-75', 'btn-loading');
    button.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i>${loadingText}`;
}

// Restore button state
function restoreButtonState(button, originalContent) {
    button.disabled = false;
    button.classList.remove('opacity-75', 'btn-loading');
    button.innerHTML = originalContent;
}

// Track events
function trackEvent(eventName, eventData = {}) {
    // Aquí iría la integración con Google Analytics, etc.
    console.log(`Event: ${eventName}`, eventData);
    
    // Ejemplo básico de Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// ========================================
// 8. POLYFILLS & FALLBACKS
// ========================================

// Polyfill for older browsers
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

// Polyfill for Element.closest()
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Polyfill for NodeList.forEach()
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// ========================================
// 9. SERVICE WORKER (PWA)
// ========================================

// Register service worker for PWA
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// ========================================
// 10. PERFORMANCE METRICS
// ========================================

// Log performance metrics
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`🚀 Page loaded in ${loadTime}ms`);
            
            // Send to analytics if load time is too high
            if (loadTime > 3000) {
                console.warn('⚠️ Page load time exceeds 3 seconds');
            }
        }, 0);
    });
}

// ========================================
// 11. ERROR HANDLING
// ========================================

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    
    // En producción, enviar a servicio de monitoreo
    if (window.location.hostname !== 'localhost') {
        // trackError(e.error);
    }
    
    // Prevenir que el error se propague
    e.preventDefault();
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// ========================================
// 12. ACCESSIBILITY IMPROVEMENTS
// ========================================

// Focus management for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// Skip to main content link
function initSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1000] focus:bg-white focus:p-4 focus:rounded';
    skipLink.textContent = 'Saltar al contenido principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize skip link
initSkipLink();

// ========================================
// READY STATE
// ========================================

// Mark page as interactive
document.addEventListener('readystatechange', function() {
    if (document.readyState === 'interactive') {
        document.documentElement.classList.add('js-loaded');
    }
    
    if (document.readyState === 'complete') {
        document.documentElement.classList.add('js-ready');
        
        // Remove loading class after a short delay
        setTimeout(function() {
            document.documentElement.classList.remove('js-loading');
        }, 100);
    }
});

// Initial loading state
document.documentElement.classList.add('js-loading');

// ========================================
// EXPORTS (para testing)
// ========================================

// Solo para desarrollo/testing
if (process.env.NODE_ENV === 'development') {
    window.HomeDetail = {
        config: CONFIG,
        cache: DOM_CACHE,
        utils: {
            showSuccessMessage,
            showErrorMessage,
            closeSuccessMessage: window.closeSuccessMessage,
            trackEvent,
            closeMobileMenu
        }
    };
}

// ========================================
// FINAL INITIALIZATION
// ========================================

// Log initialization completion
console.log('✅ Home Detail JavaScript inicializado correctamente');

