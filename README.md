# Portafolio de Jonelvi Castro – Evaluación Formativa 1 (DSY1104 Desarrollo Fullstack II)

Portafolio personal hecho con **HTML5, CSS3 y JavaScript**, con estilo informático minimalista (modo oscuro, tipografía monoespaciada y un solo color de acento).

## Páginas
| Página | Contenido |
|---|---|
| `index.html` | Presentación, sobre mí, stack de tecnologías y video embebido |
| `proyectos.html` | Proyectos con filtro por categoría (botones JS) |
| `registro.html` | Registro con validaciones en JavaScript |
| `login.html` | Ingreso con validaciones |
| `contacto.html` | Contacto con validación y contador de caracteres |

## Estructura
```
portafolio/
├── *.html
├── css/estilos.css      ← única hoja de estilos externa
├── js/validaciones.js   ← validaciones de los 3 formularios
├── js/proyectos.js      ← filtro de proyectos
├── js/animaciones.js    ← escritura automática, aparición al scroll, barra de progreso
├── js/confeti.js        ← confeti al enviar un formulario correctamente
├── tests/
│   ├── SpecRunner.html          ← abre en el navegador para ver las pruebas
│   └── spec/validaciones.spec.js ← 24 pruebas unitarias (Jasmine)
└── img/
```

## Validaciones (registro)
- Nombre obligatorio, solo letras.
- RUT con formato y dígito verificador (módulo 11).
- Correo con formato válido.
- Teléfono opcional con formato chileno.
- Región con sugerencias (`datalist`).
- Contraseña de 8 a 16 caracteres, con una mayúscula y un número, y su confirmación.
- Aceptar términos.

## Animaciones
- Texto que se escribe y borra solo en el inicio.
- Secciones y tarjetas que aparecen al hacer scroll (`IntersectionObserver`).
- Brillo animado en el nombre, cuadrícula de fondo en movimiento, barra de progreso de lectura.
- Luz que sigue al mouse en las tarjetas, botones con brillo, subrayado animado en el menú.
- Campo con error se sacude; confeti al enviar con éxito.
- Respeta la preferencia del sistema "reducir movimiento" (accesibilidad).

## Pruebas

### Pruebas unitarias (Jasmine)
Se prueban las funciones de validación de `js/validaciones.js`.

- **En el navegador:** abrir `tests/SpecRunner.html`.
- **En la terminal:**
  ```bash
  npm install
  npm test
  ```
Resultado esperado: `24 specs, 0 failures`.

### Casos de prueba manuales
| # | Página | Acción | Resultado esperado |
|---|---|---|---|
| 1 | registro | Enviar el formulario vacío | Se bloquea el envío y aparece un error en cada campo obligatorio |
| 2 | registro | RUT `12345678-9` | "El dígito verificador no corresponde" |
| 3 | registro | Contraseña `duoc2026` | "Debe incluir al menos una letra mayúscula" |
| 4 | registro | Contraseñas distintas | "Las contraseñas no coinciden" |
| 5 | registro | Escribir "Val" en región | Aparece la sugerencia "Valparaíso" |
| 6 | registro | Todos los datos correctos | Mensaje de éxito y confeti |
| 7 | login | Correo sin @ | "Ingresa un correo válido" |
| 8 | contacto | Mensaje de 4 letras | "El mensaje debe tener al menos 10 caracteres" |
| 9 | proyectos | Clic en "javascript" | Solo se ven 2 proyectos |
| 10 | todas | Clic en cada link del menú y del footer | Navega a la página correcta |

## Subir a GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/portafolio.git
git push -u origin main
```
