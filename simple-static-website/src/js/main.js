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

// Preguntas del test - Original design from Figma
const testQuestions = [
    {
        id: 1,
        question: "¿Usas tu cabello como un complemento más y lo ves una forma de expresión?",
        options: [
            "Sí, mi cabello es una forma de expresión para mí",
            "No, lo cuido de forma práctica"
        ]
    },
    {
        id: 2,
        question: "¿Qué priorizas con tu cabello?",
        conditionalOptions: {
            condition: 1,
            optionsA: [
                "Mi identidad y estado de ánimo",
                "Estilo y cuidado estético, sin carga emocional",
                "Adecuación a cada ocasión"
            ],
            optionsB: [
                "Comodidad y rapidez",
                "Funcionalidad (que esté presentable)"
            ]
        },
        options: [] // Will be filled dynamically based on Q1 answer
    },
    {
        id: 3,
        question: "¿Qué lugar ocupan los accesorios para el cabello en tu día a día?",
        conditionalOptions: {
            condition: 1,
            optionsA: [
                "Imprescindibles: siempre elevan el look",
                "Clásica: horquillas, diademas o coleteros combinados",
                "Básico: llevo siempre lo mismo"
            ],
            optionsB: [
                "Importantes, pero sin robar protagonismo",
                "Nada o casi nada"
            ]
        },
        options: [] // Will be filled dynamically based on Q1 answer
    },
    {
        id: 4,
        question: "¿Estás satisfecha con el tiempo que dedicas a tu cabello?",
        options: [
            "Estoy satisfecha: tengo el tiempo que necesito",
            "Quiero ser más práctica (menos tiempo)",
            "Quiero dedicarme más tiempo"
        ]
    },
    {
        id: 5,
        question: "¿Cuánto tiempo le dedicas actualmente a tu cabello cada día?",
        options: [
            "Menos de 5 min",
            "5–15 min",
            "15–30 min",
            "Más de 30 min"
        ]
    },
    {
        id: 6,
        question: "¿Cómo te sientes con tu gasto actual en cuidado capilar?",
        options: [
            "Gasto demasiado (mucho mantenimiento o tratamientos)",
            "Pago justo por la calidad que recibo",
            "Es económico para lo que me aporta"
        ]
    },
    {
        id: 7,
        question: "¿Qué presupuesto gastas mensualmente en tu cabello?",
        options: [
            "Menos de 30 €",
            "30–70 €",
            "70–150 €",
            "Más de 150 €"
        ]
    },
    {
        id: 8,
        question: "Si tu cabello quedara perfecto siempre… ¿aumentarías tu gasto mensual?",
        options: [
            "No, mantendría mi gasto actual",
            "Sí, hasta un 25% más",
            "Sí, hasta el doble",
            "Sí, incluso más del doble",
            "Sí, si fueran servicios o productos clave que duran"
        ]
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
    
    // Get options (handle conditional options based on Q1)
    let options = question.options;
    if (question.conditionalOptions && testAnswers.length > 0) {
        const firstAnswer = testAnswers[0].answer;
        if (firstAnswer === "Sí, mi cabello es una forma de expresión para mí") {
            options = question.conditionalOptions.optionsA;
        } else if (firstAnswer === "No, lo cuido de forma práctica") {
            options = question.conditionalOptions.optionsB;
        }
    }
    
    container.innerHTML = `
        <div class="question-card">
            <h2>Pregunta ${currentQuestion + 1} de ${testQuestions.length}</h2>
            <h3 class="question-text">${question.question}</h3>
            <div class="options">
                ${options.map((option, i) => `
                    <button class="option-btn" onclick="selectAnswer(${i}, '${option.replace(/'/g, "\\'")}')">
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
