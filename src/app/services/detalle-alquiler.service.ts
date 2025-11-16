import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const BASE = 'http://localhost:8080/api/detalle-alquiler';

@Injectable({ providedIn: 'root' })
export class DetalleAlquilerService extends ApiService {
  constructor() { super(BASE); }
}
