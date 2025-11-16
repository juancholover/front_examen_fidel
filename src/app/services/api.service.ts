import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class ApiService {
  protected http = inject(HttpClient);
  constructor(protected baseUrl: string) {}

  list<T>() {
    return this.http.get<T[]>(this.baseUrl);
  }

  get<T>(id: number) {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create<T>(payload: any) {
    return this.http.post<T>(this.baseUrl, payload);
  }

  update<T>(id: number, payload: any) {
    return this.http.put<T>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
