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
        case 'test-results':
            initTestResults();
            break;
        case 'avatar':
            initAvatarUpload();
            break;
        case 'pro-dashboard':
            initProDashboard();
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
        
        // Guardar datos del usuario
        sessionStorage.setItem('userData', JSON.stringify(userData));
        
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
    // Guardar respuestas del test
    sessionStorage.setItem('testAnswers', JSON.stringify(testAnswers));
    sessionStorage.setItem('testCompleted', 'true');
    
    setTimeout(() => {
        router.navigate('test-results');
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
        
        // Guardar avatares en sessionStorage
        if (uploadedFiles.length > 0) {
            const avatarData = {
                count: uploadedFiles.length,
                files: uploadedFiles.map(f => f.name)
            };
            sessionStorage.setItem('avatars', JSON.stringify(avatarData));
        }
    }
}

// Resultados del test
function initTestResults() {
    const testData = JSON.parse(sessionStorage.getItem('testAnswers') || '[]');
    const calibration = JSON.parse(sessionStorage.getItem('gigiCalibration') || '{}');
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    
    // Analizar resultados
    const analysis = analyzeTestResults(testData);
    
    // Mostrar mensaje de Gigi personalizado
    const gigiMessage = document.getElementById('gigiResultMessage');
    if (gigiMessage) {
        gigiMessage.textContent = getGigiMessage(calibration, analysis);
    }
    
    // Mostrar resultados
    const resultsGrid = document.getElementById('resultsGrid');
    if (resultsGrid) {
        resultsGrid.innerHTML = `
            <div class="result-card">
                <h3>🎨 Tu Relación con el Cabello</h3>
                <p class="result-value">${analysis.hairRelationship}</p>
            </div>
            <div class="result-card">
                <h3>⏱️ Tiempo Dedicado</h3>
                <p class="result-value">${analysis.timeCommitment}</p>
            </div>
            <div class="result-card">
                <h3>💰 Inversión</h3>
                <p class="result-value">${analysis.investment}</p>
            </div>
            <div class="result-card">
                <h3>✨ Estilo Personal</h3>
                <p class="result-value">${analysis.style}</p>
            </div>
        `;
    }
    
    // Mostrar recomendaciones
    const recommendationsCards = document.getElementById('recommendationsCards');
    if (recommendationsCards) {
        recommendationsCards.innerHTML = analysis.recommendations.map(rec => `
            <div class="recommendation-card">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
        `).join('');
    }
    
    // Guardar análisis completo
    sessionStorage.setItem('testAnalysis', JSON.stringify(analysis));
}

function analyzeTestResults(answers) {
    const firstAnswer = answers[0]?.answer || '';
    const isExpressive = firstAnswer.includes('expresión');
    
    // Analizar respuestas
    const analysis = {
        hairRelationship: isExpressive ? 'Expresión Personal' : 'Cuidado Práctico',
        timeCommitment: answers[4]?.answer || 'No especificado',
        investment: answers[6]?.answer || 'No especificado',
        style: isExpressive ? 'Versátil y creativo' : 'Funcional y eficiente',
        recommendations: []
    };
    
    // Generar recomendaciones basadas en las respuestas
    if (isExpressive) {
        analysis.recommendations.push(
            { title: 'Experimenta con Color', description: 'Tu perfil sugiere que disfrutas probar nuevos tonos y estilos' },
            { title: 'Accesorios Creativos', description: 'Los accesorios son clave en tu estilo personal' }
        );
    } else {
        analysis.recommendations.push(
            { title: 'Rutina Simplificada', description: 'Productos multifunción que ahorran tiempo' },
            { title: 'Cortes de Bajo Mantenimiento', description: 'Estilos que se mantienen bien entre visitas al salón' }
        );
    }
    
    // Recomendaciones según tiempo dedicado
    const timeAnswer = answers[4]?.answer || '';
    if (timeAnswer.includes('Menos')) {
        analysis.recommendations.push(
            { title: 'Productos Express', description: 'Soluciones rápidas para tu rutina diaria' }
        );
    } else if (timeAnswer.includes('Más de 30')) {
        analysis.recommendations.push(
            { title: 'Tratamientos Premium', description: 'Tu dedicación merece productos profesionales' }
        );
    }
    
    return analysis;
}

