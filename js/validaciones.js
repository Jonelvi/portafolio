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

// ===== REGISTRO (con reglas de negocio de js/reglas.js) =====
const formRegistro = hayPagina ? document.getElementById("form-registro") : null;

if (formRegistro) {
  const $ = id => document.getElementById(id);
  const regiones = Array.from(document.querySelectorAll("#lista-regiones option")).map(o => o.value);

  // RN-02: además del formato, el correo no puede estar registrado
  function validarCorreoNuevo(valor) {
    const error = validarCorreo(valor);
    if (error) return error;
    if (correoYaRegistrado(valor, BD.usuarios())) return "Este correo ya está registrado. ¿Quieres iniciar sesión?";
    return "";
  }

  const validadores = {
    nombre:   () => aplicarResultado($("nombre"), "error-nombre", validarNombre($("nombre").value)),
    rut:      () => aplicarResultado($("rut"), "error-rut", validarRut($("rut").value)),
    correo:   () => aplicarResultado($("correo"), "error-correo", validarCorreoNuevo($("correo").value)),
    fecha:    () => aplicarResultado($("fecha"), "error-fecha", validarFechaNacimiento($("fecha").value)),
    telefono: () => aplicarResultado($("telefono"), "error-telefono", validarTelefono($("telefono").value)),
    region:   () => aplicarResultado($("region"), "error-region", validarRegion($("region").value, regiones)),
    clave:    () => aplicarResultado($("clave"), "error-clave", validarClave($("clave").value)),
    clave2:   () => aplicarResultado($("clave2"), "error-clave2", validarConfirmacion($("clave").value, $("clave2").value)),
    codigo:   () => aplicarResultado($("codigo"), "error-codigo", validarCodigoPromo($("codigo").value)),
    terminos: () => aplicarResultado($("terminos"), "error-terminos",
                     $("terminos").checked ? "" : "Debes aceptar los términos y condiciones.")
  };

  // RN-03 / RN-04 / RN-05: vista previa del descuento mientras se escribe
  function mostrarDescuento() {
    const correo = $("correo").value;
    const codigo = $("codigo").value;
    const porcentaje = calcularDescuento(correo, validarCodigoPromo(codigo) ? "" : codigo);
    const vista = $("vista-descuento");
    if (porcentaje === 0) { vista.textContent = ""; return; }
    const motivo = esCorreoDuoc(correo) && porcentaje === DESCUENTO_DUOC ? "correo Duoc" : "código promocional";
    vista.textContent = `Descuento de socio: ${porcentaje}% (${motivo})`;
  }

  // Validación en tiempo real
  $("nombre").addEventListener("blur", validadores.nombre);
  $("rut").addEventListener("blur", validadores.rut);
  $("correo").addEventListener("blur", validadores.correo);
  $("fecha").addEventListener("change", validadores.fecha);
  $("telefono").addEventListener("blur", validadores.telefono);
  $("region").addEventListener("change", validadores.region);
  $("clave").addEventListener("input", validadores.clave);
  $("clave2").addEventListener("input", validadores.clave2);
  $("codigo").addEventListener("blur", validadores.codigo);
  $("terminos").addEventListener("change", validadores.terminos);
  $("correo").addEventListener("input", mostrarDescuento);
  $("codigo").addEventListener("input", mostrarDescuento);

  // Al enviar: si hay errores se BLOQUEA el envío
  formRegistro.addEventListener("submit", e => {
    e.preventDefault();
    const todoOk = Object.values(validadores).map(fn => fn()).every(Boolean);

    if (!todoOk) {
      $("mensaje-exito").textContent = "";
      formRegistro.querySelector(".invalido").focus();
      return;
    }

    // Se crea el usuario (simulado en localStorage)
    const usuario = {
      nombre: $("nombre").value.trim(),
      correo: $("correo").value.trim().toLowerCase(),
      clave: $("clave").value, // en un sistema real la contraseña se guardaría cifrada en el servidor
      descuento: calcularDescuento($("correo").value, $("codigo").value),
      codigoSocio: generarCodigoSocio($("nombre").value) // RN-06
    };
    BD.agregarUsuario(usuario);

    formRegistro.reset(); // primero se limpia el formulario...
    $("mensaje-exito").textContent = `¡Registro exitoso, ${usuario.nombre.split(" ")[0]}!`; // ...y luego el mensaje
    const tarjeta = $("tarjeta-socio");
    tarjeta.innerHTML = `
      <p class="comentario">// tu código de socio</p>
      <p class="codigo-socio">${usuario.codigoSocio}</p>
      <p>Descuento: <strong>${usuario.descuento}%</strong> · <a href="login.html">Inicia sesión</a> para usarlo en <a href="servicios.html">servicios</a>.</p>`;
    tarjeta.hidden = false;
    celebrar();
  });

  formRegistro.addEventListener("reset", () => {
    limpiarEstados(formRegistro);
    $("mensaje-exito").textContent = "";
    $("vista-descuento").textContent = "";
    $("tarjeta-socio").hidden = true;
  });
}

// ===== LOGIN (RN-07: bloqueo tras 3 intentos fallidos) =====
const formLogin = hayPagina ? document.getElementById("form-login") : null;

if (formLogin) {
  const correo = document.getElementById("login-correo");
  const clave = document.getElementById("login-clave");
  const boton = document.getElementById("btn-login");
  const salida = document.getElementById("mensaje-login");
  const aviso = document.getElementById("aviso-login");
  let temporizador = null;

  // Muestra la cuenta regresiva y desactiva el botón mientras dure el bloqueo
  function revisarBloqueo() {
    const segundos = segundosDeBloqueo(BD.estadoLogin());
    boton.disabled = segundos > 0;
    if (segundos > 0) {
      aviso.textContent = `Demasiados intentos. Espera ${segundos} s para volver a intentar.`;
      clearTimeout(temporizador);
      temporizador = setTimeout(revisarBloqueo, 1000);
    } else if (aviso.textContent.startsWith("Demasiados")) {
      aviso.textContent = "";
    }
    return segundos > 0;
  }
  revisarBloqueo();

  formLogin.addEventListener("submit", e => {
    e.preventDefault();
    if (revisarBloqueo()) return;

    const okCorreo = aplicarResultado(correo, "error-login-correo",
      correo.value.trim() === "" ? "Ingresa tu correo." : validarCorreo(correo.value));
    const okClave = aplicarResultado(clave, "error-login-clave",
      clave.value === "" ? "Ingresa tu contraseña." : "");
    salida.textContent = "";
    if (!okCorreo || !okClave) return;

    const usuario = BD.buscar(correo.value);
    if (!usuario || usuario.clave !== clave.value) {
      // Mensaje genérico: no se revela si el correo existe (buena práctica de seguridad)
      const estado = registrarIntentoFallido(BD.estadoLogin());
      BD.guardarEstadoLogin(estado);
      if (!revisarBloqueo()) {
        const quedan = MAX_INTENTOS - estado.intentos;
        aviso.textContent = `Correo o contraseña incorrectos. Te quedan ${quedan} intento${quedan === 1 ? "" : "s"}.`;
      }
      return;
    }

    BD.guardarEstadoLogin({ intentos: 0, bloqueadoHasta: 0 });
    BD.iniciarSesion(usuario.correo);
    aviso.textContent = "";
    salida.innerHTML = `¡Hola, ${usuario.nombre.split(" ")[0]}! Socio <code>${usuario.codigoSocio}</code>. ` +
                       `<a href="servicios.html">Ver mis precios →</a>`;
    formLogin.reset();
    celebrar();
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
