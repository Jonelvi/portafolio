# Portafolio de Jonelvi Castro – Evaluación Formativa 1 (DSY1104 Desarrollo Fullstack II)

Portafolio personal hecho con **HTML5, CSS3 y JavaScript**, con estilo informático minimalista (modo oscuro, tipografía monoespaciada y un solo color de acento).

## Páginas
| Página | Contenido |
|---|---|
| `index.html` | Presentación, sobre mí, stack de tecnologías y video embebido ("Loser", Tame Impala) |
| `proyectos.html` | Proyectos con filtro por categoría (botones JS) |
| `codigo.html` | Visor del código de cada proyecto, con pestañas por archivo, números de línea y botón copiar |
| `servicios.html` | Servicios con precio de socio según las reglas de negocio |
| `registro.html` | Registro con validaciones en JavaScript |
| `login.html` | Ingreso con validaciones |
| `contacto.html` | Contacto con validación y contador de caracteres |

## Estructura
```
portafolio/
├── *.html
├── css/estilos.css      ← única hoja de estilos externa
├── js/validaciones.js   ← validaciones de los 3 formularios
├── js/reglas.js         ← reglas de negocio (RN-01 a RN-08)
├── js/servicios.js      ← precios con descuento de socio
├── js/proyectos.js      ← filtro de proyectos
├── js/codigos.js        ← código de muestra de cada proyecto
├── js/visor-codigo.js   ← lógica del visor (lee ?p=proyecto)
├── js/animaciones.js    ← escritura automática, aparición al scroll, barra de progreso
├── js/confeti.js        ← confeti al enviar un formulario correctamente
├── tests/
│   ├── SpecRunner.html          ← abre en el navegador para ver las pruebas
│   └── spec/                    ← 44 pruebas unitarias (Jasmine)
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

## Reglas de negocio
El proyecto no tiene backend, así que los usuarios se guardan en `localStorage` del navegador (simulación).
Todos los códigos (promocionales y de socio) son **ficticios**.

| Código | Regla | Dónde se aplica |
|---|---|---|
| RN-01 | Solo mayores de 18 años pueden registrarse | registro (fecha de nacimiento) |
| RN-02 | Un correo solo puede registrarse una vez | registro |
| RN-03 | Correos `@duoc.cl`, `@duocuc.cl` o `@profesor.duoc.cl` tienen 20% de descuento | registro / servicios |
| RN-04 | Códigos promocionales `BIENVENIDA10` (10%) y `JCASTRO15` (15%) | registro |
| RN-05 | Los descuentos no se acumulan: se aplica el mayor | registro / servicios |
| RN-06 | Cada cuenta recibe un código de socio único, ej. `JC-7K4M-2Q9X` | registro / login |
| RN-07 | 3 intentos fallidos de ingreso bloquean el login 30 segundos | login |
| RN-08 | Los precios con descuento solo se ven con sesión iniciada | servicios |

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
Resultado esperado: `44 specs, 0 failures` (24 de validaciones + 20 de reglas de negocio).

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
| 11 | registro | Fecha de nacimiento de alguien de 16 años | "Debes tener al menos 18 años" (RN-01) |
| 12 | registro | Registrar dos veces el mismo correo | "Este correo ya está registrado" (RN-02) |
| 13 | registro | Correo `@duocuc.cl` + código `JCASTRO15` | Muestra 20%, no 35% (RN-03 y RN-05) |
| 14 | registro | Código `GRATIS100` | "El código promocional no existe" (RN-04) |
| 15 | registro | Registro correcto | Aparece código de socio `XX-XXXX-XXXX` y confeti (RN-06) |
| 16 | login | 3 contraseñas incorrectas | Botón bloqueado con cuenta regresiva de 30 s (RN-07) |
| 18 | proyectos | Clic en "ver código" de MiTienda | Abre codigo.html con 3 pestañas sin salir del sitio |
| 19 | codigo | Abrir `codigo.html?p=noexiste` | Muestra "proyecto_no_encontrado" |
| 17 | servicios | Entrar sin sesión y luego con sesión | Sin sesión: precio normal. Con sesión: precio tachado y precio de socio (RN-08) |

## Subir a GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/portafolio.git
git push -u origin main
```
