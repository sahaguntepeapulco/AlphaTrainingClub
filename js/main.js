/* =========================================================
   MAIN.JS
   Inicialización general de la app y utilidades de UI
   compartidas (menú móvil, toast, año del footer).
   ========================================================= */

const Toast = {
  el: null,
  timeoutId: null,

  init() {
    this.el = document.getElementById("toast");
  },

  show(mensaje, duracion = 3200) {
    if (!this.el) return;
    clearTimeout(this.timeoutId);

    this.el.textContent = mensaje;
    this.el.classList.add("show");

    this.timeoutId = setTimeout(() => {
      this.el.classList.remove("show");
    }, duracion);
  }
};

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const abierto = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", abierto);
  });

  // Cierra el menú al navegar a una sección
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  Toast.init();
  Render.init();
  Booking.init();
  ContactForm.init();
  initMobileNav();
  setFooterYear();
});
