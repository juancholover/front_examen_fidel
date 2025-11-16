export interface Sancion {
  id?: number;
  cliente?: { id: number };
  tipoSancion?: string;
  nroDiasSancion?: number;
}
