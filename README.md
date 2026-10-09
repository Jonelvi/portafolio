# Portafolio – Evaluación Formativa 1 (DSY1104 Desarrollo Fullstack II)

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

## Subir a GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/portafolio.git
git push -u origin main
```
