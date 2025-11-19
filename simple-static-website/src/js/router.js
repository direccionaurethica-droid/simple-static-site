/**
 * router.js - Sistema de navegación SPA
 */

export class Router {
    constructor() {
        this.routes = {};
        this.currentPage = 'landing';
        this.userData = {};
    }

    register(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path, data = {}) {
        if (this.routes[path]) {
            this.currentPage = path;
            this.userData = { ...this.userData, ...data };
            this.routes[path](this.userData);
            
            // Actualizar URL sin recargar
            window.history.pushState({ path }, '', `#${path}`);
            
            // Scroll al top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    init() {
        // Manejar botón atrás del navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.path) {
                this.navigate(e.state.path);
            }
        });

        // Cargar página inicial
        const hash = window.location.hash.slice(1) || 'landing';
        this.navigate(hash);
    }
}

export const router = new Router();
