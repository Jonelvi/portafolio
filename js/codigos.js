// =========================================
// Código de ejemplo de cada proyecto (ficticio, con fines de muestra)
// Lo usa codigo.html para mostrarlo sin salir del portafolio
// =========================================

const CODIGOS = {
  "mitienda": {
    "titulo": "MiTienda",
    "descripcion": "Tienda web con registro de usuarios y validación de formularios en JavaScript.",
    "archivos": [
      {
        "nombre": "index.html",
        "lenguaje": "html",
        "codigo": "<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Inicio | MiTienda</title>\n  <link rel=\"stylesheet\" href=\"css/estilos.css\">\n</head>\n<body>\n  <header class=\"encabezado\">\n    <a href=\"index.html\" class=\"logo\">Mi<span>Tienda</span></a>\n    <nav aria-label=\"Navegación principal\">\n      <ul class=\"menu\">\n        <li><a href=\"index.html\" class=\"activo\">Inicio</a></li>\n        <li><a href=\"productos.html\">Productos</a></li>\n        <li><a href=\"registro.html\">Registro</a></li>\n      </ul>\n    </nav>\n  </header>\n\n  <main>\n    <section class=\"hero\">\n      <h1>Bienvenido a MiTienda</h1>\n      <p>Crea tu cuenta y recibe un 10% de descuento.</p>\n      <a href=\"registro.html\" class=\"boton\">Crear mi cuenta</a>\n    </section>\n\n    <section class=\"grilla\">\n      <article class=\"tarjeta\">\n        <img src=\"img/audifonos.svg\" alt=\"Audífonos inalámbricos\">\n        <h3>Audífonos inalámbricos</h3>\n        <p class=\"precio\">$29.990</p>\n      </article>\n    </section>\n  </main>\n\n  <footer class=\"pie\">\n    <p>&copy; 2026 MiTienda — Santiago, Chile</p>\n  </footer>\n  <script src=\"js/validaciones.js\"></script>\n</body>\n</html>"
      },
      {
        "nombre": "validaciones.js",
        "lenguaje": "javascript",
        "codigo": "// Valida el RUT chileno con el algoritmo módulo 11\nfunction esRutValido(rut) {\n  if (!/^\\d{7,8}-[\\dkK]$/.test(rut)) return false;\n  const [cuerpo, dv] = rut.split(\"-\");\n  let suma = 0;\n  let multiplo = 2;\n\n  for (let i = cuerpo.length - 1; i >= 0; i--) {\n    suma += Number(cuerpo[i]) * multiplo;\n    multiplo = multiplo === 7 ? 2 : multiplo + 1;\n  }\n\n  const resto = 11 - (suma % 11);\n  const esperado = resto === 11 ? \"0\" : resto === 10 ? \"K\" : String(resto);\n  return dv.toUpperCase() === esperado;\n}\n\nconst form = document.getElementById(\"form-registro\");\n\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const rut = document.getElementById(\"rut\");\n  const error = document.getElementById(\"error-rut\");\n\n  if (!esRutValido(rut.value.trim())) {\n    error.textContent = \"El RUT no es válido.\";\n    rut.classList.add(\"invalido\");\n    return;\n  }\n\n  error.textContent = \"\";\n  alert(\"¡Registro exitoso!\");\n});"
      },
      {
        "nombre": "estilos.css",
        "lenguaje": "css",
        "codigo": ":root {\n  --primario: #1e40af;\n  --acento: #f59e0b;\n  --fondo: #f3f4f6;\n  --radio: 8px;\n}\n\nbody {\n  font-family: \"Segoe UI\", Arial, sans-serif;\n  background: var(--fondo);\n  margin: 0;\n}\n\n.grilla {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n}\n\n.tarjeta {\n  background: #fff;\n  border-radius: var(--radio);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, .08);\n  transition: transform .2s;\n}\n\n.tarjeta:hover { transform: translateY(-4px); }\n\n.invalido { border-color: #dc2626; }"
      }
    ]
  },
  "landing-cafe": {
    "titulo": "Landing Café",
    "descripcion": "Página de aterrizaje responsiva para una cafetería local.",
    "archivos": [
      {
        "nombre": "index.html",
        "lenguaje": "html",
        "codigo": "<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Café Grano Norte</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <header class=\"hero\">\n    <h1>Café Grano Norte</h1>\n    <p>Café de especialidad tostado en Valparaíso.</p>\n    <a href=\"#menu\" class=\"btn\">Ver menú</a>\n  </header>\n\n  <main>\n    <section id=\"menu\" class=\"menu\">\n      <article class=\"item\">\n        <h2>Espresso</h2>\n        <p>Intenso, notas de cacao.</p>\n        <span class=\"precio\">$2.200</span>\n      </article>\n      <article class=\"item\">\n        <h2>Latte</h2>\n        <p>Leche vaporizada y microespuma.</p>\n        <span class=\"precio\">$3.400</span>\n      </article>\n      <article class=\"item\">\n        <h2>Cold brew</h2>\n        <p>Extracción en frío por 18 horas.</p>\n        <span class=\"precio\">$3.800</span>\n      </article>\n    </section>\n  </main>\n\n  <footer>\n    <p>Abierto de lunes a sábado · 8:00 a 20:00</p>\n  </footer>\n</body>\n</html>"
      },
      {
        "nombre": "style.css",
        "lenguaje": "css",
        "codigo": "* { box-sizing: border-box; margin: 0; }\n\nbody {\n  font-family: \"Inter\", sans-serif;\n  color: #2b2118;\n  background: #faf6f1;\n}\n\n.hero {\n  min-height: 70vh;\n  display: grid;\n  place-content: center;\n  text-align: center;\n  gap: 1rem;\n  background: linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)),\n              url(\"img/cafe.jpg\") center / cover;\n  color: #fff;\n}\n\n.btn {\n  padding: .8rem 1.6rem;\n  border-radius: 999px;\n  background: #c8873a;\n  color: #fff;\n  text-decoration: none;\n}\n\n.menu {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1.5rem;\n  max-width: 960px;\n  margin: 3rem auto;\n  padding: 0 1rem;\n}\n\n@media (max-width: 600px) {\n  .hero { min-height: 50vh; }\n}"
      }
    ]
  },
  "calculadora": {
    "titulo": "Calculadora",
    "descripcion": "Calculadora con historial de operaciones y modo teclado.",
    "archivos": [
      {
        "nombre": "app.js",
        "lenguaje": "javascript",
        "codigo": "const pantalla = document.querySelector(\"#pantalla\");\nconst listaHistorial = document.querySelector(\"#historial\");\nconst historial = [];\nlet expresion = \"\";\n\nconst operaciones = {\n  \"+\": (a, b) => a + b,\n  \"-\": (a, b) => a - b,\n  \"*\": (a, b) => a * b,\n  \"/\": (a, b) => (b === 0 ? NaN : a / b),\n};\n\nfunction calcular(texto) {\n  const [, a, op, b] = texto.match(/^(-?\\d*\\.?\\d+)([+\\-*/])(-?\\d*\\.?\\d+)$/) || [];\n  if (!op) return \"Error\";\n  const resultado = operaciones[op](Number(a), Number(b));\n  return Number.isNaN(resultado) ? \"Error\" : Math.round(resultado * 1e8) / 1e8;\n}\n\nfunction presionar(tecla) {\n  if (tecla === \"=\" || tecla === \"Enter\") {\n    const resultado = calcular(expresion);\n    historial.unshift(expresion + \" = \" + resultado);\n    renderHistorial();\n    expresion = String(resultado);\n  } else if (tecla === \"C\" || tecla === \"Escape\") {\n    expresion = \"\";\n  } else if (tecla === \"Backspace\") {\n    expresion = expresion.slice(0, -1);\n  } else if (/^[\\d.+\\-*/]$/.test(tecla)) {\n    expresion += tecla;\n  }\n  pantalla.textContent = expresion || \"0\";\n}\n\nfunction renderHistorial() {\n  listaHistorial.innerHTML = \"\";\n  historial.slice(0, 5).forEach((linea) => {\n    const li = document.createElement(\"li\");\n    li.textContent = linea;\n    listaHistorial.appendChild(li);\n  });\n}\n\ndocument.querySelectorAll(\"[data-tecla]\").forEach((boton) => {\n  boton.addEventListener(\"click\", () => presionar(boton.dataset.tecla));\n});\n\ndocument.addEventListener(\"keydown\", (e) => presionar(e.key));"
      },
      {
        "nombre": "index.html",
        "lenguaje": "html",
        "codigo": "<main class=\"calculadora\">\n  <output id=\"pantalla\" aria-live=\"polite\">0</output>\n\n  <div class=\"teclado\">\n    <button data-tecla=\"7\">7</button>\n    <button data-tecla=\"8\">8</button>\n    <button data-tecla=\"9\">9</button>\n    <button data-tecla=\"/\" class=\"op\">÷</button>\n    <button data-tecla=\"4\">4</button>\n    <button data-tecla=\"5\">5</button>\n    <button data-tecla=\"6\">6</button>\n    <button data-tecla=\"*\" class=\"op\">×</button>\n    <button data-tecla=\"1\">1</button>\n    <button data-tecla=\"2\">2</button>\n    <button data-tecla=\"3\">3</button>\n    <button data-tecla=\"-\" class=\"op\">−</button>\n    <button data-tecla=\"C\">C</button>\n    <button data-tecla=\"0\">0</button>\n    <button data-tecla=\"=\" class=\"igual\">=</button>\n    <button data-tecla=\"+\" class=\"op\">+</button>\n  </div>\n\n  <h2>Historial</h2>\n  <ol id=\"historial\"></ol>\n</main>\n<script src=\"app.js\"></script>"
      }
    ]
  },
  "todo-app": {
    "titulo": "To-Do App",
    "descripcion": "Lista de tareas que guarda los datos en el navegador.",
    "archivos": [
      {
        "nombre": "app.js",
        "lenguaje": "javascript",
        "codigo": "const CLAVE = \"tareas-v1\";\nconst form = document.querySelector(\"#form-tarea\");\nconst input = document.querySelector(\"#nueva-tarea\");\nconst lista = document.querySelector(\"#lista\");\nconst contador = document.querySelector(\"#pendientes\");\n\nlet tareas = JSON.parse(localStorage.getItem(CLAVE)) || [];\n\nfunction guardar() {\n  localStorage.setItem(CLAVE, JSON.stringify(tareas));\n}\n\nfunction render() {\n  lista.innerHTML = \"\";\n\n  tareas.forEach((tarea) => {\n    const li = document.createElement(\"li\");\n    li.className = tarea.hecha ? \"hecha\" : \"\";\n\n    const check = document.createElement(\"input\");\n    check.type = \"checkbox\";\n    check.checked = tarea.hecha;\n    check.addEventListener(\"change\", () => alternar(tarea.id));\n\n    const texto = document.createElement(\"span\");\n    texto.textContent = tarea.texto;\n\n    const borrar = document.createElement(\"button\");\n    borrar.textContent = \"✕\";\n    borrar.setAttribute(\"aria-label\", \"Eliminar tarea\");\n    borrar.addEventListener(\"click\", () => eliminar(tarea.id));\n\n    li.append(check, texto, borrar);\n    lista.appendChild(li);\n  });\n\n  const pendientes = tareas.filter((t) => !t.hecha).length;\n  contador.textContent = pendientes + \" pendiente(s)\";\n}\n\nfunction agregar(texto) {\n  tareas.push({ id: Date.now(), texto, hecha: false });\n  guardar();\n  render();\n}\n\nfunction alternar(id) {\n  tareas = tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t));\n  guardar();\n  render();\n}\n\nfunction eliminar(id) {\n  tareas = tareas.filter((t) => t.id !== id);\n  guardar();\n  render();\n}\n\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const texto = input.value.trim();\n  if (texto.length < 3) return;\n  agregar(texto);\n  form.reset();\n});\n\nrender();"
      }
    ]
  },
  "biblioteca": {
    "titulo": "Sistema Biblioteca",
    "descripcion": "Modelo de base de datos y consultas para préstamos de libros.",
    "archivos": [
      {
        "nombre": "schema.sql",
        "lenguaje": "sql",
        "codigo": "-- Modelo de datos: biblioteca\nCREATE TABLE socio (\n  id_socio     INT PRIMARY KEY AUTO_INCREMENT,\n  rut          VARCHAR(10) NOT NULL UNIQUE,\n  nombre       VARCHAR(80) NOT NULL,\n  correo       VARCHAR(100) NOT NULL UNIQUE,\n  fecha_alta   DATE DEFAULT (CURRENT_DATE)\n);\n\nCREATE TABLE libro (\n  id_libro     INT PRIMARY KEY AUTO_INCREMENT,\n  isbn         CHAR(13) NOT NULL UNIQUE,\n  titulo       VARCHAR(150) NOT NULL,\n  autor        VARCHAR(100) NOT NULL,\n  anio         SMALLINT,\n  stock        INT NOT NULL DEFAULT 1 CHECK (stock >= 0)\n);\n\nCREATE TABLE prestamo (\n  id_prestamo  INT PRIMARY KEY AUTO_INCREMENT,\n  id_socio     INT NOT NULL,\n  id_libro     INT NOT NULL,\n  fecha_inicio DATE NOT NULL DEFAULT (CURRENT_DATE),\n  fecha_limite DATE NOT NULL,\n  devuelto     BOOLEAN NOT NULL DEFAULT FALSE,\n  FOREIGN KEY (id_socio) REFERENCES socio(id_socio),\n  FOREIGN KEY (id_libro) REFERENCES libro(id_libro)\n);"
      },
      {
        "nombre": "consultas.sql",
        "lenguaje": "sql",
        "codigo": "-- 1. Préstamos activos con nombre del socio y título del libro\nSELECT s.nombre, l.titulo, p.fecha_limite\nFROM prestamo p\nJOIN socio s ON s.id_socio = p.id_socio\nJOIN libro l ON l.id_libro = p.id_libro\nWHERE p.devuelto = FALSE\nORDER BY p.fecha_limite;\n\n-- 2. Préstamos atrasados\nSELECT s.nombre, s.correo, l.titulo,\n       DATEDIFF(CURRENT_DATE, p.fecha_limite) AS dias_atraso\nFROM prestamo p\nJOIN socio s ON s.id_socio = p.id_socio\nJOIN libro l ON l.id_libro = p.id_libro\nWHERE p.devuelto = FALSE\n  AND p.fecha_limite < CURRENT_DATE;\n\n-- 3. Los 5 libros más prestados\nSELECT l.titulo, COUNT(*) AS veces_prestado\nFROM prestamo p\nJOIN libro l ON l.id_libro = p.id_libro\nGROUP BY l.id_libro, l.titulo\nORDER BY veces_prestado DESC\nLIMIT 5;"
      }
    ]
  }
};
