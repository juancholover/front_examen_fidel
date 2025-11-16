import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleAlquiler } from '../../models/detalle-alquiler';
import { DetalleAlquilerService } from '../../services/detalle-alquiler.service';

@Component({
  standalone: true,
  selector: 'app-detalle-alquiler',
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-alquiler.component.html',
  styleUrls: ['./detalle-alquiler.component.css']
})
export class DetalleAlquilerComponent implements OnInit {
  detalles: DetalleAlquiler[] = [];
  model: DetalleAlquiler = { diasPrestamo: 1 } as DetalleAlquiler;
  editing = false;

  constructor(private svc: DetalleAlquilerService) {}

  ngOnInit(): void { this.load(); }

  load() { this.svc.list<DetalleAlquiler>().subscribe((r) => this.detalles = r || []); }

  new() { this.model = { diasPrestamo: 1 } as DetalleAlquiler; this.model.alquiler = { id: undefined } as any; this.model.cd = { id: undefined } as any; this.editing = true; }
  edit(d: DetalleAlquiler) { this.model = { ...d }; if (!this.model.alquiler) { this.model.alquiler = { id: undefined } as any; } if (!this.model.cd) { this.model.cd = { id: undefined } as any; } this.editing = true; }

  save() {
    if (!this.model.id) {
      this.svc.create<DetalleAlquiler>(this.model).subscribe(() => { this.load(); this.editing = false; });
    } else {
      this.svc.update<DetalleAlquiler>(this.model.id!, this.model).subscribe(() => { this.load(); this.editing = false; });
    }
  }

  cancel() { this.editing = false; }

  remove(d: DetalleAlquiler) {
    if (!d.id) return;
    if (!confirm('¿Eliminar detalle?')) return;
    this.svc.delete(d.id).subscribe(() => this.load());
  }
}
