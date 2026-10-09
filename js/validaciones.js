// =========================================
// Portafolio - Validaciones de formularios
// Se usa en registro.html, login.html y contacto.html
//
// PARTE 1: funciones puras (reciben un texto y devuelven true/false
//          o un mensaje). Son las que se prueban con Jasmine en /tests.
// PARTE 2: conexión con los formularios (eventos, mensajes en pantalla).
// =========================================

// ---------- PARTE 1: reglas de validación ----------

function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(correo);
}

// RUT chileno: formato 12345678-5 y dígito verificador (módulo 11)
function esRutValido(rut) {
  if (!/^\d{7,8}-[\dkK]$/.test(rut)) return false;
  const [cuerpo, dv] = rut.split("-");
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv.toUpperCase() === dvEsperado;
}

// Cada función devuelve "" si está bien, o el mensaje de error
function validarNombre(valor) {
  const v = valor.trim();
  if (v === "") return "El nombre es obligatorio.";
  if (v.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v)) return "El nombre solo puede contener letras y espacios.";
  return "";
}

function validarRut(valor) {
  const v = valor.trim();
  if (v === "") return "El RUT es obligatorio.";
  if (!/^\d{7,8}-[\dkK]$/.test(v)) return "Formato incorrecto. Usa 12345678-5 (sin puntos, con guion).";
  if (!esRutValido(v)) return "El dígito verificador no corresponde. Revisa tu RUT.";
  return "";
}

function validarCorreo(valor) {
  const v = valor.trim();
  if (v === "") return "El correo es obligatorio.";
  if (!esCorreoValido(v)) return "Ingresa un correo válido, por ejemplo: nombre@duocuc.cl";
  return "";
}

function validarTelefono(valor) {
  const v = valor.replace(/\s/g, "");
  if (v === "") return ""; // es opcional
  if (!/^(\+?56)?9\d{8}$/.test(v)) return "Teléfono inválido. Ej: +56912345678";
  return "";
}

function validarRegion(valor, regionesValidas) {
  const v = valor.trim();
  if (v === "") return "Selecciona tu región.";
  if (!regionesValidas.includes(v)) return "Elige una región de la lista de sugerencias.";
  return "";
}

function validarClave(valor) {
  if (valor === "") return "La contraseña es obligatoria.";
  if (valor.length < 8 || valor.length > 16) return "Debe tener entre 8 y 16 caracteres.";
  if (!/[A-Z]/.test(valor)) return "Debe incluir al menos una letra mayúscula.";
  if (!/\d/.test(valor)) return "Debe incluir al menos un número.";
  return "";
}

function validarConfirmacion(clave, confirmacion) {
  if (confirmacion === "") return "Confirma tu contraseña.";
  if (clave !== confirmacion) return "Las contraseñas no coinciden.";
  return "";
}

