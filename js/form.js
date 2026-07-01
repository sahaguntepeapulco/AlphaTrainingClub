/* =========================================================
   FORM.JS
   Validación y envío del formulario de contacto.
   -----------------------------------------------------------
   Guarda el mensaje en Store (localStorage) por ahora.
   Cuando haya backend, la función handleSubmit es la única
   que necesitas modificar para hacer un fetch() real
   (o conectar con un servicio de email como Formspree/EmailJS).
   ========================================================= */

const ContactForm = {

  form: null,

  init() {
    this.form = document.getElementById("contact-form");
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Limpia el error de un campo en cuanto el usuario empieza a corregirlo
    this.form.querySelectorAll("input, textarea").forEach(field => {
      field.addEventListener("input", () => this.clearFieldError(field));
    });
  },

  reglas: {
    name: {
      validar: (v) => v.trim().length >= 2,
      mensaje: "Escribe tu nombre completo."
    },
    email: {
      validar: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      mensaje: "Escribe un correo válido."
    },
    phone: {
      validar: (v) => /^[0-9 +()-]{7,15}$/.test(v),
      mensaje: "Escribe un teléfono válido (7 a 15 dígitos)."
    },
    message: {
      validar: (v) => v.trim().length >= 10,
      mensaje: "Cuéntanos un poco más (mínimo 10 caracteres)."
    }
  },

  validarCampo(field) {
    const regla = this.reglas[field.name];
    if (!regla) return true;

    const valido = regla.validar(field.value);
    const errorEl = document.getElementById("err-" + field.name);

    if (!valido) {
      field.classList.add("invalid");
      if (errorEl) errorEl.textContent = regla.mensaje;
    } else {
      this.clearFieldError(field);
    }
    return valido;
  },

  clearFieldError(field) {
    field.classList.remove("invalid");
    const errorEl = document.getElementById("err-" + field.name);
    if (errorEl) errorEl.textContent = "";
  },

  handleSubmit(e) {
    e.preventDefault();

    const campos = [...this.form.querySelectorAll("input, textarea")];
    const todosValidos = campos.every(field => this.validarCampo(field));

    if (!todosValidos) {
      Toast.show("Revisa los campos marcados en rojo.");
      return;
    }

    const datos = {
      nombre: this.form.name.value.trim(),
      email: this.form.email.value.trim(),
      telefono: this.form.phone.value.trim(),
      mensaje: this.form.message.value.trim()
    };

    Store.guardarContacto(datos);

    document.getElementById("form-success").hidden = false;
    this.form.reset();
    Toast.show("¡Gracias! Te contactaremos pronto.");

    setTimeout(() => {
      document.getElementById("form-success").hidden = true;
    }, 5000);
  }
};
