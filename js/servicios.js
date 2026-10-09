// Página de servicios: RN-08 (precio de socio solo con sesión iniciada)
const correoSesion = BD.sesion();
const usuario = correoSesion ? BD.buscar(correoSesion) : null;
const estado = document.getElementById("estado-sesion");

document.querySelectorAll(".servicio").forEach(tarjeta => {
  const precio = Number(tarjeta.dataset.precio);
  const original = tarjeta.querySelector(".precio-original");
  const final = tarjeta.querySelector(".precio-final");

  if (usuario && usuario.descuento > 0) {
    original.textContent = formatearCLP(precio);
    final.textContent = formatearCLP(aplicarDescuento(precio, usuario.descuento));
  } else {
    final.textContent = formatearCLP(precio);
  }
});

if (usuario) {
  estado.innerHTML = `
    <p>Sesión iniciada como <strong>${usuario.nombre}</strong> · socio <code>${usuario.codigoSocio}</code>
       · descuento <strong>${usuario.descuento}%</strong></p>
    <button type="button" class="boton boton-borde" id="cerrar-sesion">cerrar_sesión()</button>`;
  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    BD.cerrarSesion();
    location.reload();
  });
}
