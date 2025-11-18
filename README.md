/* filepath: c:\Users\Joan Marc\simple-static-site\README.md */
Proyecto: Simple static site — listo para local / Docker / GitHub Pages

Pasos rápidos:

1) Instalar dependencias (una sola vez):
   cd "C:\Users\Joan Marc\simple-static-site"
   npm install

2) Servir localmente:
   npm start
   # abrir http://localhost:8080

3) Docker (opcional):
   docker build -t simple-static-site .
   docker run -p 8080:8080 simple-static-site
   # abrir http://localhost:8080

4) Despliegue automático en GitHub Pages:
   - Inicia un repo en GitHub y sube todo (push a main/master).
   - GitHub Actions (workflow .github/workflows/pages.yml) publicará ./src en Pages automáticamente.
   - En el repo, en Settings → Pages, configura si deseas dominio personalizado; por defecto la acción publica en la rama 'gh-pages' manejada por Actions.

Limitaciones:
- No puedo ejecutar comandos ni subir a GitHub por ti.
- Si tu repo usa otra rama principal distinta a main/master, ajusta el workflow.
