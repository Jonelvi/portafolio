// =========================================
// REGLAS DE NEGOCIO
// Funciones puras (fáciles de probar) + una "base de datos" simulada
// con localStorage, ya que el proyecto no tiene backend.
// Todos los códigos son FICTICIOS.
// =========================================

const EDAD_MINIMA = 18;                 // RN-01
const DESCUENTO_DUOC = 20;              // RN-03
const DOMINIOS_DUOC = ["duoc.cl", "duocuc.cl", "profesor.duoc.cl"];
const CODIGOS_PROMO = {                 // RN-04 (ficticios)
  BIENVENIDA10: 10,
  JCASTRO15: 15
};
const MAX_INTENTOS = 3;                 // RN-07
const SEGUNDOS_BLOQUEO = 30;

// ---------- RN-01: edad mínima ----------
function calcularEdad(fechaISO, hoy = new Date()) {
  const nac = new Date(fechaISO + "T00:00:00");
  let edad = hoy.getFullYear() - nac.getFullYear();
  const aunNoCumple =
    hoy.getMonth() < nac.getMonth() ||
    (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate());
  if (aunNoCumple) edad--;
  return edad;
}

function validarFechaNacimiento(fechaISO, hoy = new Date()) {
  if (!fechaISO) return "La fecha de nacimiento es obligatoria.";
  const nac = new Date(fechaISO + "T00:00:00");
  if (isNaN(nac)) return "Fecha no válida.";
  if (nac > hoy) return "La fecha no puede ser futura.";
  const edad = calcularEdad(fechaISO, hoy);
  if (edad < EDAD_MINIMA) return `Debes tener al menos ${EDAD_MINIMA} años para registrarte.`;
  if (edad > 110) return "Revisa el año de nacimiento.";
  return "";
}

// ---------- RN-02: correo único ----------
function correoYaRegistrado(correo, usuarios) {
  const c = correo.trim().toLowerCase();
  return usuarios.some(u => u.correo === c);
}

// ---------- RN-03 / RN-04 / RN-05: descuentos ----------
function esCorreoDuoc(correo) {
  const dominio = correo.trim().toLowerCase().split("@")[1] || "";
  return DOMINIOS_DUOC.includes(dominio);
}

function validarCodigoPromo(codigo) {
  const c = codigo.trim().toUpperCase();
  if (c === "") return ""; // es opcional
  if (!(c in CODIGOS_PROMO)) return "El código promocional no existe o expiró.";
  return "";
}

function calcularDescuento(correo, codigo) {
  const porCorreo = esCorreoDuoc(correo) ? DESCUENTO_DUOC : 0;
  const porCodigo = CODIGOS_PROMO[codigo.trim().toUpperCase()] || 0;
  return Math.max(porCorreo, porCodigo); // RN-05: no se acumulan
}

function aplicarDescuento(precio, porcentaje) {
  return Math.round(precio * (100 - porcentaje) / 100);
}

function formatearCLP(monto) {
  return "$" + monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ---------- RN-06: código de socio ficticio ----------
// Formato: iniciales + 2 bloques de 4 caracteres, ej: JC-7K4M-2Q9X
// Se omiten caracteres confusos (0, O, 1, I) para que se lea fácil.
const ALFABETO = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function generarCodigoSocio(nombre, azar = Math.random) {
  const partes = nombre.trim().split(/\s+/);
  const iniciales = (partes[0][0] + (partes[1] ? partes[1][0] : partes[0][1] || "X"))
    .normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  const bloque = () =>
    Array.from({ length: 4 }, () => ALFABETO[Math.floor(azar() * ALFABETO.length)]).join("");
  return `${iniciales}-${bloque()}-${bloque()}`;
}

function esCodigoSocioValido(codigo) {
  return /^[A-Z]{2}-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/.test(codigo);
}

// ---------- RN-07: bloqueo por intentos ----------
// estado = { intentos, bloqueadoHasta }  (bloqueadoHasta en milisegundos)
function registrarIntentoFallido(estado, ahora = Date.now()) {
  const intentos = estado.intentos + 1;
  if (intentos >= MAX_INTENTOS) {
    return { intentos: 0, bloqueadoHasta: ahora + SEGUNDOS_BLOQUEO * 1000 };
  }
  return { intentos, bloqueadoHasta: 0 };
}

function segundosDeBloqueo(estado, ahora = Date.now()) {
  return Math.max(0, Math.ceil((estado.bloqueadoHasta - ahora) / 1000));
}

// ---------- "Base de datos" simulada (localStorage) ----------
const BD = {
  leer(clave, porDefecto) {
    try { return JSON.parse(localStorage.getItem(clave)) ?? porDefecto; }
    catch { return porDefecto; }
  },
  escribir(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
  },
  usuarios() { return this.leer("usuarios", []); },
  agregarUsuario(u) { this.escribir("usuarios", [...this.usuarios(), u]); },
  buscar(correo) { return this.usuarios().find(u => u.correo === correo.trim().toLowerCase()); },
  sesion() { return this.leer("sesion", null); },
  iniciarSesion(correo) { this.escribir("sesion", correo); },
  cerrarSesion() { try { localStorage.removeItem("sesion"); } catch { } },
  estadoLogin() { return this.leer("estadoLogin", { intentos: 0, bloqueadoHasta: 0 }); },
  guardarEstadoLogin(e) { this.escribir("estadoLogin", e); }
};

if (typeof module !== "undefined") {
  module.exports = {
    EDAD_MINIMA, CODIGOS_PROMO, MAX_INTENTOS, SEGUNDOS_BLOQUEO,
    calcularEdad, validarFechaNacimiento, correoYaRegistrado, esCorreoDuoc,
    validarCodigoPromo, calcularDescuento, aplicarDescuento, formatearCLP,
    generarCodigoSocio, esCodigoSocioValido, registrarIntentoFallido, segundosDeBloqueo
  };
}
