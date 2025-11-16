import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alquiler } from '../../models/alquiler';
import { AlquilerService } from '../../services/alquiler.service';

@Component({
  standalone: true,
  selector: 'app-alquileres',
  imports: [CommonModule, FormsModule],
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {
  alquileres: Alquiler[] = [];
  model: Alquiler = { valorAlquiler: 0 } as Alquiler;
  editing = false;

  constructor(private svc: AlquilerService) {}

  ngOnInit(): void { this.load(); }

  load() { this.svc.list<Alquiler>().subscribe((r) => this.alquileres = r || []); }

  new() { this.model = { valorAlquiler: 0 } as Alquiler; this.model.cliente = { id: undefined } as any; this.editing = true; }
  edit(a: Alquiler) { this.model = { ...a }; if (!this.model.cliente) { this.model.cliente = { id: undefined } as any; } this.editing = true; }

  save() {
    if (!this.model.id) {
      this.svc.create<Alquiler>(this.model).subscribe(() => { this.load(); this.editing = false; });
    } else {
      this.svc.update<Alquiler>(this.model.id!, this.model).subscribe(() => { this.load(); this.editing = false; });
    }
  }

  cancel() { this.editing = false; }

  remove(a: Alquiler) {
    if (!a.id) return;
    if (!confirm('¿Eliminar alquiler?')) return;
    this.svc.delete(a.id).subscribe(() => this.load());
  }
}
