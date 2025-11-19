Add-Type -AssemblyName Microsoft.VisualBasic
Add-Type -AssemblyName System.Windows.Forms

[void][System.Windows.Forms.Application]::EnableVisualStyles()

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root

function Msg($text, $title = 'Push Final') {
    [System.Windows.Forms.MessageBox]::Show($text, $title, [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information) | Out-Null
}

function Err($text, $title = 'Error') {
    [System.Windows.Forms.MessageBox]::Show($text, $title, [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error) | Out-Null
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Err 'Git no está disponible en PATH. Instala Git y vuelve a intentarlo.'; exit 1
}

if (-not (Test-Path .git)) {
    git init
    git add -A
    try { git commit -m "Initial commit - simple-static-site" } catch { }
}

$suggestedRepo = Split-Path -Leaf $PWD
$username = [Microsoft.VisualBasic.Interaction]::InputBox('Introduce tu usuario de GitHub (ej: tu_usuario)', 'Usuario GitHub', '')
if ([string]::IsNullOrWhiteSpace($username)) { Err 'Usuario vacío. Cancelado.'; exit 1 }

$repo = [Microsoft.VisualBasic.Interaction]::InputBox("Introduce el nombre del repositorio en GitHub (sugerido: $suggestedRepo)", 'Nombre del repo', $suggestedRepo)
if ([string]::IsNullOrWhiteSpace($repo)) { $repo = $suggestedRepo }

$remoteUrl = "https://github.com/$username/$repo.git"

try {
    git remote remove origin 2>$null
} catch {}

try {
    git remote add origin $remoteUrl
} catch {
    Err "Fallo al añadir remote: $_"; exit 1
}

git branch -M main 2>$null

try {
    $pushOutput = git push -u origin main 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
        Msg "Push completado correctamente.`nRepositorio: $remoteUrl"
        Start-Process $remoteUrl -ErrorAction SilentlyContinue
        exit 0
    } else {
        Err "Push falló:`n$pushOutput"; exit 1
    }
} catch {
    Err "Excepción durante push: $_"; exit 1
}