function getGigiMessage(calibration, analysis) {
    const tone = calibration.confirmacion || 'equilibrado';
    
    const messages = {
        intimo: `¡Increíble! He analizado tus respuestas y veo algo hermoso: ${analysis.hairRelationship.toLowerCase()} es tu forma de expresarte. Estoy aquí para acompañarte en cada paso de este viaje. 💕`,
        firme: `¡Perfecto! Tus respuestas son claras: ${analysis.hairRelationship} define tu estilo. Vamos a potenciar eso al máximo.`,
        equilibrado: `¡Muy bien! He analizado tus respuestas y entiendo que tu cabello es ${analysis.hairRelationship.toLowerCase()}. Vamos a crear algo especial para ti.`,
        suave: `Gracias por compartir. He visto que para ti el cabello es ${analysis.hairRelationship.toLowerCase()}. Vamos a encontrar lo que mejor te represente.`,
        neutro: `He completado el análisis. Tu perfil indica ${analysis.hairRelationship}. Te mostraré las opciones más adecuadas.`
    };
    
    return messages[tone] || messages.equilibrado;
}

// Dashboard Profesional
function initProDashboard() {
    const proUser = JSON.parse(sessionStorage.getItem('proUser') || '{}');
    
    // Inicializar clientes
    if (!localStorage.getItem('clients')) {
        localStorage.setItem('clients', JSON.stringify([]));
    }
    
    // Inicializar citas
    if (!localStorage.getItem('appointments')) {
        localStorage.setItem('appointments', JSON.stringify([]));
    }
    
    // Cargar clientes
    loadClients();
    
    // Cargar calendario
    loadCalendar();
    
    // Cargar estadísticas
    loadStats();
    
    // Cargar perfil
    loadProfile(proUser);
}