function validarMensaje(valor) {
  if (valor.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
  return "";
}

// ---------- PARTE 2: conexión con la página ----------

// Muestra (o limpia) el error de un campo. Devuelve true si el campo está bien.
function aplicarResultado(input, idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
  input.classList.toggle("invalido", mensaje !== "");
  input.classList.toggle("valido", mensaje === "");
  if (mensaje !== "") {
    // pequeña sacudida para llamar la atención
    input.classList.remove("sacudir");
    void input.offsetWidth;
    input.classList.add("sacudir");
  }
  return mensaje === "";
}

function limpiarEstados(form) {
  form.querySelectorAll(".error").forEach(el => (el.textContent = ""));
  form.querySelectorAll(".invalido, .valido").forEach(el => el.classList.remove("invalido", "valido"));
}

// En Node (pruebas) no existe "document"; así el archivo no se rompe
const hayPagina = typeof document !== "undefined";

function celebrar() {
  if (typeof lanzarConfeti === "function") lanzarConfeti();
}

// ===== REGISTRO =====
const formRegistro = hayPagina ? document.getElementById("form-registro") : null;

if (formRegistro) {
  const $ = id => document.getElementById(id);
  const regiones = Array.from(document.querySelectorAll("#lista-regiones option")).map(o => o.value);

  const validadores = {
    nombre:   () => aplicarResultado($("nombre"), "error-nombre", validarNombre($("nombre").value)),
    rut:      () => aplicarResultado($("rut"), "error-rut", validarRut($("rut").value)),
    correo:   () => aplicarResultado($("correo"), "error-correo", validarCorreo($("correo").value)),
    telefono: () => aplicarResultado($("telefono"), "error-telefono", validarTelefono($("telefono").value)),
    region:   () => aplicarResultado($("region"), "error-region", validarRegion($("region").value, regiones)),
    clave:    () => aplicarResultado($("clave"), "error-clave", validarClave($("clave").value)),
    clave2:   () => aplicarResultado($("clave2"), "error-clave2", validarConfirmacion($("clave").value, $("clave2").value)),
    terminos: () => aplicarResultado($("terminos"), "error-terminos",
                     $("terminos").checked ? "" : "Debes aceptar los términos y condiciones.")
  };

  // Validación en tiempo real
  $("nombre").addEventListener("blur", validadores.nombre);
  $("rut").addEventListener("blur", validadores.rut);
  $("correo").addEventListener("blur", validadores.correo);
  $("telefono").addEventListener("blur", validadores.telefono);
  $("region").addEventListener("change", validadores.region);
  $("clave").addEventListener("input", validadores.clave);
  $("clave2").addEventListener("input", validadores.clave2);
  $("terminos").addEventListener("change", validadores.terminos);

  // Al enviar: si hay errores se BLOQUEA el envío
  formRegistro.addEventListener("submit", e => {
    e.preventDefault();
    const todoOk = Object.values(validadores).map(fn => fn()).every(Boolean);
    const mensaje = $("mensaje-exito");

    if (todoOk) {
      formRegistro.reset(); // primero se limpia el formulario...
      mensaje.textContent = "¡Registro exitoso! Ya eres parte de la comunidad."; // ...y luego se muestra el mensaje
      celebrar();
    } else {
      mensaje.textContent = "";
      formRegistro.querySelector(".invalido").focus();
    }
  });

  formRegistro.addEventListener("reset", () => {
    limpiarEstados(formRegistro);
    $("mensaje-exito").textContent = "";
  });
}

// ===== LOGIN =====
const formLogin = hayPagina ? document.getElementById("form-login") : null;

if (formLogin) {
  const correo = document.getElementById("login-correo");
  const clave = document.getElementById("login-clave");

  formLogin.addEventListener("submit", e => {
    e.preventDefault();
    const okCorreo = aplicarResultado(correo, "error-login-correo",
      correo.value.trim() === "" ? "Ingresa tu correo." : validarCorreo(correo.value));
    const okClave = aplicarResultado(clave, "error-login-clave",
      clave.value === "" ? "Ingresa tu contraseña." :
      clave.value.length < 8 ? "La contraseña tiene al menos 8 caracteres." : "");

    const salida = document.getElementById("mensaje-login");
    if (okCorreo && okClave) {
      salida.textContent = "Ingreso correcto. ¡Hola de nuevo!";
      celebrar();
    } else {
      salida.textContent = "";
    }
  });
}

// ===== CONTACTO =====
const formContacto = hayPagina ? document.getElementById("form-contacto") : null;

if (formContacto) {
  const nombre = document.getElementById("contacto-nombre");
  const correo = document.getElementById("contacto-correo");
  const mensaje = document.getElementById("contacto-mensaje");
  const contador = document.getElementById("contador");

  mensaje.addEventListener("input", () => (contador.textContent = mensaje.value.length));

  formContacto.addEventListener("submit", e => {
    e.preventDefault();
    const resultados = [
      aplicarResultado(nombre, "error-contacto-nombre", validarNombre(nombre.value)),
      aplicarResultado(correo, "error-contacto-correo", validarCorreo(correo.value)),
      aplicarResultado(mensaje, "error-contacto-mensaje", validarMensaje(mensaje.value))
    ];

    const salida = document.getElementById("mensaje-contacto");
    if (resultados.every(Boolean)) {
      salida.textContent = "¡Mensaje enviado! Te responderé pronto.";
      formContacto.reset();
      contador.textContent = "0";
      limpiarEstados(formContacto);
      celebrar();
    } else {
      salida.textContent = "";
    }
  });
}

// Permite usar estas funciones en pruebas con Node (no afecta al navegador)
if (typeof module !== "undefined") {
  module.exports = {
    esCorreoValido, esRutValido, validarNombre, validarRut, validarCorreo,
    validarTelefono, validarRegion, validarClave, validarConfirmacion, validarMensaje
  };
}
