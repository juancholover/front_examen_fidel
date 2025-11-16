import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const BASE = 'http://localhost:8080/api/sanciones';

@Injectable({ providedIn: 'root' })
export class SancionService extends ApiService {
  constructor() { super(BASE); }
}
