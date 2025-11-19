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

// Calibración de Gigi - 5 preguntas de personalización
const calibrationQuestions = [
    {
        id: 'confianza',
        title: 'Confianza',
        description: '¿Cómo prefieres que Gigi te acompañe en tus decisiones?',
        options: [
            { value: 'neutro', label: 'Neutro', description: 'Puedo orientarte para que tomes la mejor decisión sobre tu estilo.' },
            { value: 'suave', label: 'Suave', description: 'Quiero que sientas que puedes confiar y decidir sin presión.' },
            { value: 'equilibrado', label: 'Equilibrado', description: 'Estoy aquí para ayudarte a decidir desde la calma y la seguridad.' },
            { value: 'firme', label: 'Firme', description: 'Voy a ayudarte a decidir con confianza y determinación.' },
            { value: 'intimo', label: 'Íntimo', description: 'Quiero que confíes en ti, y que sientas que no estás sola en esta elección.' }
        ]
    },
    {
        id: 'cambio',
        title: 'Cambio',
        description: '¿Cómo quieres que Gigi aborde los cambios en tu imagen?',
        options: [
            { value: 'neutro', label: 'Neutro', description: 'Los cambios son parte natural de tu evolución estética.' },
            { value: 'suave', label: 'Suave', description: 'Podemos probar algo nuevo sin perder lo que te representa.' },
            { value: 'equilibrado', label: 'Equilibrado', description: 'El cambio es una forma de avanzar sin dejar de ser tú.' },
            { value: 'firme', label: 'Firme', description: 'Atrévete a cambiar; el cambio también revela tu fuerza.' },
            { value: 'intimo', label: 'Íntimo', description: 'Estoy aquí para sostenerte si el cambio te da miedo, pero también para celebrarlo contigo.' }
        ]
    },
    {
        id: 'seguridad',
        title: 'Seguridad / Autoimagen',
        description: '¿Cómo prefieres que Gigi te hable sobre tu imagen?',
        options: [
            { value: 'neutro', label: 'Neutro', description: 'Puedo mostrarte opciones que se ajusten a tus rasgos y estilo.' },
            { value: 'suave', label: 'Suave', description: 'Quiero que vuelvas a mirarte con amabilidad.' },
            { value: 'equilibrado', label: 'Equilibrado', description: 'Te ayudaré a reconocer tu belleza real y sentirte en equilibrio.' },
            { value: 'firme', label: 'Firme', description: 'Mírate con seguridad: tu imagen puede proyectar exactamente quién eres.' },
            { value: 'intimo', label: 'Íntimo', description: 'Voy a recordarte que tu valor no depende del espejo.' }
        ]
    },
    {
        id: 'expresion',
        title: 'Expresión Personal',
        description: '¿Cómo quieres que Gigi te ayude a expresarte?',
        options: [
            { value: 'neutro', label: 'Neutro', description: 'Puedo ayudarte a definir un estilo coherente con tu forma de vida.' },
            { value: 'suave', label: 'Suave', description: 'Vamos a encontrar una forma sutil de mostrar lo que te hace única.' },
            { value: 'equilibrado', label: 'Equilibrado', description: 'Te ayudaré a expresar lo que eres a través de tu imagen.' },
            { value: 'firme', label: 'Firme', description: 'Haz que tu estilo hable por ti con fuerza y autenticidad.' },
            { value: 'intimo', label: 'Íntimo', description: 'Quiero que tu imagen se convierta en un lenguaje propio, libre y sincero.' }
        ]
    },
    {
        id: 'confirmacion',
        title: 'Confirmación',
        description: 'Antes de avanzar, ¿cómo te gustaría que Gigi confirme esto?',
        options: [
            { value: 'neutro', label: 'Neutro', description: 'Puedo mantener cierta distancia si prefieres objetividad.' },
            { value: 'suave', label: 'Suave', description: 'Te hablaré con naturalidad, sin forzar confianza.' },
            { value: 'equilibrado', label: 'Equilibrado', description: 'Podría acercarme un poco más para acompañarte mejor.' },
            { value: 'firme', label: 'Firme', description: 'Seré cercana y abierta si eso te hace sentir cómoda.' },
            { value: 'intimo', label: 'Íntimo', description: 'Te hablaré como si te conociera de siempre, con total confianza y cercanía.' }
        ]
    }
];

