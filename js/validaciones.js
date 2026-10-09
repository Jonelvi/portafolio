// =========================================
// Portafolio - Validaciones de formularios
// Se usa en registro.html, login.html y contacto.html
// =========================================

// ---------- Funciones de ayuda ----------

// Muestra un mensaje de error bajo el campo y lo marca en rojo
function mostrarError(input, idError, mensaje) {
  document.getElementById(idError).textContent = mensaje;
  input.classList.add("invalido");
  input.classList.remove("valido");
}

// Limpia el error y marca el campo en verde
function limpiarError(input, idError) {
  document.getElementById(idError).textContent = "";
  input.classList.remove("invalido");
  input.classList.add("valido");
}

function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(correo);
}

// Valida el RUT chileno con el algoritmo de módulo 11 (dígito verificador)
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

// =========================================
// FORMULARIO DE REGISTRO
// =========================================
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  const nombre = document.getElementById("nombre");
  const rut = document.getElementById("rut");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const region = document.getElementById("region");
  const clave = document.getElementById("clave");
  const clave2 = document.getElementById("clave2");
  const terminos = document.getElementById("terminos");

  const regionesValidas = Array.from(
    document.querySelectorAll("#lista-regiones option")
  ).map(op => op.value);

  // Cada validador devuelve true/false y muestra su propio mensaje
  const validadores = {
    nombre() {
      const v = nombre.value.trim();
      if (v === "") return mostrarError(nombre, "error-nombre", "El nombre es obligatorio."), false;
      if (v.length < 3) return mostrarError(nombre, "error-nombre", "El nombre debe tener al menos 3 caracteres."), false;
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v)) return mostrarError(nombre, "error-nombre", "El nombre solo puede contener letras y espacios."), false;
      limpiarError(nombre, "error-nombre");
      return true;
    },
    rut() {
      const v = rut.value.trim();
      if (v === "") return mostrarError(rut, "error-rut", "El RUT es obligatorio."), false;
      if (!/^\d{7,8}-[\dkK]$/.test(v)) return mostrarError(rut, "error-rut", "Formato incorrecto. Usa 12345678-5 (sin puntos, con guion)."), false;
      if (!esRutValido(v)) return mostrarError(rut, "error-rut", "El dígito verificador no corresponde. Revisa tu RUT."), false;
      limpiarError(rut, "error-rut");
      return true;
    },
    correo() {
      const v = correo.value.trim();
      if (v === "") return mostrarError(correo, "error-correo", "El correo es obligatorio."), false;
      if (!esCorreoValido(v)) return mostrarError(correo, "error-correo", "Ingresa un correo válido, por ejemplo: nombre@duoc.cl"), false;
      limpiarError(correo, "error-correo");
      return true;
    },
    telefono() {
      const v = telefono.value.trim();
      if (v === "") { // es opcional
        limpiarError(telefono, "error-telefono");
        return true;
      }
      if (!/^\+?56?9\d{8}$/.test(v.replace(/\s/g, ""))) return mostrarError(telefono, "error-telefono", "Teléfono inválido. Ej: +56912345678"), false;
      limpiarError(telefono, "error-telefono");
      return true;
    },
    region() {
      const v = region.value.trim();
      if (v === "") return mostrarError(region, "error-region", "Selecciona tu región."), false;
      if (!regionesValidas.includes(v)) return mostrarError(region, "error-region", "Elige una región de la lista de sugerencias."), false;
      limpiarError(region, "error-region");
      return true;
    },
    clave() {
      const v = clave.value;
      if (v === "") return mostrarError(clave, "error-clave", "La contraseña es obligatoria."), false;
      if (v.length < 8 || v.length > 16) return mostrarError(clave, "error-clave", "Debe tener entre 8 y 16 caracteres."), false;
      if (!/[A-Z]/.test(v)) return mostrarError(clave, "error-clave", "Debe incluir al menos una letra mayúscula."), false;
      if (!/\d/.test(v)) return mostrarError(clave, "error-clave", "Debe incluir al menos un número."), false;
      limpiarError(clave, "error-clave");
      return true;
    },
    clave2() {
      if (clave2.value === "") return mostrarError(clave2, "error-clave2", "Confirma tu contraseña."), false;
      if (clave2.value !== clave.value) return mostrarError(clave2, "error-clave2", "Las contraseñas no coinciden."), false;
      limpiarError(clave2, "error-clave2");
      return true;
    },
    terminos() {
      if (!terminos.checked) return mostrarError(terminos, "error-terminos", "Debes aceptar los términos y condiciones."), false;
      limpiarError(terminos, "error-terminos");
      return true;
    }
  };

  // Validación en tiempo real: al salir de cada campo
  nombre.addEventListener("blur", validadores.nombre);
  rut.addEventListener("blur", validadores.rut);
  correo.addEventListener("blur", validadores.correo);
  telefono.addEventListener("blur", validadores.telefono);
  region.addEventListener("change", validadores.region);
  clave.addEventListener("input", validadores.clave);
  clave2.addEventListener("input", validadores.clave2);
  terminos.addEventListener("change", validadores.terminos);

  // Al enviar: se validan todos y, si hay alguno malo, se BLOQUEA el envío
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();
    const resultados = Object.values(validadores).map(fn => fn());
    const todoOk = resultados.every(r => r === true);
    const mensaje = document.getElementById("mensaje-exito");

    if (todoOk) {
      mensaje.textContent = "¡Registro exitoso! Ya eres parte de la comunidad.";
      formRegistro.reset();
      formRegistro.querySelectorAll(".valido").forEach(el => el.classList.remove("valido"));
    } else {
      mensaje.textContent = "";
      formRegistro.querySelector(".invalido").focus(); // lleva al primer error
    }
  });

  // Al limpiar el formulario se borran también los mensajes
  formRegistro.addEventListener("reset", function () {
    formRegistro.querySelectorAll(".error").forEach(el => (el.textContent = ""));
    formRegistro.querySelectorAll(".invalido, .valido").forEach(el => el.classList.remove("invalido", "valido"));
  });
}

