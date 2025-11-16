import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const BASE = 'http://localhost:8080/api/titulos';

@Injectable({ providedIn: 'root' })
export class TituloService extends ApiService {
  constructor() { super(BASE); }
}
