// Funcionalidad mínima: toggle tema y mostrar info
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const showInfo = document.getElementById("showInfo");
  const status = document.getElementById("status");
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
  showInfo?.addEventListener("click", () => {
    alert("Información del sitio:\\n" + JSON.stringify({ url: location.href, time: new Date().toLocaleString(), file: "src/index.html" }, null, 2));
  });
  status.textContent = ` | Vista local • ${new Date().toLocaleTimeString()}`;
});
