import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sancion } from '../../models/sancion';
import { SancionService } from '../../services/sancion.service';

@Component({
  standalone: true,
  selector: 'app-sanciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './sanciones.component.html',
  styleUrls: ['./sanciones.component.css']
})
export class SancionesComponent implements OnInit {
  sanciones: Sancion[] = [];
  model: Sancion = { tipoSancion: '' } as Sancion;
  editing = false;

  constructor(private svc: SancionService) {}

  ngOnInit(): void { this.load(); }

  load() { this.svc.list<Sancion>().subscribe((r) => this.sanciones = r || []); }

  new() { this.model = { tipoSancion: '' } as Sancion; this.model.cliente = { id: undefined } as any; this.editing = true; }
  edit(s: Sancion) { this.model = { ...s }; if (!this.model.cliente) { this.model.cliente = { id: undefined } as any; } this.editing = true; }

  save() {
    if (!this.model.id) {
      this.svc.create<Sancion>(this.model).subscribe(() => { this.load(); this.editing = false; });
    } else {
      this.svc.update<Sancion>(this.model.id!, this.model).subscribe(() => { this.load(); this.editing = false; });
    }
  }

  cancel() { this.editing = false; }

  remove(s: Sancion) {
    if (!s.id) return;
    if (!confirm('¿Eliminar sanción?')) return;
    this.svc.delete(s.id).subscribe(() => this.load());
  }
}
