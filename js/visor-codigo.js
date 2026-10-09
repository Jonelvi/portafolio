// =========================================
// Visor de código (codigo.html)
// Lee ?p=nombre-del-proyecto y muestra sus archivos con pestañas
// =========================================

const parametros = new URLSearchParams(location.search);
const idProyecto = parametros.get("p");
const proyecto = CODIGOS[idProyecto];

const titulo = document.getElementById("titulo-proyecto");
const descripcion = document.getElementById("descripcion-proyecto");
const pestanas = document.getElementById("pestanas");
const numeros = document.getElementById("numeros");
const bloque = document.getElementById("bloque-codigo");
const ruta = document.getElementById("ruta-archivo");
const botonCopiar = document.getElementById("copiar");
const visor = document.getElementById("visor");

if (!proyecto) {
  titulo.textContent = "proyecto_no_encontrado";
  descripcion.textContent = "El proyecto que buscas no existe. Vuelve a la lista de proyectos.";
  visor.hidden = true;
} else {
  document.title = `${proyecto.titulo} · código | Jonelvi Castro`;
  titulo.textContent = proyecto.titulo;
  descripcion.textContent = proyecto.descripcion;

  proyecto.archivos.forEach((archivo, i) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "pestana";
    boton.textContent = archivo.nombre;
    boton.setAttribute("role", "tab");
    boton.addEventListener("click", () => mostrar(i));
    pestanas.appendChild(boton);
  });

  mostrar(0);
}

function mostrar(indice) {
  const archivo = proyecto.archivos[indice];

  pestanas.querySelectorAll(".pestana").forEach((b, i) => {
    b.classList.toggle("activa", i === indice);
    b.setAttribute("aria-selected", i === indice);
  });

  ruta.textContent = `${idProyecto}/${archivo.nombre}`;

  // textContent evita que el código HTML se interprete como parte de la página
  bloque.textContent = archivo.codigo;
  bloque.className = `language-${archivo.lenguaje}`;
  bloque.removeAttribute("data-highlighted");
  if (window.hljs) hljs.highlightElement(bloque); // resaltado de colores (si cargó la librería)

  // números de línea
  const lineas = archivo.codigo.split("\n").length;
  numeros.textContent = Array.from({ length: lineas }, (_, i) => i + 1).join("\n");

  botonCopiar.textContent = "copiar";
}

botonCopiar.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(bloque.textContent);
    botonCopiar.textContent = "¡copiado!";
  } catch {
    botonCopiar.textContent = "no se pudo copiar";
  }
  setTimeout(() => (botonCopiar.textContent = "copiar"), 1500);
});
