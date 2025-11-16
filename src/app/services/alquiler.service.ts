import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const BASE = 'http://localhost:8080/api/alquileres';

@Injectable({ providedIn: 'root' })
export class AlquilerService extends ApiService {
  constructor() { super(BASE); }
}
