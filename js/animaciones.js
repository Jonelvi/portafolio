// =========================================
// Animaciones dinámicas (se carga en todas las páginas)
// =========================================

const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- 1. Efecto "máquina de escribir" en el inicio ----------
const escribiendo = document.getElementById("escribiendo");

if (escribiendo && !sinMovimiento) {
  const frases = [
    "Desarrollador Fullstack en formación",
    "Estudiante de Duoc UC",
    "HTML · CSS · JavaScript",
    "console.log('¡Hola!');"
  ];
  let frase = 0;
  let letra = 0;
  let borrando = false;

  function escribir() {
    const actual = frases[frase];
    escribiendo.textContent = actual.slice(0, letra);

    if (!borrando && letra < actual.length) {
      letra++;
      setTimeout(escribir, 70);
    } else if (!borrando) {
      borrando = true;
      setTimeout(escribir, 1800); // pausa con la frase completa
    } else if (letra > 0) {
      letra--;
      setTimeout(escribir, 35);
    } else {
      borrando = false;
      frase = (frase + 1) % frases.length;
      setTimeout(escribir, 300);
    }
  }
  escribir();
}

// ---------- 2. Aparecer al hacer scroll ----------
// El JS agrega la clase .revelar; si el JS falla, el contenido igual se ve.
const elementos = document.querySelectorAll(
  "main h1, main h2, .comentario, .bloque, .skills li, .video, .tarjeta, .filtros, .formulario-caja form"
);

if ("IntersectionObserver" in window && !sinMovimiento) {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target); // se anima una sola vez
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach(el => {
    // retraso escalonado para elementos hermanos (tarjetas, skills)
    const hermanos = Array.from(el.parentElement.children);
    el.style.setProperty("--retraso", `${hermanos.indexOf(el) * 70}ms`);
    el.classList.add("revelar");
    observador.observe(el);
  });
}

// ---------- 3. Barra de progreso de lectura ----------
const barra = document.createElement("div");
barra.className = "barra-progreso";
document.body.appendChild(barra);

window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  barra.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : "0";
});

// ---------- 4. Brillo que sigue al mouse en las tarjetas ----------
document.querySelectorAll(".tarjeta").forEach(tarjeta => {
  tarjeta.addEventListener("mousemove", e => {
    const r = tarjeta.getBoundingClientRect();
    tarjeta.style.setProperty("--x", `${e.clientX - r.left}px`);
    tarjeta.style.setProperty("--y", `${e.clientY - r.top}px`);
  });
});