let currentCalibrationQuestion = 0;
let calibrationAnswers = {};

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
        case 'salon-register':
            initSalonRegister();
            break;
        case 'stylist-register':
            initStylistRegister();
            break;
        case 'gigiCalibration':
            initCalibration();
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

// Registro de Salón/Autónomo
function initSalonRegister() {
    const form = document.getElementById('salonRegisterForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const salonData = Object.fromEntries(formData);
        
        // Validar contraseñas
        if (salonData.password !== salonData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Guardar datos del salón
        sessionStorage.setItem('proUser', JSON.stringify({
            type: 'salon',
            ...salonData
        }));
        
        router.navigate('pro-dashboard');
    });
}

// Registro de Estilista
function initStylistRegister() {
    const form = document.getElementById('stylistRegisterForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const stylistData = Object.fromEntries(formData);
        
        // Obtener especialidades seleccionadas
        const specialties = [];
        if (formData.get('specialtyColor')) specialties.push('color');
        if (formData.get('specialtyCut')) specialties.push('cut');
        if (formData.get('specialtyTreatment')) specialties.push('treatment');
        if (formData.get('specialtyExtensions')) specialties.push('extensions');
        
        // Validar contraseñas
        if (stylistData.password !== stylistData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        // Guardar datos del estilista
        sessionStorage.setItem('proUser', JSON.stringify({
            type: 'stylist',
            ...stylistData,
            specialties
        }));
        
        router.navigate('pro-dashboard');
    });
}

// Sistema de calibración de Gigi
function initCalibration() {
    currentCalibrationQuestion = 0;
    calibrationAnswers = {};
    showCalibrationQuestion();
}

function showCalibrationQuestion() {
    const container = document.getElementById('calibrationContainer');
    const question = calibrationQuestions[currentCalibrationQuestion];
    const progressText = document.getElementById('calibrationProgress');
    const progressDots = document.querySelectorAll('.progress-dots .dot');
    
    progressText.textContent = `${currentCalibrationQuestion + 1} de ${calibrationQuestions.length}`;
    
    progressDots.forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index < currentCalibrationQuestion) {
            dot.classList.add('completed');
        } else if (index === currentCalibrationQuestion) {
            dot.classList.add('active');
        }
    });
    
    container.innerHTML = `
        <div class="calibration-card">
            <h3 class="calibration-question">${question.description}</h3>
            <div class="calibration-options">
                ${question.options.map((option, i) => `
                    <button class="calibration-option" onclick="selectCalibration('${question.id}', '${option.value}')">
                        <div class="option-radio"></div>
                        <span class="option-description">${option.description}</span>
                    </button>
                `).join('')}
            </div>
            ${currentCalibrationQuestion > 0 ? `
                <button class="btn-back" onclick="previousCalibration()">← Atrás</button>
            ` : ''}
        </div>
    `;
}

window.selectCalibration = function(questionId, value) {
    calibrationAnswers[questionId] = value;
    currentCalibrationQuestion++;
    
    if (currentCalibrationQuestion < calibrationQuestions.length) {
        setTimeout(() => showCalibrationQuestion(), 300);
    } else {
        finishCalibration();
    }
};

window.previousCalibration = function() {
    if (currentCalibrationQuestion > 0) {
        currentCalibrationQuestion--;
        showCalibrationQuestion();
    }
};

function finishCalibration() {
    // Guardar calibración en userData
    sessionStorage.setItem('gigiCalibration', JSON.stringify(calibrationAnswers));
    setTimeout(() => {
        router.navigate('test');
    }, 500);
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
