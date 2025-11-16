import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Cliente } from '../models/cliente';

const BASE = 'http://localhost:8080/api/clientes';

@Injectable({ providedIn: 'root' })
export class ClienteService extends ApiService {
  constructor() { super(BASE); }

  // You can add specialized methods here if needed
}
