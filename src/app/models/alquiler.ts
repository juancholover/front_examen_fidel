import { Cliente } from './cliente';
import { DetalleAlquiler } from './detalle-alquiler';

export interface Alquiler {
  id?: number;
  cliente?: { id: number } | Cliente;
  fechaAlquiler?: string;
  valorAlquiler?: number;
  detalles?: DetalleAlquiler[];
}
