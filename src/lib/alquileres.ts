/**
 * Cálculos de contratos de alquiler.
 * Desde la derogación de la Ley de Alquileres, las partes pactan índice y periodicidad
 * de ajuste. Los más usados: ICL (BCRA), IPC (INDEC) o un porcentaje fijo.
 */

export type IndiceAjuste = "ICL" | "IPC" | "fijo";

export interface Contrato {
  /** Fecha de inicio, AAAA-MM-DD. */
  inicio: string;
  /** Duración en meses. */
  duracionMeses: number;
  /** Cada cuántos meses se ajusta el precio. */
  periodicidadMeses: number;
  /** Alquiler inicial en centavos. */
  montoInicialCents: number;
  indice: IndiceAjuste;
}

function parse(fecha: string): Date {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function format(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Suma meses respetando fin de mes (31/01 + 1 mes = 28 o 29/02). */
export function sumarMeses(fecha: string, meses: number): string {
  const f = parse(fecha);
  const dia = f.getUTCDate();
  const destino = new Date(Date.UTC(f.getUTCFullYear(), f.getUTCMonth() + meses, 1));
  const ultimoDia = new Date(
    Date.UTC(destino.getUTCFullYear(), destino.getUTCMonth() + 1, 0),
  ).getUTCDate();
  destino.setUTCDate(Math.min(dia, ultimoDia));
  return format(destino);
}

export function fechaFin(contrato: Contrato): string {
  return sumarMeses(contrato.inicio, contrato.duracionMeses);
}

/** Fechas de ajuste dentro del contrato (no incluye el inicio). */
export function fechasDeAjuste(contrato: Contrato): string[] {
  const fechas: string[] = [];
  for (let m = contrato.periodicidadMeses; m < contrato.duracionMeses; m += contrato.periodicidadMeses) {
    fechas.push(sumarMeses(contrato.inicio, m));
  }
  return fechas;
}

/** Próxima fecha de ajuste desde `hoy`, o null si no quedan. */
export function proximoAjuste(contrato: Contrato, hoy: string): string | null {
  return fechasDeAjuste(contrato).find((f) => f > hoy) ?? null;
}

/**
 * Nuevo monto por índice: monto anterior × (índice actual / índice al inicio del período).
 * Para ICL e IPC se usa el cociente de los valores publicados.
 */
export function ajustarPorIndice(
  montoAnteriorCents: number,
  indiceInicioPeriodo: number,
  indiceActual: number,
): number {
  if (indiceInicioPeriodo <= 0) throw new Error("Índice inicial inválido");
  return Math.round((montoAnteriorCents * indiceActual) / indiceInicioPeriodo);
}

/** Nuevo monto con un porcentaje fijo pactado. */
export function ajustarPorPorcentaje(montoAnteriorCents: number, porcentaje: number): number {
  return Math.round(montoAnteriorCents * (1 + porcentaje / 100));
}

/** Días de atraso en el pago respecto del vencimiento (0 si está al día). */
export function diasDeAtraso(vencimiento: string, fechaPago: string): number {
  const diff = (parse(fechaPago).getTime() - parse(vencimiento).getTime()) / 86_400_000;
  return Math.max(0, Math.round(diff));
}
