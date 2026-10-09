import { ajustarPorIndice, fechasDeAjuste, type Contrato } from "@/lib/alquileres";

function Ejemplo() {
  const contrato: Contrato = {
    inicio: "2026-03-01",
    duracionMeses: 24,
    periodicidadMeses: 6,
    montoInicialCents: 450_000_00,
    indice: "ICL",
  };
  const ajustes = fechasDeAjuste(contrato);
  return (
    <ul>
      <li>Contrato de 24 meses desde 01/03/2026, ajuste semestral por ICL</li>
      <li>Ajustes: <strong>{ajustes.map(fecha).join(" · ")}</strong></li>
      <li>Si el índice pasa de 20 a 23: <strong>{ars(contrato.montoInicialCents)} → {ars(ajustarPorIndice(contrato.montoInicialCents, 20, 23))}</strong></li>
    </ul>
  );
}

function fecha(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function Page() {
  return (
    <main className="page">
      <header className="top">
        <p className="eyebrow">San Juan · En construcción</p>
        <h1>Alquileres · San Juan</h1>
      </header>
      <section className="card">
        <h2>Qué es</h2>
        <p>Gestión de contratos de alquiler, ajustes y cobranzas para inmobiliarias y administradores de San Juan, con foco en alquileres corporativos ligados a la minería.</p>
        <p className="muted">Se estiman entre 7.000 y 15.000 viviendas nuevas necesarias por la llegada de trabajadores de los proyectos de cobre, y empresas que necesitan alojar de 100 a 400 personas.</p>
      </section>
      <section className="card">
        <h2>Reglas de negocio ya implementadas</h2>
        <Ejemplo />
      </section>
      <section className="card">
        <h2>Próximos pasos</h2>
        <ol>
          <li>Alta de propiedades, inquilinos y contratos.</li>
          <li>Calendario de ajustes y avisos de vencimiento a inquilinos.</li>
          <li>Cobranzas y estado de cuenta; módulo de alquileres corporativos (varias unidades por empresa).</li>
        </ol>
      </section>
    </main>
  );
}

function ars(cents: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(cents / 100);
}