// =========================================
// FORMULARIO DE LOGIN
// =========================================
const formLogin = document.getElementById("form-login");

if (formLogin) {
  const correo = document.getElementById("login-correo");
  const clave = document.getElementById("login-clave");

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    let ok = true;

    if (correo.value.trim() === "") {
      mostrarError(correo, "error-login-correo", "Ingresa tu correo."); ok = false;
    } else if (!esCorreoValido(correo.value.trim())) {
      mostrarError(correo, "error-login-correo", "El formato del correo no es válido."); ok = false;
    } else {
      limpiarError(correo, "error-login-correo");
    }

    if (clave.value === "") {
      mostrarError(clave, "error-login-clave", "Ingresa tu contraseña."); ok = false;
    } else if (clave.value.length < 8) {
      mostrarError(clave, "error-login-clave", "La contraseña tiene al menos 8 caracteres."); ok = false;
    } else {
      limpiarError(clave, "error-login-clave");
    }

    document.getElementById("mensaje-login").textContent = ok ? "Ingreso correcto. ¡Hola de nuevo!" : "";
  });
}

// =========================================
// FORMULARIO DE CONTACTO
// =========================================
const formContacto = document.getElementById("form-contacto");

if (formContacto) {
  const nombre = document.getElementById("contacto-nombre");
  const correo = document.getElementById("contacto-correo");
  const mensaje = document.getElementById("contacto-mensaje");
  const contador = document.getElementById("contador");

  // Contador de caracteres en vivo
  mensaje.addEventListener("input", () => (contador.textContent = mensaje.value.length));

  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();
    let ok = true;

    if (nombre.value.trim().length < 3) {
      mostrarError(nombre, "error-contacto-nombre", "Ingresa tu nombre (mínimo 3 caracteres)."); ok = false;
    } else limpiarError(nombre, "error-contacto-nombre");

    if (!esCorreoValido(correo.value.trim())) {
      mostrarError(correo, "error-contacto-correo", "Ingresa un correo válido."); ok = false;
    } else limpiarError(correo, "error-contacto-correo");

    if (mensaje.value.trim().length < 10) {
      mostrarError(mensaje, "error-contacto-mensaje", "El mensaje debe tener al menos 10 caracteres."); ok = false;
    } else limpiarError(mensaje, "error-contacto-mensaje");

    const salida = document.getElementById("mensaje-contacto");
    if (ok) {
      salida.textContent = "¡Mensaje enviado! Te responderemos pronto.";
      formContacto.reset();
      contador.textContent = "0";
      formContacto.querySelectorAll(".valido").forEach(el => el.classList.remove("valido"));
    } else {
      salida.textContent = "";
    }
  });
}
