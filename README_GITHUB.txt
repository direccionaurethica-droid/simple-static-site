Instrucciones para subir el proyecto a GitHub (rápido, copy/paste)

Resumen: No puedo ejecutar comandos en tu máquina ni autenticarme en GitHub por ti.
Estos pasos te dejarán el repo en GitHub si los pegas en PowerShell o CMD y sigues las indicaciones.

1) (Opcional) Instalar GitHub CLI (gh) — facilita creación remota:
   winget install --id GitHub.cli -e

2) Autenticar gh (interactivo). En PowerShell ejecuta:
   gh auth login
   # Sigue las instrucciones que aparecen en pantalla (usar navegador para autenticar o token).

3) Inicializar repo local (si no lo está) y hacer push con gh (no recreará si ya existe):
   cd "C:\Users\Joan Marc\simple-static-site"
   git init
   git add -A
   git commit -m "Initial commit - simple-static-site"
   gh repo create --public --source=. --remote=origin --push

4) Si no quieres usar gh: crear repo en GitHub vía web y luego enlazar remote:
   git remote add origin https://github.com/USERNAME/REPO.git
   git branch -M main
   git push -u origin main

Problemas comunes:
- Si gh te dice que no está autenticado, ejecuta `gh auth login` y repite el paso 3.
- Si el push falla por ramas, usa `git branch -M main` antes del push.

Si quieres, ejecuta ahora (o haz doble clic en) `create-and-push.bat` en la raíz del proyecto; te pedirá que autentiques si hace falta.
