// =========================================
// Pruebas de las REGLAS DE NEGOCIO (js/reglas.js)
// =========================================

const r = typeof require !== "undefined" ? require("../../js/reglas.js") : window;

// Fecha fija para que las pruebas den siempre el mismo resultado
const HOY = new Date("2026-10-09T12:00:00");

describe("RN-01: edad mínima de 18 años", () => {
  it("calcula bien la edad antes y después del cumpleaños", () => {
    expect(r.calcularEdad("2000-10-09", HOY)).toBe(26);
    expect(r.calcularEdad("2000-10-10", HOY)).toBe(25);
  });

  it("acepta a quien cumple 18 justo hoy", () => {
    expect(r.validarFechaNacimiento("2008-10-09", HOY)).toBe("");
  });

  it("rechaza a quien cumple 18 mañana", () => {
    expect(r.validarFechaNacimiento("2008-10-10", HOY)).toContain("al menos 18");
  });

  it("rechaza fecha vacía o futura", () => {
    expect(r.validarFechaNacimiento("", HOY)).toContain("obligatoria");
    expect(r.validarFechaNacimiento("2030-01-01", HOY)).toContain("futura");
  });
});

describe("RN-02: correo único", () => {
  const usuarios = [{ correo: "jonelvi@duocuc.cl" }];

  it("detecta un correo ya registrado sin importar mayúsculas", () => {
    expect(r.correoYaRegistrado("Jonelvi@DuocUC.cl", usuarios)).toBeTrue();
  });

  it("permite un correo nuevo", () => {
    expect(r.correoYaRegistrado("otro@gmail.com", usuarios)).toBeFalse();
  });
});

describe("RN-03: descuento por correo Duoc", () => {
  it("reconoce los dominios de Duoc", () => {
    expect(r.esCorreoDuoc("a@duoc.cl")).toBeTrue();
    expect(r.esCorreoDuoc("a@duocuc.cl")).toBeTrue();
    expect(r.esCorreoDuoc("a@profesor.duoc.cl")).toBeTrue();
  });

  it("no da descuento a dominios parecidos", () => {
    expect(r.esCorreoDuoc("a@gmail.com")).toBeFalse();
    expect(r.esCorreoDuoc("a@duoc.cl.falso.com")).toBeFalse();
  });

  it("aplica 20% a correos Duoc", () => {
    expect(r.calcularDescuento("a@duocuc.cl", "")).toBe(20);
  });
});

describe("RN-04: códigos promocionales", () => {
  it("acepta códigos válidos sin importar mayúsculas", () => {
    expect(r.validarCodigoPromo("bienvenida10")).toBe("");
    expect(r.calcularDescuento("a@gmail.com", "BIENVENIDA10")).toBe(10);
    expect(r.calcularDescuento("a@gmail.com", "jcastro15")).toBe(15);
  });

  it("el código es opcional", () => {
    expect(r.validarCodigoPromo("")).toBe("");
    expect(r.calcularDescuento("a@gmail.com", "")).toBe(0);
  });

  it("rechaza códigos inexistentes", () => {
    expect(r.validarCodigoPromo("GRATIS100")).toContain("no existe");
  });
});

describe("RN-05: los descuentos no se acumulan", () => {
  it("con correo Duoc (20%) y código de 15% se aplica solo el 20%", () => {
    expect(r.calcularDescuento("a@duoc.cl", "JCASTRO15")).toBe(20);
  });

  it("calcula el precio final y lo formatea en pesos chilenos", () => {
    expect(r.aplicarDescuento(150000, 20)).toBe(120000);
    expect(r.formatearCLP(120000)).toBe("$120.000");
    expect(r.formatearCLP(25000)).toBe("$25.000");
  });
});

describe("RN-06: código de socio ficticio", () => {
  it("usa las iniciales del nombre y el formato XX-XXXX-XXXX", () => {
    const codigo = r.generarCodigoSocio("Jonelvi Castro");
    expect(codigo).toMatch(/^JC-/);
    expect(r.esCodigoSocioValido(codigo)).toBeTrue();
  });

  it("quita tildes de las iniciales", () => {
    expect(r.generarCodigoSocio("Ángel Íñiguez")).toMatch(/^AI-/);
  });

  it("no usa caracteres confusos (0, O, 1, I)", () => {
    for (let i = 0; i < 50; i++) {
      const [, a, b] = r.generarCodigoSocio("Ana Rojas").split("-");
      expect(a + b).not.toMatch(/[01OI]/);
    }
  });

  it("genera códigos distintos para cada cuenta", () => {
    const codigos = new Set(Array.from({ length: 100 }, () => r.generarCodigoSocio("Ana Rojas")));
    expect(codigos.size).toBeGreaterThan(95);
  });
});

describe("RN-07: bloqueo tras 3 intentos fallidos", () => {
  const ahora = 1_000_000;

  it("los 2 primeros intentos solo suman", () => {
    let e = { intentos: 0, bloqueadoHasta: 0 };
    e = r.registrarIntentoFallido(e, ahora);
    e = r.registrarIntentoFallido(e, ahora);
    expect(e.intentos).toBe(2);
    expect(r.segundosDeBloqueo(e, ahora)).toBe(0);
  });

  it("el tercer intento bloquea 30 segundos", () => {
    const e = r.registrarIntentoFallido({ intentos: 2, bloqueadoHasta: 0 }, ahora);
    expect(r.segundosDeBloqueo(e, ahora)).toBe(30);
    expect(r.segundosDeBloqueo(e, ahora + 29_000)).toBe(1);
    expect(r.segundosDeBloqueo(e, ahora + 30_000)).toBe(0);
  });
});
