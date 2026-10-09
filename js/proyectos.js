// Filtro de proyectos por categoría (proyectos.html)
const botones = document.querySelectorAll(".filtro");
const tarjetas = document.querySelectorAll(".tarjeta");
const contador = document.getElementById("contador-proyectos");

function filtrar(categoria) {
  let visibles = 0;
  tarjetas.forEach(tarjeta => {
    const mostrar = categoria === "todos" || tarjeta.dataset.categoria === categoria;
    tarjeta.classList.toggle("oculta", !mostrar);
    if (mostrar) visibles++;
  });
  contador.textContent = `// ${visibles} proyecto${visibles === 1 ? "" : "s"} encontrado${visibles === 1 ? "" : "s"}`;
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    botones.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");
    filtrar(boton.dataset.filtro);
  });
});

filtrar("todos");
