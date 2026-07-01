/* =========================================================
   RENDER.JS
   Funciones que toman datos (de DATA o de Store) y los
   convierten en HTML dentro de la página.
   ========================================================= */

const Render = {

  init() {
    this.wod();
    this.programas();
    this.pricing();
    this.coaches();
    this.testimonios();
  },

  wod() {
    const cont = document.getElementById("wod-board-content");
    const w = DATA.wodHoy;

    cont.innerHTML = `
      <div class="wod-meta">
        <span class="wod-name">${w.nombre}</span>
        <span class="wod-format">${w.formato}</span>
      </div>
      <div class="wod-movements">
        ${w.movimientos.map(m => `
          <div class="wod-movement">
            <span class="qty">${m.cantidad}</span>
            <span>${m.descripcion}</span>
          </div>
        `).join("")}
      </div>
    `;
  },

  programas() {
    const cont = document.getElementById("program-grid");
    cont.innerHTML = DATA.programas.map(p => `
      <article class="program-card">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
      </article>
    `).join("");
  },

  pricing() {
    const cont = document.getElementById("pricing-grid");
    cont.innerHTML = DATA.membresias.map(m => `
      <article class="price-card ${m.destacado ? "featured" : ""}">
        <h3>${m.nombre}</h3>
        <div class="price-value">$${m.precio}<span> MXN / ${m.periodo}</span></div>
        <ul class="price-features">
          ${m.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
        <a href="#contacto" class="btn ${m.destacado ? "btn-primary" : "btn-ghost"} btn-block">Quiero esta membresía</a>
      </article>
    `).join("");
  },

  coaches() {
    const cont = document.getElementById("coaches-grid");
    cont.innerHTML = DATA.coaches.map(c => `
      <div class="coach-card">
        <div class="coach-avatar">${c.iniciales}</div>
        <h4>${c.nombre}</h4>
        <span>${c.rol}</span>
      </div>
    `).join("");
  },

  testimonios() {
    const cont = document.getElementById("testimonial-track");
    cont.innerHTML = DATA.testimonios.map(t => `
      <article class="testimonial-card">
        <p class="quote">"${t.texto}"</p>
        <p class="testimonial-author">${t.autor}</p>
      </article>
    `).join("");
  }
};
