/* =========================================================
   BOOKING.JS
   Sistema de horarios y reservas.
   Usa Store (storage.js) para persistir, y DATA (data.js)
   para la oferta de clases.
   ========================================================= */

const Booking = {

  dias: [
    { key: "lunes", label: "Lun" },
    { key: "martes", label: "Mar" },
    { key: "miercoles", label: "Mié" },
    { key: "jueves", label: "Jue" },
    { key: "viernes", label: "Vie" },
    { key: "sabado", label: "Sáb" }
  ],

  diaActivo: null,

  init() {
    this.diaActivo = this.diaDeHoy();
    this.renderTabs();
    this.renderClases();
    this.renderMisReservas();
  },

  // Detecta el día actual para abrir esa pestaña por default
  diaDeHoy() {
    const idx = new Date().getDay(); // 0 = domingo
    const map = ["sabado", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    return map[idx];
  },

  renderTabs() {
    const cont = document.getElementById("day-tabs");
    cont.innerHTML = this.dias.map(d => `
      <button
        class="day-tab"
        role="tab"
        aria-selected="${d.key === this.diaActivo}"
        data-dia="${d.key}">
        ${d.label}
      </button>
    `).join("");

    cont.querySelectorAll(".day-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        this.diaActivo = btn.dataset.dia;
        this.renderTabs();
        this.renderClases();
      });
    });
  },

  renderClases() {
    const cont = document.getElementById("class-list");
    const clases = DATA.horarios[this.diaActivo] || [];

    if (clases.length === 0) {
      cont.innerHTML = `<p class="empty-state">No hay clases programadas este día.</p>`;
      return;
    }

    cont.innerHTML = clases.map(c => {
      const reservados = Store.contarReservasPorClase(this.diaActivo, c.hora, c.clase);
      const disponibles = c.cupoMax - reservados;
      const yaReservo = Store.yaReservoClase(this.diaActivo, c.hora, c.clase);

      let estadoCupo = "";
      if (disponibles <= 0) estadoCupo = `<span class="class-spots full">Sin cupo</span>`;
      else if (disponibles <= 3) estadoCupo = `<span class="class-spots low">${disponibles} lugares</span>`;
      else estadoCupo = `<span class="class-spots">${disponibles} lugares</span>`;

      let boton = "";
      if (yaReservo) {
        boton = `<button class="btn btn-ghost btn-sm" disabled>Reservado</button>`;
      } else if (disponibles <= 0) {
        boton = `<button class="btn btn-ghost btn-sm" disabled>Sin cupo</button>`;
      } else {
        boton = `<button class="btn btn-primary btn-sm" data-action="reservar" data-hora="${c.hora}" data-clase="${c.clase}" data-coach="${c.coach}">Reservar</button>`;
      }

      return `
        <div class="class-card">
          <span class="class-time">${c.hora}</span>
          <div class="class-info">
            <h4>${c.clase}</h4>
            <span class="coach">${c.coach}</span>
            ${estadoCupo}
          </div>
          ${boton}
        </div>
      `;
    }).join("");

    cont.querySelectorAll('[data-action="reservar"]').forEach(btn => {
      btn.addEventListener("click", () => this.reservar(btn));
    });
  },

  reservar(btn) {
    const reserva = {
      dia: this.diaActivo,
      hora: btn.dataset.hora,
      clase: btn.dataset.clase,
      coach: btn.dataset.coach
    };

    Store.guardarReserva(reserva);
    this.renderClases();
    this.renderMisReservas();

    const diaLabel = this.dias.find(d => d.key === this.diaActivo)?.label || this.diaActivo;
    Toast.show(`Reserva confirmada: ${reserva.clase} — ${diaLabel} ${reserva.hora}`);
  },

  renderMisReservas() {
    const cont = document.getElementById("bookings-list");
    const reservas = Store.obtenerReservas().sort((a, b) => a.creadaEn < b.creadaEn ? 1 : -1);

    if (reservas.length === 0) {
      cont.innerHTML = `<p class="empty-state">Aún no tienes reservas. Elige una clase arriba para empezar.</p>`;
      return;
    }

    cont.innerHTML = reservas.map(r => {
      const diaLabel = this.dias.find(d => d.key === r.dia)?.label || r.dia;
      return `
        <div class="booking-card">
          <div>
            <h4>${r.clase} — ${diaLabel} ${r.hora}</h4>
            <span>${r.coach}</span>
          </div>
          <button class="btn btn-danger-outline btn-sm" data-cancel="${r.id}">Cancelar</button>
        </div>
      `;
    }).join("");

    cont.querySelectorAll("[data-cancel]").forEach(btn => {
      btn.addEventListener("click", () => {
        Store.cancelarReserva(btn.dataset.cancel);
        this.renderMisReservas();
        this.renderClases();
        Toast.show("Reserva cancelada. Tu lugar quedó disponible de nuevo.");
      });
    });
  }
};
