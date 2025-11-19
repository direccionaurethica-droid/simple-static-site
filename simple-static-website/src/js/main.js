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

// Preguntas del test - 3 secciones
const testQuestions = [
    // SECCIÓN 1: Estilo Personal
    {
        section: "Estilo Personal",
        question: "¿Qué estilo te describe mejor?",
        options: ["Clásico y elegante", "Moderno y atrevido", "Natural y relajado", "Versátil y adaptable"]
    },
    {
        section: "Estilo Personal",
        question: "¿Con qué frecuencia cambias tu look?",
        options: ["Rara vez", "Cada temporada", "Frecuentemente", "Constantemente"]
    },
    {
        section: "Estilo Personal",
        question: "¿Qué es más importante para ti en tu estilo?",
        options: ["Practicidad", "Tendencias", "Expresión personal", "Comodidad"]
    },
    {
        section: "Estilo Personal",
        question: "¿Cómo describirías tu personalidad?",
        options: ["Reservada y sofisticada", "Audaz y extrovertida", "Tranquila y natural", "Dinámica y adaptable"]
    },
    {
        section: "Estilo Personal",
        question: "¿Qué ambiente te representa mejor?",
        options: ["Ciudad elegante", "Eventos nocturnos", "Naturaleza y aire libre", "Espacios creativos"]
    },
    
    // SECCIÓN 2: Preferencias de Color y Estética
    {
        section: "Color y Estética",
        question: "¿Qué colores prefieres en tu look?",
        options: ["Neutros y naturales", "Vibrantes y llamativos", "Pasteles suaves", "Oscuros intensos"]
    },
    {
        section: "Color y Estética",
        question: "¿Qué tonalidad te hace sentir mejor?",
        options: ["Tonos cálidos (dorados, naranjas)", "Tonos fríos (plateados, azules)", "Tonos neutros (beige, gris)", "Me gustan todos por igual"]
    },
    {
        section: "Color y Estética",
        question: "¿Prefieres un look...?",
        options: ["Monocromático y minimalista", "Contrastes llamativos", "Armonioso y sutil", "Experimental y único"]
    },
    {
        section: "Color y Estética",
        question: "¿Qué tipo de acabado prefieres?",
        options: ["Mate y natural", "Brillante y luminoso", "Satinado y suave", "Depende del momento"]
    },
    {
        section: "Color y Estética",
        question: "¿Cómo te gusta llevar el cabello?",
        options: ["Siempre perfecto y estructurado", "Con volumen y movimiento", "Natural y suelto", "Varía según mi estado de ánimo"]
    },
    
    // SECCIÓN 3: Rutina y Cuidados
    {
        section: "Rutina y Cuidados",
        question: "¿Cuánto tiempo dedicas a tu rutina de belleza?",
        options: ["Menos de 15 min", "15-30 min", "30-60 min", "Más de 1 hora"]
    },
    {
        section: "Rutina y Cuidados",
        question: "¿Con qué frecuencia visitas el salón?",
        options: ["Cada mes o menos", "Cada 2-3 meses", "Cada 4-6 meses", "Solo en ocasiones especiales"]
    },
    {
        section: "Rutina y Cuidados",
        question: "¿Qué tipo de productos prefieres?",
        options: ["Profesionales de alta gama", "Naturales y orgánicos", "Efectivos y asequibles", "Los que estén de moda"]
    },
    {
        section: "Rutina y Cuidados",
        question: "¿Qué servicio te interesa más?",
        options: ["Corte y peinado", "Color y mechas", "Tratamientos de cuidado", "Todo por igual"]
    },
    {
        section: "Rutina y Cuidados",
        question: "¿Qué buscas en un cambio de look?",
        options: ["Renovar mi imagen", "Seguir tendencias", "Cuidar mi cabello", "Expresar mi personalidad"]
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
        const userData = Object.fromEntries(formData);
        
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
            <div class="question-section">${question.section}</div>
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

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✨ AURETHICA ', 'color: #d4af37; font-size: 24px; font-weight: bold;');
    console.log('%cUna belleza que ilumina sin excluir', 'color: #666; font-size: 14px;');
    console.log('Aplicación cargada correctamente ✓');
    
    // Iniciar router
    router.init();
});
