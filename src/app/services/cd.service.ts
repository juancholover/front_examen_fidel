import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const BASE = 'http://localhost:8080/api/cds';

@Injectable({ providedIn: 'root' })
export class CdService extends ApiService {
  constructor() { super(BASE); }
}
