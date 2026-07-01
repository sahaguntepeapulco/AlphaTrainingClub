/* =========================================================
   STORAGE.JS
   Capa de datos del usuario (reservas, contacto, preferencias).
   -----------------------------------------------------------
   IMPORTANTE — POR QUÉ ESTE ARCHIVO EXISTE SEPARADO:

   Todo el resto de la app llama a funciones como
   Store.guardarReserva(), Store.obtenerReservas(), etc.
   Ninguna otra parte del código toca "localStorage" directamente.

   El día que agregues un backend real (Node, Firebase, Supabase),
   solo tienes que reescribir el CONTENIDO de las funciones de
   este archivo para que hagan fetch()/await a tu API en lugar
   de leer el navegador. La interfaz, los botones, el calendario:
   nada de eso cambia.

   Ejemplo de cómo se vería migrado a backend (referencia futura):

     async guardarReserva(reserva) {
       const res = await fetch('/api/reservas', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(reserva)
       });
       return res.json();
     }

   ========================================================= */

const Store = {

  KEYS: {
    RESERVAS: "crossfeet_reservas",
    CONTACTOS: "crossfeet_contactos"
  },

  // ---------- Utilidades internas ----------

  _leer(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Error leyendo storage:", e);
      return [];
    }
  },

  _escribir(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Error escribiendo storage:", e);
      return false;
    }
  },

  // ---------- Reservas ----------

  obtenerReservas() {
    return this._leer(this.KEYS.RESERVAS);
  },

  guardarReserva(reserva) {
    const reservas = this.obtenerReservas();
    const nueva = {
      id: "r_" + Date.now(),
      ...reserva,
      creadaEn: new Date().toISOString()
    };
    reservas.push(nueva);
    this._escribir(this.KEYS.RESERVAS, reservas);
    return nueva;
  },

  cancelarReserva(id) {
    const reservas = this.obtenerReservas().filter(r => r.id !== id);
    return this._escribir(this.KEYS.RESERVAS, reservas);
  },

  contarReservasPorClase(dia, hora, clase) {
    return this.obtenerReservas().filter(
      r => r.dia === dia && r.hora === hora && r.clase === clase
    ).length;
  },

  yaReservoClase(dia, hora, clase) {
    return this.obtenerReservas().some(
      r => r.dia === dia && r.hora === hora && r.clase === clase
    );
  },

  // ---------- Formulario de contacto ----------

  obtenerContactos() {
    return this._leer(this.KEYS.CONTACTOS);
  },

  guardarContacto(contacto) {
    const contactos = this.obtenerContactos();
    const nuevo = {
      id: "c_" + Date.now(),
      ...contacto,
      enviadoEn: new Date().toISOString()
    };
    contactos.push(nuevo);
    this._escribir(this.KEYS.CONTACTOS, contactos);
    return nuevo;
  }
};
