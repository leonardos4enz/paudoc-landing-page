// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Gate selector functionality
const gateOptions = document.querySelectorAll('.gate-option');
const gateMainImage = document.getElementById('gateMainImage');
const gateTitle = document.getElementById('gateTitle');
const gateFinish = document.getElementById('gateFinish');
const gateMaterial = document.getElementById('gateMaterial');
const gatePrice = document.getElementById('gatePrice');

const gateData = {
    blanco_cuadro: {
        title: 'Blanco Cuadro',
        finish: 'Blanco mate con diseño cuadrado',
        material: 'Acero galvanizado',
        price: '$25,000 MXN',
        image: 'assets/portones/blanco_cuadro.png'
    },
    blanco_liso: {
        title: 'Blanco Liso',
        finish: 'Blanco liso elegante',
        material: 'Acero galvanizado',
        price: '$23,000 MXN',
        image: 'assets/portones/blanco_liso.png'
    },
    chocolate_liso: {
        title: 'Chocolate Liso',
        finish: 'Acabado chocolate mate',
        material: 'Acero galvanizado',
        price: '$27,000 MXN',
        image: 'assets/portones/chocolate_liso.png'
    },
    machimbre_duela: {
        title: 'Machimbre Duela',
        finish: 'Textura machimbre natural',
        material: 'Madera tratada',
        price: '$32,000 MXN',
        image: 'assets/portones/machimbre_duela.png'
    },
    madera_oscuro: {
        title: 'Madera Oscura',
        finish: 'Madera oscura premium',
        material: 'Madera noble tratada',
        price: '$35,000 MXN',
        image: 'assets/portones/madera_oscuro.png'
    },
    roble_claro: {
        title: 'Roble Claro',
        finish: 'Roble claro natural',
        material: 'Madera de roble',
        price: '$38,000 MXN',
        image: 'assets/portones/roble_claro.png'
    },
    roble_oscuro: {
        title: 'Roble Oscuro',
        finish: 'Roble oscuro elegante',
        material: 'Madera de roble premium',
        price: '$40,000 MXN',
        image: 'assets/portones/roble_oscuro.png'
    }
};

gateOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        gateOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update gate information
        const gateType = option.dataset.gate;
        const data = gateData[gateType];
        
        if (data) {
            gateMainImage.src = data.image;
            gateMainImage.alt = data.title;
            gateTitle.textContent = data.title;
            gateFinish.textContent = data.finish;
            gateMaterial.textContent = data.material;
            gatePrice.textContent = data.price;
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias por tu mensaje. Te contactaremos pronto.');
    this.reset();
});

// Enhanced scroll effect for header
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 50) {
        nav.classList.add('navbar-scrolled');
    } else {
        nav.classList.remove('navbar-scrolled');
    }
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Logo click animation
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add stagger animation delay to nav items
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((item, index) => {
        item.style.animation = `fadeInRight 0.8s ease-out ${0.6 + (index * 0.1)}s both`;
    });
});

