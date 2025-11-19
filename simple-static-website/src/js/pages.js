/**
 * pages.js - Todas las páginas de la aplicación
 */

export const pages = {
    landing: (router) => `
        <div class="landing-page">
            <!-- Hero Section con imagen de fondo -->
            <section class="hero-full">
                <div class="hero-overlay"></div>
                <div class="hero-content-center">
                    <h1 class="hero-title">AURETHICA</h1>
                    <p class="hero-subtitle">Una belleza que ilumina sin excluir</p>
                    <div class="hero-buttons">
                        <button onclick="router.navigate('register')" class="btn-primary">Comenzar</button>
                        <button onclick="router.navigate('login')" class="btn-secondary">Iniciar Sesión</button>
                    </div>
                    <div class="hero-pro-access">
                        <button onclick="router.navigate('pro-access')" class="btn-link">Acceso Profesional</button>
                    </div>
                </div>
            </section>
        </div>
    `,

    register: (router) => `
        <div class="page-container">
            <header class="page-header">
                <button onclick="router.navigate('landing')" class="btn-back">← Volver</button>
                <h1>AURETHICA</h1>
            </header>
            <div class="form-container">
                <h2>Crear Cuenta</h2>
                <form id="registerForm" class="auth-form">
                    <input type="text" name="nombre" placeholder="Nombre" required>
                    <input type="text" name="apellido" placeholder="Apellido" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="tel" name="telefono" placeholder="Teléfono" required>
                    <input type="password" name="password" placeholder="Contraseña" required>
                    <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" required>
                    <button type="submit" class="btn-primary">Registrarse</button>
                </form>
                <p class="form-footer">¿Ya tienes cuenta? <a href="#" onclick="router.navigate('login')">Inicia sesión</a></p>
            </div>
        </div>
    `,

    login: (router) => `
        <div class="page-container">
            <header class="page-header">
                <button onclick="router.navigate('landing')" class="btn-back">← Volver</button>
                <h1>AURETHICA</h1>
            </header>
            <div class="form-container">
                <h2>Iniciar Sesión</h2>
                <form id="loginForm" class="auth-form">
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Contraseña" required>
                    <button type="submit" class="btn-primary">Entrar</button>
                </form>
                <p class="form-footer">¿No tienes cuenta? <a href="#" onclick="router.navigate('register')">Regístrate</a></p>
            </div>
        </div>
    `,

    gigiIntro: (router) => `
        <div class="page-container gigi-intro">
            <header class="page-header">
                <h1>AURETHICA</h1>
            </header>
            <div class="content-center">
                <div class="gigi-avatar">
                    <div class="avatar-circle">✨</div>
                </div>
                <h2>¡Hola! Soy Gigi</h2>
                <p class="intro-text">Tu asistente personal de belleza. Voy a ayudarte a descubrir tu estilo único.</p>
                <p class="intro-text">Primero, necesito conocerte un poco mejor con una rápida calibración.</p>
                <button onclick="router.navigate('test')" class="btn-primary">Comenzar Calibración</button>
            </div>
        </div>
    `,

    test: (router) => `
        <div class="page-container test-page">
            <header class="page-header">
                <h1>AURETHICA</h1>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressBar" style="width: 0%"></div>
                </div>
            </header>
            <div class="test-container">
                <div id="questionContainer">
                    <!-- Las preguntas se cargarán dinámicamente -->
                </div>
            </div>
        </div>
    `,

    avatar: (router) => `
        <div class="page-container avatar-page">
            <header class="page-header">
                <h1>AURETHICA</h1>
            </header>
            <div class="content-center">
                <h2>Crea tu Avatar</h2>
                <p class="intro-text">Sube tus fotos para crear un avatar personalizado</p>
                <div class="upload-area" id="uploadArea">
                    <div class="upload-icon">📷</div>
                    <p>Arrastra tus fotos aquí</p>
                    <p class="upload-hint">o haz click para seleccionar</p>
                    <input type="file" id="fileInput" accept="image/*" multiple hidden>
                </div>
                <div id="photoPreview" class="photo-preview"></div>
                <button onclick="router.navigate('app')" class="btn-primary" id="continueBtn" disabled>Continuar</button>
            </div>
        </div>
    `,

    app: (router, userData) => `
        <div class="app-mode">
            <header class="app-header">
                <div class="logo-small">AURETHICA</div>
                <nav class="app-nav">
                    <a href="#" onclick="showAppSection('blog')" class="nav-item active">Blog</a>
                    <a href="#" onclick="showAppSection('search')" class="nav-item">Buscar</a>
                    <a href="#" onclick="showAppSection('profile')" class="nav-item">Perfil</a>
                </nav>
                <button onclick="router.navigate('landing')" class="btn-logout">Salir</button>
            </header>
            
            <div class="app-content">
                <!-- Blog Section -->
                <section id="blogSection" class="app-section active">
                    <h2>Inspiración & Tendencias</h2>
                    <div class="blog-grid">
                        <article class="blog-card">
                            <img src="assets/images/fed00b8fb99f1d60d734c20b6fc58a96b6148a96.png" alt="Tendencia">
                            <h3>Colores de Temporada 2025</h3>
                            <p>Descubre los tonos que marcarán tendencia este año</p>
                        </article>
                        <article class="blog-card">
                            <img src="assets/images/d6b411d972cd0bf19ef7521b7b038f43509e5335.png" alt="Estilo">
                            <h3>Cortes que Favorecen</h3>
                            <p>Encuentra el corte perfecto para tu rostro</p>
                        </article>
                        <article class="blog-card">
                            <img src="assets/images/8cb24d5ac69c65fe97935e0493f7d27cd4fea4f9.png" alt="Cuidado">
                            <h3>Rutinas de Cuidado</h3>
                            <p>Tips profesionales para mantener tu cabello saludable</p>
                        </article>
                    </div>
                </section>

                <!-- Search Section -->
                <section id="searchSection" class="app-section">
                    <h2>Buscar Salones</h2>
                    <input type="text" placeholder="Buscar por ciudad o código postal" class="search-input">
                    <div class="salon-list">
                        <div class="salon-card">
                            <h3>Salón Elegance</h3>
                            <p>📍 Barcelona, España</p>
                            <p>⭐ 4.8 (120 reseñas)</p>
                            <button class="btn-secondary">Ver Detalles</button>
                        </div>
                        <div class="salon-card">
                            <h3>Studio Belleza</h3>
                            <p>📍 Madrid, España</p>
                            <p>⭐ 4.9 (98 reseñas)</p>
                            <button class="btn-secondary">Ver Detalles</button>
                        </div>
                    </div>
                </section>

                <!-- Profile Section -->
                <section id="profileSection" class="app-section">
                    <h2>Mi Perfil</h2>
                    <div class="profile-info">
                        <div class="profile-avatar">👤</div>
                        <h3>${userData.nombre || 'Usuario'}</h3>
                        <p>${userData.email || 'usuario@example.com'}</p>
                        <div class="profile-stats">
                            <div class="stat">
                                <strong>Estilo</strong>
                                <p>Natural y sofisticado</p>
                            </div>
                            <div class="stat">
                                <strong>Colorimetría</strong>
                                <p>Primavera cálida</p>
                            </div>
                        </div>
                        <button class="btn-primary">Editar Perfil</button>
                    </div>
                </section>
            </div>
        </div>
    `,

    proAccess: (router) => `
        <div class="page-container">
            <header class="page-header">
                <button onclick="router.navigate('landing')" class="btn-back">← Volver</button>
                <h1>AURETHICA</h1>
            </header>
            <div class="content-center">
                <h2>Acceso Profesional</h2>
                <p class="intro-text">Elige tu tipo de cuenta profesional</p>
                <div class="pro-options">
                    <div class="pro-card" onclick="router.navigate('salon-register')">
                        <h3>🏢 Salón / Autónomo</h3>
                        <p>Para salones de belleza y profesionales autónomos</p>
                    </div>
                    <div class="pro-card" onclick="router.navigate('stylist-register')">
                        <h3>✂️ Estilista</h3>
                        <p>Para estilistas que trabajan en salones</p>
                    </div>
                </div>
            </div>
        </div>
    `,
};

// Función global para cambiar secciones en App Mode
window.showAppSection = function(section) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`${section}Section`).classList.add('active');
    event.target.classList.add('active');
};
