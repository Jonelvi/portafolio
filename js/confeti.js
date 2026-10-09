// =========================================
// Confeti hecho a mano con <canvas> (sin librerías)
// Uso: lanzarConfeti();
// =========================================

function lanzarConfeti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "confeti";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colores = ["#3fb950", "#56d364", "#f0f6fc", "#58a6ff", "#d29922"];
  const piezas = [];

  // 160 piezas que salen desde el centro hacia arriba
  for (let i = 0; i < 160; i++) {
    piezas.push({
      x: canvas.width / 2,
      y: canvas.height * 0.6,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -16 - 6,
      ancho: Math.random() * 8 + 4,
      alto: Math.random() * 5 + 3,
      giro: Math.random() * Math.PI,
      velGiro: (Math.random() - 0.5) * 0.3,
      color: colores[Math.floor(Math.random() * colores.length)]
    });
  }

  let cuadros = 0;
  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piezas.forEach(p => {
      p.vy += 0.35;       // gravedad
      p.vx *= 0.99;       // roce del aire
      p.x += p.vx;
      p.y += p.vy;
      p.giro += p.velGiro;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.giro);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.ancho / 2, -p.alto / 2, p.ancho, p.alto);
      ctx.restore();
    });

    cuadros++;
    if (cuadros < 180) {
      requestAnimationFrame(animar);
    } else {
      canvas.remove(); // limpia al terminar (~3 segundos)
    }
  }
  animar();
}