// Advanced Hero Carousel Functionality
class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.dots = document.querySelectorAll('.nav-dot');
        this.prevBtn = document.querySelector('.nav-prev');
        this.nextBtn = document.querySelector('.nav-next');
        this.progressBar = document.querySelector('.progress-bar');
        
        this.autoPlayInterval = null;
        this.autoPlayDuration = 8000;
        this.isPlaying = true;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoPlay();
        this.updateProgressBar();
        
        // Initialize first slide
        this.slides[0].classList.add('active');
        this.dots[0].classList.add('active');
        
        // Add entrance animations
        setTimeout(() => {
            this.addSlideAnimations(0);
        }, 500);
    }
    
    bindEvents() {
        // Navigation dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.goToSlide(index);
                }
            });
        });
        
        // Arrow navigation
        this.prevBtn.addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.previousSlide();
            }
        });
        
        this.nextBtn.addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isInViewport() && !this.isTransitioning) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.toggleAutoPlay();
                        break;
                }
            }
        });
        
        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        carousel.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        carousel.addEventListener('mouseleave', () => {
            if (this.isPlaying) {
                this.startAutoPlay();
            }
        });
        
        // Touch/Swipe support
        this.addTouchSupport();
        
        // Visibility API for auto-play management
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else if (this.isPlaying) {
                this.startAutoPlay();
            }
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let threshold = 50;
        
        const carousel = document.querySelector('.hero-carousel');
        
        carousel.addEventListener('touchstart', (e) => {
            const touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (this.isTransitioning) return;
            
            const touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                e.preventDefault();
                if (distX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
    
    goToSlide(index) {
        if (index === this.currentSlide || this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.pauseAutoPlay();
        
        // Remove active classes
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active classes with delay for smooth transition
        setTimeout(() => {
            this.slides[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].classList.add('active');
            
            // Add slide animations
            this.addSlideAnimations(this.currentSlide);
            
            this.isTransitioning = false;
            this.updateProgressBar();
            
            if (this.isPlaying) {
                this.startAutoPlay();
            }
        }, 100);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDuration);
        this.updateProgressBar();
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.progressBar.style.animation = 'none';
    }
    
    toggleAutoPlay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
        }
    }
    
    updateProgressBar() {
        this.progressBar.style.animation = 'none';
        this.progressBar.offsetHeight; // Force reflow
        this.progressBar.style.animation = `progressAnimation ${this.autoPlayDuration}ms linear`;
    }
    
    addSlideAnimations(slideIndex) {
        const slide = this.slides[slideIndex];
        const elements = slide.querySelectorAll('.slide-badge, .slide-title, .slide-subtitle, .feature-item, .slide-actions, .floating-card, .stat-item');
        
        elements.forEach((element, index) => {
            element.style.animation = 'none';
            element.offsetHeight; // Force reflow
            
            const delay = index * 100;
            if (element.classList.contains('slide-badge')) {
                element.style.animation = `fadeInUp 0.6s ease-out ${delay}ms both`;
            } else if (element.classList.contains('slide-title')) {
                element.style.animation = `slideInLeft 0.8s ease-out ${delay}ms both`;
            } else if (element.classList.contains('slide-subtitle')) {
                element.style.animation = `fadeInUp 0.6s ease-out ${delay}ms both`;
            } else if (element.classList.contains('feature-item')) {
                element.style.animation = `scaleIn 0.5s ease-out ${delay}ms both`;
            } else if (element.classList.contains('slide-actions')) {
                element.style.animation = `fadeInUp 0.6s ease-out ${delay}ms both`;
            } else if (element.classList.contains('floating-card')) {
                element.style.animation = `slideInRight 0.8s ease-out ${delay}ms both, floatAnimation 6s ease-in-out infinite`;
            } else if (element.classList.contains('stat-item')) {
                element.style.animation = `scaleIn 0.5s ease-out ${delay}ms both, statPulse 4s ease-in-out infinite`;
            }
        });
    }
    
    isInViewport() {
        const carousel = document.querySelector('.hero-carousel');
        const rect = carousel.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Additional CSS animations for carousel
const additionalStyles = `
@keyframes fadeInUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(50px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes progressAnimation {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const heroCarousel = new HeroCarousel();
    
    // Add loading animation for hero section
    const hero = document.querySelector('.hero');
    setTimeout(() => {
        hero.classList.add('loaded');
    }, 100);
});

// Intersection Observer for performance optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .gate-option, .contact-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Advanced Services Section Interactions
class ServicesManager {
    constructor() {
        this.serviceCards = document.querySelectorAll('.service-card-advanced');
        this.statCircles = document.querySelectorAll('.stat-circle');
        this.isInitialized = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.animateOnScroll();
        this.initCounterAnimation();
        this.isInitialized = true;
    }

    bindEvents() {
        // Enhanced hover effects for service cards
        this.serviceCards.forEach((card, index) => {
            let hoverTimeout;
            
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 1024) {
                    clearTimeout(hoverTimeout);
                    this.triggerServiceAnimation(card, 'enter');
                    
                    // Add stagger effect for adjacent cards
                    this.addProximityEffect(index, true);
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (window.innerWidth > 1024) {
                    hoverTimeout = setTimeout(() => {
                        this.triggerServiceAnimation(card, 'leave');
                        this.addProximityEffect(index, false);
                    }, 100);
                }
            });

            // Click event for mobile and tablet devices
            card.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    this.toggleMobileService(card);
                }
            });
        });

        // Stat circles interactive effects
        this.statCircles.forEach(circle => {
            circle.addEventListener('mouseenter', () => {
                this.animateStatCircle(circle, true);
            });
            
            circle.addEventListener('mouseleave', () => {
                this.animateStatCircle(circle, false);
            });
        });

        // Service buttons functionality
        const serviceButtons = document.querySelectorAll('.service-btn');
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleServiceAction(button);
            });
        });
    }

    triggerServiceAnimation(card, action) {
        const icon = card.querySelector('.service-icon');
        const arrow = card.querySelector('.service-arrow');
        const featureTags = card.querySelectorAll('.feature-tag');

        if (action === 'enter') {
            icon.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(5deg)';
            icon.style.filter = 'drop-shadow(0 4px 12px rgba(213, 123, 1, 0.4))';
            
            if (arrow) {
                arrow.style.transform = 'translateX(8px) scale(1.2)';
            }

            featureTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                    tag.style.boxShadow = '0 4px 12px rgba(213, 123, 1, 0.2)';
                }, index * 50);
            });

        } else {
            icon.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
            icon.style.filter = 'none';
            
            if (arrow) {
                arrow.style.transform = 'translateX(0) scale(1)';
            }

            featureTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = 'none';
            });
        }
    }

    addProximityEffect(activeIndex, isEntering) {
        this.serviceCards.forEach((card, index) => {
            if (index === activeIndex) return;

            const distance = Math.abs(index - activeIndex);
            const intensity = Math.max(0, 1 - (distance * 0.3));

            if (isEntering && intensity > 0) {
                card.style.transform = `translateY(-${intensity * 5}px) scale(${1 + intensity * 0.02})`;
                card.style.filter = `brightness(${1 + intensity * 0.1})`;
            } else {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.filter = 'brightness(1)';
            }
        });
    }

    toggleMobileService(card) {
        const serviceBack = card.querySelector('.service-back');
        const isVisible = serviceBack.style.display === 'block';
        
        // Hide all other service backs
        this.serviceCards.forEach(otherCard => {
            if (otherCard !== card) {
                const otherBack = otherCard.querySelector('.service-back');
                otherBack.style.display = 'none';
                otherCard.classList.remove('mobile-active');
            }
        });

        // Toggle current service back
        serviceBack.style.display = isVisible ? 'none' : 'block';
        card.classList.toggle('mobile-active', !isVisible);

        if (!isVisible) {
            serviceBack.style.animation = 'slideInUp 0.4s ease-out forwards';
        }
    }

    animateStatCircle(circle, isHovering) {
        const number = circle.querySelector('.stat-number');
        
        if (isHovering) {
            circle.style.transform = 'translateY(-8px) scale(1.1) rotate(5deg)';
            circle.style.boxShadow = '0 15px 45px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.9)';
            number.style.transform = 'scale(1.2)';
            number.style.color = 'var(--primary-green)';
        } else {
            circle.style.transform = '';
            circle.style.boxShadow = '';
            number.style.transform = '';
            number.style.color = '';
        }
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe service cards
        this.serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            observer.observe(card);

            // Add stagger delay
            card.setAttribute('data-animation-delay', index * 150);
        });

        // Observe stat circles
        this.statCircles.forEach(circle => {
            observer.observe(circle);
        });
    }

    triggerScrollAnimation(element) {
        const delay = element.getAttribute('data-animation-delay') || 0;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        }, delay);
    }

    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(counter) {
        counter.setAttribute('data-counted', 'true');
        const text = counter.textContent;
        const isNumber = /^\d+/.test(text);
        
        if (!isNumber) return;

        const finalValue = parseInt(text);
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(finalValue * easeOut);
            
            counter.textContent = text.replace(/^\d+/, currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    handleServiceAction(button) {
        const buttonText = button.textContent;
        
        // Add ripple effect
        this.addRippleEffect(button);
        
        // Simulate action feedback
        setTimeout(() => {
            console.log(`Service action triggered: ${buttonText}`);
            // Here you would typically trigger navigation or modal
        }, 200);
    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialize Services Manager
document.addEventListener('DOMContentLoaded', () => {
    const servicesManager = new ServicesManager();
});

// Additional CSS for animations
const serviceAnimationStyles = `
@keyframes slideInUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

.service-card-advanced.mobile-active {
    background: linear-gradient(145deg, #f8fafc, var(--light-gray));
}

.service-card-advanced.mobile-active .service-front {
    border-bottom: 2px solid var(--primary-orange);
}
`;

const serviceStyleSheet = document.createElement('style');
serviceStyleSheet.textContent = serviceAnimationStyles;
document.head.appendChild(serviceStyleSheet);

// Advanced About Section Manager
class AboutSectionManager {
    constructor() {
        this.counters = document.querySelectorAll('.counter-number, .stat-number');
        this.featureCards = document.querySelectorAll('.feature-card');
        this.statItems = document.querySelectorAll('.stat-item');
        this.isInitialized = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
        this.initParallaxEffects();
        this.isInitialized = true;
    }

    bindEvents() {
        // Feature cards interactive effects
        this.featureCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                this.triggerFeatureAnimation(card, 'enter');
                this.addProximityEffect(this.featureCards, index, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.triggerFeatureAnimation(card, 'leave');
                this.addProximityEffect(this.featureCards, index, false);
            });

            // Click effect for mobile
            card.addEventListener('click', () => {
                this.addRippleEffect(card);
            });
        });


        // Stat items interactive effects
        this.statItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateStatItem(item, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateStatItem(item, false);
            });
        });
    }

    triggerFeatureAnimation(card, action) {
        const icon = card.querySelector('.feature-icon i');
        const highlight = card.querySelector('.feature-highlight');
        
        if (action === 'enter') {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.filter = 'drop-shadow(0 4px 15px rgba(213, 123, 1, 0.5))';
            
            if (highlight) {
                highlight.style.transform = 'translateY(-3px) scale(1.05)';
                highlight.style.boxShadow = '0 4px 15px rgba(213, 123, 1, 0.2)';
            }
        } else {
            icon.style.transform = '';
            icon.style.filter = '';
            
            if (highlight) {
                highlight.style.transform = '';
                highlight.style.boxShadow = '';
            }
        }
    }

    addProximityEffect(elements, activeIndex, isEntering) {
        elements.forEach((element, index) => {
            if (index === activeIndex) return;

            const distance = Math.abs(index - activeIndex);
            const intensity = Math.max(0, 1 - (distance * 0.4));

            if (isEntering && intensity > 0) {
                element.style.transform = `translateY(-${intensity * 3}px) scale(${1 + intensity * 0.01})`;
                element.style.filter = `brightness(${1 + intensity * 0.05})`;
            } else {
                element.style.transform = '';
                element.style.filter = '';
            }
        });
    }

    animateStatItem(item, isHovering) {
        const icon = item.querySelector('.stat-icon');
        const number = item.querySelector('.stat-number, .stat-text');
        
        if (isHovering) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = '0 6px 25px rgba(213, 123, 1, 0.4)';
            number.style.transform = 'scale(1.05)';
        } else {
            icon.style.transform = '';
            icon.style.boxShadow = '';
            number.style.transform = '';
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScrollAnimation(entry.target);
                    
                    // Trigger counter animation
                    if (entry.target.hasAttribute('data-target')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe animated elements
        [...this.featureCards, ...this.statItems].forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.setAttribute('data-animation-delay', index * 100);
            observer.observe(element);
        });

        // Observe counters separately to ensure they trigger
        this.counters.forEach(counter => {
            observer.observe(counter);
        });

        // Observe stat items for their numbers specifically
        this.statItems.forEach(statItem => {
            const statNumber = statItem.querySelector('.stat-number');
            if (statNumber && statNumber.hasAttribute('data-target')) {
                observer.observe(statNumber);
            }
        });
    }

    triggerScrollAnimation(element) {
        const delay = element.getAttribute('data-animation-delay') || 0;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            // Add special effects for different element types
            if (element.classList.contains('feature-card')) {
                setTimeout(() => {
                    element.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
                }, 300);
            }
            
        }, delay);
    }

    animateCounter(counter) {
        if (counter.hasAttribute('data-counted')) return;
        
        counter.setAttribute('data-counted', 'true');
        const target = parseInt(counter.getAttribute('data-target'));
        
        if (isNaN(target)) return;

        const duration = 2500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth acceleration
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(target * easeOut);
            
            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Add completion effect
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = '';
                }, 200);
            }
        };

        requestAnimationFrame(animate);
    }

    initParallaxEffects() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('.about');
        
        if (!aboutSection) return;

        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible) return;

        // Parallax effect for decoration elements
        const decorations = document.querySelectorAll('.decoration-element');
        decorations.forEach((decoration, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            decoration.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(213, 123, 1, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Reviews Carousel Manager
class ReviewsCarousel {
    constructor() {
        this.carousel = document.querySelector('.reviews-carousel');
        this.track = document.querySelector('.reviews-track');
        this.cards = Array.from(document.querySelectorAll('.review-card'));
        this.prevBtn = document.querySelector('.reviews-prev');
        this.nextBtn = document.querySelector('.reviews-next');
        
        if (!this.carousel || !this.track || this.cards.length === 0) return;
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalCards = this.cards.length;
        this.isTransitioning = false;
        
        // Create infinite loop by cloning cards
        this.createInfiniteLoop();
        
        this.init();
    }
    
    createInfiniteLoop() {
        // Clone first few cards and append to end
        const clonesToAdd = Math.max(2, this.cardsPerView);
        for (let i = 0; i < clonesToAdd; i++) {
            const clone = this.cards[i].cloneNode(true);
            clone.classList.add('cloned');
            this.track.appendChild(clone);
        }
        
        // Clone last few cards and prepend to beginning  
        for (let i = this.cards.length - clonesToAdd; i < this.cards.length; i++) {
            const clone = this.cards[i].cloneNode(true);
            clone.classList.add('cloned');
            this.track.insertBefore(clone, this.track.firstChild);
        }
        
        // Update cards array to include clones
        this.allCards = Array.from(document.querySelectorAll('.review-card'));
        
        // Set initial position (skip the prepended clones)
        this.currentIndex = clonesToAdd;
    }

    init() {
        this.updateCarousel();
        this.bindEvents();
        this.setupAutoplay();
        
        // Initial animation for reviews section
        this.animateReviewsOnScroll();
    }
    
    getCardsPerView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth >= 1024) return 2;
        if (viewportWidth >= 768) return 1;
        return 1;
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.goToPrevious());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.goToNext());
        }
        
        
        // Touch/swipe support
        this.setupTouchEvents();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.goToPrevious();
            if (e.key === 'ArrowRight') this.goToNext();
        });
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoplay());
    }
    
    setupTouchEvents() {
        let startX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoplay();
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        }, { passive: false });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const deltaX = startX - endX;
            
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.goToNext();
                } else {
                    this.goToPrevious();
                }
            }
            
            isDragging = false;
            this.resumeAutoplay();
        });
    }
    
    goToPrevious() {
        if (this.isTransitioning) return;
        this.currentIndex--;
        this.updateCarousel();
        this.addRippleEffect(this.prevBtn);
    }
    
    goToNext() {
        if (this.isTransitioning) return;
        this.currentIndex++;
        this.updateCarousel();
        this.addRippleEffect(this.nextBtn);
    }
    
    
    updateTransform() {
        const cardWidth = this.allCards[0]?.offsetWidth || 0;
        const gap = 24; // 1.5rem gap
        const offset = -(this.currentIndex * (cardWidth + gap));
        this.track.style.transform = `translateX(${offset}px)`;
    }

    updateCarousel() {
        const clonesToAdd = Math.max(2, this.cardsPerView);
        this.isTransitioning = true;
        
        // Apply the transform with transition
        this.updateTransform();
        
        // Handle infinite loop after transition completes
        setTimeout(() => {
            // If we're at the end clones, jump to beginning
            if (this.currentIndex >= this.totalCards + clonesToAdd) {
                this.track.style.transition = 'none';
                this.currentIndex = clonesToAdd;
                this.updateTransform();
                
                // Re-enable transition after a frame
                requestAnimationFrame(() => {
                    this.track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    this.isTransitioning = false;
                });
            }
            // If we're at the beginning clones, jump to end
            else if (this.currentIndex < clonesToAdd) {
                this.track.style.transition = 'none';
                this.currentIndex = this.totalCards + clonesToAdd - 1;
                this.updateTransform();
                
                // Re-enable transition after a frame
                requestAnimationFrame(() => {
                    this.track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    this.isTransitioning = false;
                });
            } else {
                this.isTransitioning = false;
            }
        }, 800); // Match transition duration
    }
    
    
    setupAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.goToNext();
        }, 5000); // 5 seconds
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
    
    resumeAutoplay() {
        this.pauseAutoplay();
        this.setupAutoplay();
    }
    
    handleResize() {
        const newCardsPerView = this.getCardsPerView();
        if (newCardsPerView !== this.cardsPerView) {
            this.cardsPerView = newCardsPerView;
            this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateCarousel();
        }
    }
    
    addRippleEffect(button) {
        if (!button) return;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(74, 144, 226, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    
    animateReviewsOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const reviewCards = entry.target.querySelectorAll('.review-card');
                    reviewCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, index * 150);
                    });
                }
            });
        }, {
            threshold: 0.2
        });
        
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        if (reviewsCarousel) {
            // Initially hide cards for animation
            const reviewCards = reviewsCarousel.querySelectorAll('.review-card');
            reviewCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
            });
            
            observer.observe(reviewsCarousel);
        }
    }
}

// Initialize Reviews Carousel and About Section Manager
document.addEventListener('DOMContentLoaded', () => {
    const reviewsCarousel = new ReviewsCarousel();
    const aboutManager = new AboutSectionManager();
});

// Additional CSS animations for about section
const aboutAnimationStyles = `
.ripple-effect {
    animation: ripple 0.6s linear;
}
`;

const aboutStyleSheet = document.createElement('style');
aboutStyleSheet.textContent = aboutAnimationStyles;
document.head.appendChild(aboutStyleSheet);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
}