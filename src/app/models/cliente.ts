export interface Cliente {
  id?: number;
  direccion?: string;
  telefono?: string;
  nombre: string;
  email?: string;
  nroDni?: string;
  fechaNacimiento?: string; // ISO yyyy-MM-dd
  fechaInscripcion?: string;
  temaInteres?: string;
  estado?: string;
}
