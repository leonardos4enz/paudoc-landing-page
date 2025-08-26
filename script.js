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