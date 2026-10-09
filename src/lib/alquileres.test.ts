import { describe, expect, it } from "vitest";
import {
  ajustarPorIndice,
  ajustarPorPorcentaje,
  diasDeAtraso,
  fechaFin,
  fechasDeAjuste,
  proximoAjuste,
  sumarMeses,
  type Contrato,
} from "./alquileres";

const contrato: Contrato = {
  inicio: "2026-03-01",
  duracionMeses: 24,
  periodicidadMeses: 6,
  montoInicialCents: 450_000_00,
  indice: "ICL",
};

describe("fechas", () => {
  it("suma meses respetando fin de mes", () => {
    expect(sumarMeses("2026-01-31", 1)).toBe("2026-02-28");
    expect(sumarMeses("2028-01-31", 1)).toBe("2028-02-29");
    expect(sumarMeses("2026-03-15", 12)).toBe("2027-03-15");
  });
  it("calcula fin y ajustes del contrato", () => {
    expect(fechaFin(contrato)).toBe("2028-03-01");
    expect(fechasDeAjuste(contrato)).toEqual(["2026-09-01", "2027-03-01", "2027-09-01"]);
  });
  it("devuelve el próximo ajuste", () => {
    expect(proximoAjuste(contrato, "2026-10-09")).toBe("2027-03-01");
    expect(proximoAjuste(contrato, "2027-12-01")).toBeNull();
  });
});

describe("ajustes", () => {
  it("ajusta por cociente de índices", () => {
    expect(ajustarPorIndice(450_000_00, 20, 23)).toBe(517_500_00);
  });
  it("ajusta por porcentaje fijo", () => {
    expect(ajustarPorPorcentaje(450_000_00, 10)).toBe(495_000_00);
  });
  it("rechaza índice inicial inválido", () => {
    expect(() => ajustarPorIndice(1, 0, 1)).toThrow();
  });
});

describe("diasDeAtraso", () => {
  it("cuenta días después del vencimiento", () => {
    expect(diasDeAtraso("2026-10-10", "2026-10-15")).toBe(5);
    expect(diasDeAtraso("2026-10-10", "2026-10-08")).toBe(0);
  });
});