function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const table = document.getElementById('clientsTable');
    
    if (!table) return;
    
    if (clients.length === 0) {
        table.innerHTML = `
            <div class="empty-state">
                <p>No tienes clientes aún</p>
                <p class="hint">Haz clic en "+ Añadir Cliente" para comenzar</p>
            </div>
        `;
        return;
    }
    
    table.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Última Visita</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${clients.map(client => `
                    <tr>
                        <td>${client.name}</td>
                        <td>${client.email}</td>
                        <td>${client.phone}</td>
                        <td>${client.lastVisit || 'Primera visita'}</td>
                        <td>
                            <button onclick="editClient('${client.id}')" class="btn-icon">✏️</button>
                            <button onclick="deleteClient('${client.id}')" class="btn-icon">🗑️</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadCalendar() {
    const now = new Date();
    const currentMonth = document.getElementById('currentMonth');
    if (currentMonth) {
        currentMonth.textContent = now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    }
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const today = now.toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.date === today);
    
    const todayList = document.getElementById('todayAppointments');
    if (todayList) {
        if (todayAppointments.length === 0) {
            todayList.innerHTML = '<p class="empty-state">No hay citas para hoy</p>';
        } else {
            todayList.innerHTML = todayAppointments.map(apt => `
                <div class="appointment-item">
                    <strong>${apt.time}</strong> - ${apt.clientName}<br>
                    <span class="service-tag">${apt.service}</span>
                </div>
            `).join('');
        }
    }
    
    // Generar calendario
    generateCalendarGrid(now);
}

function generateCalendarGrid(date) {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let html = '<div class="calendar-weekdays">';
    ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].forEach(day => {
        html += `<div class="weekday">${day}</div>`;
    });
    html += '</div><div class="calendar-days">';
    
    // Días vacíos antes del primer día
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day empty"></div>';
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateStr === new Date().toISOString().split('T')[0];
        html += `<div class="calendar-day ${isToday ? 'today' : ''}" data-date="${dateStr}">${day}</div>`;
    }
    
    html += '</div>';
    grid.innerHTML = html;
}

function loadStats() {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    document.getElementById('totalClients').textContent = clients.length;
    
    const now = new Date();
    const thisMonth = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate.getMonth() === now.getMonth() && aptDate.getFullYear() === now.getFullYear();
    });
    
    document.getElementById('monthAppointments').textContent = thisMonth.length;
    
    const revenue = thisMonth.reduce((sum, apt) => sum + (parseFloat(apt.price) || 0), 0);
    document.getElementById('monthRevenue').textContent = `${revenue.toFixed(2)}€`;
    
    document.getElementById('avgRating').textContent = '⭐ 4.8';
}

function loadProfile(proUser) {
    const profileEditor = document.getElementById('profileEditor');
    if (!profileEditor) return;
    
    profileEditor.innerHTML = `
        <form class="profile-form">
            <h3>Información del Negocio</h3>
            <input type="text" value="${proUser.businessName || proUser.firstName + ' ' + proUser.lastName || ''}" placeholder="Nombre">
            <input type="email" value="${proUser.email || ''}" placeholder="Email">
            <input type="tel" value="${proUser.phone || ''}" placeholder="Teléfono">
            <textarea placeholder="Descripción" rows="4">${proUser.description || ''}</textarea>
            <button type="submit" class="btn-primary">Guardar Cambios</button>
        </form>
    `;
}

// Funciones globales para modales y acciones
window.openAddClientModal = function() {
    document.getElementById('addClientModal').style.display = 'block';
};

window.closeAddClientModal = function() {
    document.getElementById('addClientModal').style.display = 'none';
};

window.openAddAppointmentModal = function() {
    // Cargar clientes en el select
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const select = document.querySelector('#addAppointmentForm select[name="clientId"]');
    if (select) {
        select.innerHTML = '<option value="">Seleccionar cliente</option>' +
            clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
    document.getElementById('addAppointmentModal').style.display = 'block';
};

window.closeAddAppointmentModal = function() {
    document.getElementById('addAppointmentModal').style.display = 'none';
};

window.changeMonth = function(delta) {
    // Implementar cambio de mes
    console.log('Cambiar mes:', delta);
};

window.editClient = function(id) {
    console.log('Editar cliente:', id);
};

window.deleteClient = function(id) {
    if (confirm('¿Seguro que quieres eliminar este cliente?')) {
        const clients = JSON.parse(localStorage.getItem('clients') || '[]');
        const updated = clients.filter(c => c.id !== id);
        localStorage.setItem('clients', JSON.stringify(updated));
        loadClients();
    }
};

// Form handlers para modales
document.addEventListener('submit', function(e) {
    if (e.target.id === 'addClientForm') {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newClient = {
            id: Date.now().toString(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            notes: formData.get('notes'),
            createdAt: new Date().toISOString()
        };
        
        const clients = JSON.parse(localStorage.getItem('clients') || '[]');
        clients.push(newClient);
        localStorage.setItem('clients', JSON.stringify(clients));
        
        closeAddClientModal();
        loadClients();
        loadStats();
        e.target.reset();
    }
    
    if (e.target.id === 'addAppointmentForm') {
        e.preventDefault();
        const formData = new FormData(e.target);
        const clients = JSON.parse(localStorage.getItem('clients') || '[]');
        const client = clients.find(c => c.id === formData.get('clientId'));
        
        const newAppointment = {
            id: Date.now().toString(),
            clientId: formData.get('clientId'),
            clientName: client?.name || 'Cliente',
            date: formData.get('date'),
            time: formData.get('time'),
            service: formData.get('service'),
            duration: formData.get('duration'),
            price: formData.get('price'),
            notes: formData.get('notes'),
            createdAt: new Date().toISOString()
        };
        
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        closeAddAppointmentModal();
        loadCalendar();
        loadStats();
        e.target.reset();
    }
});

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✨ AURETHICA ', 'color: #d4af37; font-size: 24px; font-weight: bold;');
    console.log('%cUna belleza que ilumina sin excluir', 'color: #666; font-size: 14px;');
    console.log('Aplicación cargada correctamente ✓');
    
    // Iniciar router
    router.init();
});
