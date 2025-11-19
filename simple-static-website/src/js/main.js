/**
 * main.js - Aurethica Complete Application
 * Sistema SPA con todas las funcionalidades
 */

import { router } from './router.js';
import { pages } from './pages.js';

// Hacer router disponible globalmente
window.router = router;

// Registrar todas las páginas
Object.keys(pages).forEach(path => {
    router.register(path, (userData) => {
        document.getElementById('app').innerHTML = pages[path](router, userData);
        initPageHandlers(path, userData);
    });
});

// Preguntas del test
const testQuestions = [
    {
        question: "¿Qué estilo te describe mejor?",
        options: ["Clásico y elegante", "Moderno y atrevido", "Natural y relajado", "Versátil y adaptable"]
    },
    {
        question: "¿Con qué frecuencia cambias tu look?",
        options: ["Rara vez", "Cada temporada", "Frecuentemente", "Constantemente"]
    },
    {
        question: "¿Qué es más importante para ti?",
        options: ["Practicidad", "Tendencias", "Expresión personal", "Comodidad"]
    },
    {
        question: "¿Cuánto tiempo dedicas a tu rutina?",
        options: ["Menos de 15 min", "15-30 min", "30-60 min", "Más de 1 hora"]
    },
    {
        question: "¿Qué colores prefieres?",
        options: ["Neutros y naturales", "Vibrantes y llamativos", "Pasteles suaves", "Oscuros intensos"]
    }
];

let currentQuestion = 0;
let testAnswers = [];

// Inicializar handlers según la página
function initPageHandlers(page, userData) {
    switch(page) {
        case 'register':
            initRegisterForm();
            break;
        case 'login':
            initLoginForm();
            break;
        case 'test':
            initTest();
            break;
        case 'avatar':
            initAvatarUpload();
            break;
    }
}

// Formulario de registro
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const userData = Object.fromString(formData);
        
        if (formData.get('password') !== formData.get('confirmPassword')) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        router.navigate('gigiIntro', userData);
    });
}

// Formulario de login
function initLoginForm() {
    const form = document.getElementById('loginForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        router.navigate('app', { email: formData.get('email') });
    });
}

// Sistema de test
function initTest() {
    currentQuestion = 0;
    testAnswers = [];
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('questionContainer');
    const question = testQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / testQuestions.length) * 100;
    
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    container.innerHTML = `
        <div class="question-card">
            <h2>Pregunta ${currentQuestion + 1} de ${testQuestions.length}</h2>
            <h3 class="question-text">${question.question}</h3>
            <div class="options">
                ${question.options.map((option, i) => `
                    <button class="option-btn" onclick="selectAnswer(${i}, '${option}')">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

window.selectAnswer = function(index, answer) {
    testAnswers.push({ question: currentQuestion, answer });
    currentQuestion++;
    
    if (currentQuestion < testQuestions.length) {
        showQuestion();
    } else {
        finishTest();
    }
};

function finishTest() {
    setTimeout(() => {
        router.navigate('avatar');
    }, 500);
}

// Upload de avatar
function initAvatarUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('photoPreview');
    const continueBtn = document.getElementById('continueBtn');
    let uploadedFiles = [];
    
    uploadArea?.addEventListener('click', () => fileInput?.click());
    
    uploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea?.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
    
    fileInput?.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    function handleFiles(files) {
        uploadedFiles = Array.from(files);
        preview.innerHTML = '';
        
        uploadedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-img';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
        
        continueBtn.disabled = uploadedFiles.length === 0;
    }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✨ AURETHICA ', 'color: #d4af37; font-size: 24px; font-weight: bold;');
    console.log('%cUna belleza que ilumina sin excluir', 'color: #666; font-size: 14px;');
    
    router.init();
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Añadir clase 'scrolled' cuando haya scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== SMOOTH SCROLL PARA LINKS DE NAVEGACIÓN =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMACIONES AL HACER SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar secciones y tarjetas
    document.querySelectorAll('section, .service-card').forEach(element => {
        observer.observe(element);
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simular envío (en producción, aquí iría la llamada al backend)
            console.log('Formulario enviado:', { name, email, message });
            
            // Mostrar mensaje de éxito
            alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente.\n\nNos pondremos en contacto contigo pronto a: ${email}`);
            
            // Limpiar formulario
            this.reset();
        });
    }
    
    // ===== EFECTO PARALLAX EN HERO =====
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // ===== ACTIVE LINK EN NAVEGACIÓN =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - header.offsetHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== LOG DE BIENVENIDA =====
    console.log('%c✨ Aurethica ', 'color: #d4af37; font-size: 24px; font-weight: bold;');
    console.log('%cUna belleza que ilumina sin excluir', 'color: #666; font-size: 14px;');
    console.log('Sitio web cargado correctamente ✓');
});