// =========================================
// Pruebas unitarias de las validaciones (Jasmine)
// Corren en el navegador (tests/SpecRunner.html) y en Node (npm test)
// =========================================

// En Node se importan con require; en el navegador ya son globales
const v = typeof require !== "undefined" ? require("../../js/validaciones.js") : window;

describe("esRutValido", () => {
  it("acepta un RUT con dígito verificador correcto", () => {
    expect(v.esRutValido("11111111-1")).toBeTrue();
    expect(v.esRutValido("12345678-5")).toBeTrue();
  });

  it("acepta K mayúscula o minúscula como dígito verificador", () => {
    expect(v.esRutValido("10000013-K")).toBeTrue();
    expect(v.esRutValido("10000013-k")).toBeTrue();
  });

  it("rechaza un dígito verificador incorrecto", () => {
    expect(v.esRutValido("12345678-9")).toBeFalse();
  });

  it("rechaza RUT con puntos o sin guion", () => {
    expect(v.esRutValido("12.345.678-5")).toBeFalse();
    expect(v.esRutValido("123456785")).toBeFalse();
  });
});

describe("validarNombre", () => {
  it("acepta un nombre con tildes y espacios", () => {
    expect(v.validarNombre("Jonelvi Castro")).toBe("");
    expect(v.validarNombre("José Muñoz")).toBe("");
  });

  it("exige que no esté vacío", () => {
    expect(v.validarNombre("   ")).toBe("El nombre es obligatorio.");
  });

  it("exige al menos 3 caracteres", () => {
    expect(v.validarNombre("Jo")).toContain("al menos 3");
  });

  it("rechaza números y símbolos", () => {
    expect(v.validarNombre("Juan123")).toContain("solo puede contener letras");
  });
});

describe("validarCorreo", () => {
  it("acepta correos válidos", () => {
    expect(v.validarCorreo("jonelvi@duocuc.cl")).toBe("");
    expect(v.validarCorreo("nombre.apellido@gmail.com")).toBe("");
  });

  it("indica que es obligatorio si está vacío", () => {
    expect(v.validarCorreo("")).toBe("El correo es obligatorio.");
  });

  it("rechaza correos sin @ o sin dominio", () => {
    expect(v.validarCorreo("jonelvi.duocuc.cl")).not.toBe("");
    expect(v.validarCorreo("jonelvi@duocuc")).not.toBe("");
  });
});

describe("validarTelefono", () => {
  it("es opcional: vacío es válido", () => {
    expect(v.validarTelefono("")).toBe("");
  });

  it("acepta formatos chilenos", () => {
    expect(v.validarTelefono("+56912345678")).toBe("");
    expect(v.validarTelefono("912345678")).toBe("");
    expect(v.validarTelefono("+56 9 1234 5678")).toBe("");
  });

  it("rechaza números incompletos o que no son celulares", () => {
    expect(v.validarTelefono("12345")).not.toBe("");
    expect(v.validarTelefono("+56212345678")).not.toBe("");
  });
});

describe("validarRegion", () => {
  const regiones = ["Metropolitana de Santiago", "Valparaíso"];

  it("acepta una región de la lista", () => {
    expect(v.validarRegion("Valparaíso", regiones)).toBe("");
  });

  it("rechaza una región vacía o inventada", () => {
    expect(v.validarRegion("", regiones)).toBe("Selecciona tu región.");
    expect(v.validarRegion("Narnia", regiones)).toContain("lista de sugerencias");
  });
});

describe("validarClave", () => {
  it("acepta una contraseña segura", () => {
    expect(v.validarClave("Duoc2026")).toBe("");
  });

  it("rechaza contraseñas cortas o muy largas", () => {
    expect(v.validarClave("Ab1")).toContain("entre 8 y 16");
    expect(v.validarClave("Abcdefgh123456789")).toContain("entre 8 y 16");
  });

  it("exige una mayúscula", () => {
    expect(v.validarClave("duoc2026")).toContain("mayúscula");
  });

  it("exige un número", () => {
    expect(v.validarClave("DuocDuoc")).toContain("número");
  });
});

describe("validarConfirmacion", () => {
  it("acepta cuando ambas contraseñas coinciden", () => {
    expect(v.validarConfirmacion("Duoc2026", "Duoc2026")).toBe("");
  });

  it("avisa cuando no coinciden", () => {
    expect(v.validarConfirmacion("Duoc2026", "Duoc2025")).toBe("Las contraseñas no coinciden.");
  });

  it("avisa cuando la confirmación está vacía", () => {
    expect(v.validarConfirmacion("Duoc2026", "")).toBe("Confirma tu contraseña.");
  });
});

describe("validarMensaje", () => {
  it("exige al menos 10 caracteres", () => {
    expect(v.validarMensaje("Hola")).not.toBe("");
    expect(v.validarMensaje("Hola, me interesa tu trabajo")).toBe("");
  });
});
